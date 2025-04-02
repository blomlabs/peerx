"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
exports.getUsers = getUsers;
const zoltra_1 = require("zoltra");
const logger = new zoltra_1.Logger("UserController");
const users = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
];
exports.userService = {
    async getAllUsers() {
        logger.debug("Fetching all users");
        return users;
    },
    async getUserById(id) {
        logger.debug(`Fetching user with ID: ${id}`);
        return users.find((user) => user.id === id);
    },
};
async function getUsers(req, res) {
    try {
        const users = await exports.userService.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        logger.error("Failed to get users", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
