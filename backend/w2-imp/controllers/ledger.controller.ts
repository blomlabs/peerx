import { NexuHandler } from "nexujs";
import { neonClient, query } from "../config/neon-client";
import Err from "../config/err";
import { ledgerColums } from "../constants/columns";

export const getLedgers: NexuHandler = async (req, res, next) => {
  try {
    const ledgers = await neonClient.useQueryLimit({
      req,
      table: "ledger",
      columns: ledgerColums,
    });

    res.status(200).json({
      success: true,
      message: "Ledger Queried successfully",
      length: ledgers.length,
      data: ledgers,
    });
  } catch (error) {
    next(error);
  }
};

export const getLedgerByAddress: NexuHandler = async (req, res, next) => {
  const { address } = req.params;
  try {
    const ledgers = await neonClient.useQueryLimit({
      req,
      table: "ledger",
      columns: ledgerColums,
      whereClause: "user_address = $1",
      values: [address],
    });

    if (ledgers.length === 0) {
      const error = new Err("Record not found", "LedgerError");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Record queried successfully",
      length: ledgers.length,
      data: ledgers,
    });
  } catch (error) {
    next(error);
  }
};

export const getLedgerById: NexuHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ledger = await query("SELECT * FROM ledger WHERE id = $1", [id]);

    if (ledger.length === 0) {
      const error = new Err("Record not found", "LedgerError");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Record queried successfully",
      data: ledger[0],
    });
  } catch (error) {
    next(error);
  }
};

// GET TRANSACTION LEDGER BY `transaction_id`
export const getLedgerByTransactionId: NexuHandler = async (req, res, next) => {
  const { transactionId } = req.params;
  try {
    const ledgers = await query(
      "SELECT * FROM ledger WHERE transaction_id = $1",
      [transactionId]
    );

    if (ledgers.length === 0) {
      const error = new Err("Record not found", "LedgerError");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Record queried successfully",
      length: ledgers.length,
      data: ledgers,
    });
  } catch (error) {
    next(error);
  }
};
