import express, { urlencoded } from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import UserRoutes from '../src/User/User.routes.js'
import fileUpload from "express-fileupload";
import MessageRoutes from "../src/Message/Message.routes.js";

//# Configs
const app = express();
config()
const port = process.env.PORT || 3200;

app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(fileUpload())

//# Routes
app.use('/user', UserRoutes)
app.use('/message', MessageRoutes)

//# Initialize Server
export const initServer = async () => {
  app.listen(port);
  console.log(`Server HTTPS Running in port ${port}`);
};
