import express, { urlencoded } from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

//# Configs
const app = express();
config()
const port = process.env.PORT || 3200;

app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//# Routes

//# Initialize Server
export const initServer = async () => {
  app.listen(port);
  console.log(`Server HTTPS Running in port ${port}`);
};
