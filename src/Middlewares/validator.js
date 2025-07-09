import { compare, hash } from "bcrypt";

export const encrypt = (password) => {
  try {
    return hash(password, 10);
  } catch (error) {
    return console.error(error);
  }
};

export const checkPassword = async (password, hash) => {
  try {
    return await compare(password, hash);
  } catch (error) {
    return console.error(error);
  }
};
