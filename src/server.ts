import dotenv from "dotenv";
import app from "./app";
import { sequelize } from "./database/config/sequelize";

dotenv.config();

const PORT = Number(process.env.PORT) || 5003;

const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    console.log("MySQL connection established successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MySQL:", error);
    process.exit(1);
  }
};

void startServer();