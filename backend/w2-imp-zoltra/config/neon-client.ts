import { neon } from "@neondatabase/serverless";
import { RequestError } from "zoltra";
import useQueryLimit from "./useNeonQueryLimit";
import { UseQueryLimitOptions } from "../types";

export const sql = neon(String(process.env.DATABASE_URL));

export const query = async (queryText: string, values?: any[]) => {
  try {
    const result = values
      ? await sql.query(queryText, values)
      : await sql.query(queryText);
    return result;
  } catch (error) {
    const err = new RequestError(`${error}`, (error as Error).name);
    err.statusCode = 400;
    throw err;
  }
};

export const neonClient = {
  useQueryLimit: (options: UseQueryLimitOptions) =>
    useQueryLimit({ query, ...options }),
};
