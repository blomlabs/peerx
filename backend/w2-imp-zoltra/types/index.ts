export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  balance: {
    btc: number;
    bnb: number;
    usdt: number;
  };
}
