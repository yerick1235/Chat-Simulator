import express from "express";
import {
  login,
  registUser,
  saveContact,
  searchUser,
  test,
} from "./User.controller.js";
import { validateJWT } from "../Middlewares/jwt.js";

const api = express.Router();

api.get("/test", [validateJWT], test);
api.post("/regist", registUser);
api.post("/login", login);
api.get("/search", searchUser);
api.get("/saveContact", [validateJWT], saveContact);

export default api;
