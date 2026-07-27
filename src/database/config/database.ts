import dotenv from "dotenv";
import { Dialect } from "sequelize";

dotenv.config();

interface DatabaseConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
  dialect: Dialect;
  logging: boolean;
}

const databaseConfig: DatabaseConfig = {
  database: process.env.DB_NAME || "version_control_db",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  dialect: (process.env.DB_DIALECT as Dialect) || "mysql",
  logging: process.env.DB_LOGGING === "true",
};

export default databaseConfig;
