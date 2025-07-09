import { generateJWT } from "../Middlewares/jwt.js";
import { checkPassword, encrypt } from "../Middlewares/validator.js";
import { v2 } from "cloudinary";
import User from "./User.model.js";

export const test = async (req, res) => {
  return res.send({ message: "USER | Test Function" });
};

export const registUser = async (req, res) => {
  try {
    let data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      //# Valor por defecto
      profilePicture:
        "https://res.cloudinary.com/dkdkhgrpf/image/upload/v1751348598/ProfilePictures/image_1751348598557.jpg",
    };

    if (req.files?.profilePicture) {
      const file = req.files.profilePicture;

      //# Upload Image to Cloudinary
      const result = await v2.uploader.upload(
        `data:${file.mimetype};base64,${file.data.toString("base64")}`,
        {
          folder: process.env.folder,
          public_id: `image_${Date.now()}`,
        }
      );
      data.profilePicture = result.secure_url;
    }

    data.password = await encrypt(data.password);
    let user = new User(data);
    await user.save();
    return res.send({ message: "User Registered Sucessfully !!" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error registering User" });
  }
};

export const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user && (await checkPassword(password, user.password))) {
      let loggedUser = {
        uid: user._id,
        username: user.username,
      };
      let token = await generateJWT(loggedUser);
      return res.send({ message: `Welcome ${user.username} `, token });
    }
    return res
      .status(401)
      .send({ message: "Invalid Credentials, Please try Again" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Invalid Credentials, Please Try Again" });
  }
};

export const searchUser = async (req, res) => {
  try {
    let { username } = req.body;
    let user = await User.findOne({ username });
    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "User Not Found" });
  }
};

export const saveContact = async (req, res) => {
  try {
    //Obtener username del usuario logeado (mediante token)
    const { token } = req.headers;
    const claims = JSON.parse(atob(token.split(".")[1]));
    const userId = claims.uid;
    console.log(claims);
    console.log("id: ", claims.uid);

    //Buscar el ID del contacto a guardar
    let { username } = req.body;
    let contact = await User.findOne({ username });
    let contactId = contact._id.toString();
    console.log(contact);
    console.log("ID del contacto: ", contact._id.toString());

    //Verificar si el contacto a está agregado
    let user = await User.findById(userId)
    if(user.contacts.includes(contactId)){
      return res.status(400).send({message:'Contact Already Exists'})
    }

    //guardar al contacto
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { contacts: contactId } },
      { new: true }
    );
    return res.send({ message: "Contact Saved Successfully !!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Error saving Contact, pĺease try Again" });
  }
};
