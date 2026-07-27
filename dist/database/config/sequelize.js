"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("./database");
exports.sequelize = new sequelize_1.Sequelize(database_1.databaseConfig.database, database_1.databaseConfig.username, database_1.databaseConfig.password, {
    host: database_1.databaseConfig.host,
    port: database_1.databaseConfig.port,
    dialect: "mysql",
    logging: false,
});
//# sourceMappingURL=sequelize.js.map