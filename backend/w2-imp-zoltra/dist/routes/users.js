"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const zoltra_1 = require("zoltra");
const users_controller_1 = require("../controllers/users.controller");
const userRoutes = (0, zoltra_1.defineRoutes)([
    {
        method: "GET",
        path: "/api/users",
        handler: users_controller_1.getUsers,
    },
]);
exports.routes = userRoutes;
