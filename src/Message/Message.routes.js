import express from "express"
import { sendMessage, test } from "./Message.controller.js"

const api = express.Router()

api.get('/test', test),
api.post('/send', sendMessage)

export default api