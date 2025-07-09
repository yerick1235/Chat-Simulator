import { initServer } from "./configs/app.js"
import { connect } from "./configs/mongo.js"
import { cloudinaryConnection } from "./src/Middlewares/CloudinaryConnection.js"

initServer()
connect()
cloudinaryConnection()