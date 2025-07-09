import jwt from "jsonwebtoken";
import User from "../User/User.model.js";

export const generateJWT = async (payload) => {
  try {
    const key = process.env.KEY;
    return jwt.sign(payload, key, {
      expiresIn: "6h",
      algorithm: "HS256",
    });
  } catch (error) {
    return console.error(error);
  }
};

export const validateJWT = async (req, res, next) => {
  try {
    let key = process.env.KEY;
    let { token } = req.headers;
    if (!token)
        return res.status(401).send({ message: "Token Expired/Invalid" });
    let { uid } = jwt.verify(token, key);
    let user = await User.findOne({ _id: uid });
    if (!user)
      return res.status(401).send({ message: "User Not Found/Invalid" });
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({ message: "Toker Expired/Invalid" });
  }
};
