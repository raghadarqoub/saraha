import userModel from "../../../model/User.model.js";
import messageModel from "../../../model/Message.model.js";
export const getMessages = async(req, res) => {
        const messageList = await messageModel.find({receiverId:req.user._id}).
        select('contact createAt');
        return res.json({message:"success",messageList});
}  

export const sendMessages =async (req, res) =>{
    const {receiverId} = req.params;
    const {message} = req.body;
    const user =await userModel.findById(receiverId);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    const createMessage = await messageModel.create({contact:message,receiverId});
    return res.status(201).json({message:"message sent",createMessage});
}