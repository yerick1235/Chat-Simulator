import mongoose, { Schema, model } from "mongoose"

const messageSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    sender:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    receiver:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    replyTo:{
        type: Schema.ObjectId,
        ref: 'message',
        default: null
    },
    timeStamp:{
        type: Date,
        default: Date.now
    },
    image:{
        type: String,
        default: null
    }
})

export default model("message", messageSchema)