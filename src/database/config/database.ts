import dotenv from "dotenv";

dotenv.config();

export const databaseConfig = {
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3306),
  database: process.env.DB_NAME ?? "version_control_db",
  username: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
};