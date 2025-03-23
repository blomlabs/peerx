import { NexuResponse, ThrowError } from "nexujs";

declare module "nexujs" {
  export declare const throwError: ({
    error,
    res,
    status,
    message,
    success,
  }: ThrowError & { success?: boolean }) => NexuResponse<
    any,
    Record<string, any>
  >;
}
