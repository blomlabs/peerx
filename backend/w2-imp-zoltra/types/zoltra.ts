import { User } from ".";

declare module "http" {
  export interface IncomingMessage {
    user: User;
  }
}
