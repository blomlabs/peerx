import { Logger, ZoltraRequest, ZoltraResponse } from "zoltra";

const logger = new Logger("UserController");

const users = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
];

export const userService = {
  async getAllUsers() {
    logger.debug("Fetching all users");
    return users;
  },

  async getUserById(id: string) {
    logger.debug(`Fetching user with ID: ${id}`);
    return users.find((user) => user.id === id);
  },
};

export async function getUsers(req: ZoltraRequest, res: ZoltraResponse) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    logger.error("Failed to get users", error as Error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
