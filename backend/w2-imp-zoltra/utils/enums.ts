export const Status = {
  PENDING: "pending",
  SUCCESS: "completed",
  CANCELLED: "cancelled",
  FAILED: "failed",
};

export const Transactions = {
  WITHDRAWAL: "withdrawal",
  DEPOSIT: "deposit",
};

export const currencies = {
  btc: "btc",
  usdt: "usdt",
  bnb: "bnb",
};

export const assets = ["USDT", "BTC", "BNB"];

export const PaymentMethods = {
  BANK_TRANSFER: ["PalmPay", "Opay"],
  WALLET: "wallet",
};
