import { v2 } from "cloudinary";
import { config } from "dotenv";
import fileUpload from "express-fileupload";
config()

export const cloudinaryConnection = async () => {
  try {
    v2.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret
    });
    console.log('Cloudinary Conection Success');
  } catch (error) {
    return console.error(`Cloudinary Connection Failed, ${error}`);
  }
};
