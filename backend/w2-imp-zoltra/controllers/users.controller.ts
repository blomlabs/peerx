import { Logger, ZoltraHandler } from "zoltra";

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

export const getUsers: ZoltraHandler = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    logger.error("Failed to get users", error as Error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById: ZoltraHandler = async (req, res) => {
  try {
    const userId = req.params?.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    logger.error("Failed to get user", error as Error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
