import dotenv from "dotenv";
import app from "./app";
import { sequelize } from "./database/models";

dotenv.config();

const PORT = process.env.PORT || 5003;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();