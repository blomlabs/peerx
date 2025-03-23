import { generateId, NexuHandler } from "nexujs";
import { neonClient, query } from "../config/neon-client";
import Err from "../config/err";
import { currencies, Status, Transactions } from "../utils/enums";

export const transferToken: NexuHandler = async (req, res, next) => {
  const { address, currency, amount } = req.body;
  try {
    const reference_code = generateId(16);

    const sender = req.user;

    if (address === sender.address) {
      const error = new Err(
        "You can not transfer to yourself",
        "TransactionError"
      );
      error.statusCode = 403;
      throw error;
    }

    if (address.length !== 48) {
      const error = new Err(
        "You entered an incorrect address",
        "TransactionError"
      );
      error.statusCode = 403;
      throw error;
    }

    if (!currencies[currency as never]) {
      const error = new Err(
        "Please enter a vaild currency",
        "TransactionError"
      );
      error.statusCode = 403;
      throw error;
    }

    if (!sender.id) {
      const error = new Err("Sender acction not found", "AccountError");
      error.statusCode = 404;
      throw error;
    }

    const receiver = await query(
      "SELECT balance, id, address FROM users WHERE address = $1",
      [address]
    );

    if (receiver.length === 0) {
      const error = new Err("Receiver not found", "AccountError");
      error.statusCode = 404;
      throw error;
    }

    if (sender.balance[currency as never] < Number(amount)) {
      // TODO: Send a failed transaction mail
      const error = new Err("Insufficent balance", "TransactionError");
      error.statusCode = 403;
      throw error;
    }

    const remaining_bal = sender.balance[currency as never] - Number(amount);
    const receivedAmount = receiver[0].balance[currency] + amount;

    const transactions = await query(
      `
      INSERT INTO transactions(type, status, sender_address, receiver_address, currency, amount, reference_code)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, amount, currency, status, reference_code, sender_address, receiver_address, created_at
        `,
      [
        Transactions.WITHDRAWAL,
        Status.SUCCESS,
        sender.address,
        receiver[0].address,
        currency,
        amount,
        reference_code,
      ]
    );

    // Insert into ledger
    await query(
      `INSERT INTO ledger (transaction_id, user_address, entry_type, amount, transaction_type, currency, balance_after_transaction)
      VALUES 
      ($1, $2, 'debit', $3, 'transfer', $5, $6),
      ($1, $4, 'credit', $3, 'transfer', $5, $7);`,
      [
        transactions[0].id,
        sender.address,
        amount,
        receiver[0].address,
        currency,
        remaining_bal,
        receivedAmount,
      ]
    );

    await query(
      `
      UPDATE users
      SET balance = jsonb_set(balance, $1, $2)
      WHERE address = $3
      `,
      [`{${currency}}`, remaining_bal, sender.address]
    );

    await query(
      `
      UPDATE users
      SET balance = jsonb_set(balance, $1, $2)
      WHERE id = $3
      `,
      [`{${currency}}`, receivedAmount, receiver[0].id]
    );

    // TODO: Send a success mail

    res.status(200).json({
      success: true,
      message: "Transfer successfully",
      transaction: transactions[0],
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactions: NexuHandler = async (req, res, next) => {
  try {
    const transactions = await neonClient.useQueryLimit({
      req,
      table: "transactions",
      columns_list:
        "id, type, status, currency, amount, receiver_address, sender_address, reference_code, created_at",
    });

    res.status(200).json({
      success: true,
      message: "All transactions queried",
      length: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserTransactions: NexuHandler = async (req, res, next) => {
  const { address } = req.params;
  try {
    const transactions = await neonClient.useQueryLimit({
      req,
      table: "transactions",
      whereClause: "sender_address = $1 OR receiver_address = $1",
      columns: [
        "id",
        "type",
        "status",
        "currency",
        "amount",
        "receiver_address",
        "sender_address",
        "reference_code",
        "created_at",
      ],
      values: [address],
    });
    res.status(200).json({
      success: true,
      message: "Transactions successfully queried",
      length: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const getTransaction: NexuHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = req.user;

    const transaction = await query(
      "SELECT * FROM transactions WHERE id = $1",
      [id]
    );

    if (transaction.length === 0) {
      const error = new Err("Transaction not found", "DataNotFound");
      error.statusCode = 404;
      throw error;
    }

    if (
      !user.address === transaction[0].receiver_address ||
      user.address === transaction[0].receiver_address
    ) {
      const error = new Err(
        "You are not authorized to query this data",
        "AuthorizationErr"
      );
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Transaction successfully queried",
      data: transaction[0],
    });
  } catch (error) {
    next(error);
  }
};
