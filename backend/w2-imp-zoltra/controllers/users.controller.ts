import { Logger, RequestError, ZoltraHandler } from "zoltra";

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

export const getUsers: ZoltraHandler = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    logger.error("Failed to get users", error as Error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById: ZoltraHandler = async (req, res, next) => {
  try {
    const userId = req.params?.id;
    if (!userId) {
      // return res.status(400).json({ error: "User ID is required" });
      const error = new RequestError("User ID is required", "UserFetchError");
      error.statusCode = 400;
      throw error;
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      const error = new RequestError("User not found", "UserFetchError");
      error.statusCode = 404;
      throw error;
      // return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
