"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const sequelize_1 = require("./database/config/sequelize");
require("./database/models");
dotenv_1.default.config();
const PORT = Number(process.env.PORT) || 5003;
const startServer = async () => {
    try {
        await sequelize_1.sequelize.authenticate();
        console.log("MySQL connection established successfully.");
        app_1.default.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to connect to MySQL:", error);
        process.exit(1);
    }
};
void startServer();
//# sourceMappingURL=server.js.map