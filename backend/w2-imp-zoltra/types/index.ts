import { ZoltraRequest } from "zoltra";

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

export type NeonQuery = (
  action: string,
  values?: unknown[]
) => Promise<Record<string, any>[]>;
export interface NeonRequestWithLimit {
  page?: number;
  limit?: number;
  req: ZoltraRequest;
  table: string;
  query: NeonQuery;
  whereClause?: string;
  values?: unknown[];
  sortBy?: string | any;
  order?: string | any;
  columns?: string[];
  columns_list?: string;
}

export interface UseQueryLimitOptions {
  page?: number;
  limit?: number;
  req: ZoltraRequest;
  table: string;
  whereClause?: string;
  values?: unknown[];
  sortBy?: string | any;
  order?: string | any;
  columns?: string[];
  columns_list?: string;
}
