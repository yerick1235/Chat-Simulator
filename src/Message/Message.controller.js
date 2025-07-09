import Message from "./Message.model.js";

export const test = async (req, res) => {
  return res.send({ message: "MESSAGE | TEST" });
};

export const sendMessage = async(req, res)=>{
    try {
        let data = {
            content: req.body.content,
            sender: req.body.sender,
            receiver: req.body.receiver,
            replyTo: req.body.replyTo || null,
            image: req.files?.image || null
        }
        console.log(data);
        let message = new Message(data)
        await message.save()
        return res.send({message:'Message sended successfully !!'})
    } catch (error) {
        console.error(error);
        return res.status(500).send({message:'Error Sending Message'})
    }
}