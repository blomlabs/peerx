import { neon } from "@neondatabase/serverless";
import Err from "./err";
import { NexuNeon } from "nexujs";

export const sql = neon(String(process.env.DATABASE_URL));

export const query = async (queryText: string, values?: any[]) => {
  try {
    const result = values ? await sql(queryText, values) : await sql(queryText);
    return result;
  } catch (error) {
    const err = new Err(`${error}`, (error as Error).name);
    err.statusCode = 400;
    throw err;
  }
};

export const neonClient = new NexuNeon(query);
