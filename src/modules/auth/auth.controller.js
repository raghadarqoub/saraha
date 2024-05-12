import userModel from "../../../model/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../../untils/sendEmail.js";
export const  signUp = async (req, res) => {
const { userName,email, password } =req.body;
const user = await userModel.findOne({email});

if (user) {
    return res.status(409).json ({message :"email already exists"});
}
const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUND)); // لتشفير البيانات bcrypt , parseInt بحول ل int 
const newUser = await userModel.create({ userName, email, password:hashedPassword });

if (!newUser) {
    return res.json ({message :"error while creating user"});
}
const token = await jwt.sign({email},process.env.CONFIRMEMAILTOKEN,{expiresIn:60*1});
const refreshToken = await jwt.sign({email},process.env.REFRESHTOKEN,{expiresIn:60*60*24*30});
const html = `
    <h1>infinity light</h1>
    <p> welcome ${userName} to saraha</p>
    <div>
    <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>confirm email</a>
    <a href='${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${refreshToken}'> resent confirm email</a>
    <div/>
    
    `;
sendEmail(email , 'welcome message',html);
return res.status(201).json ({message :"success" ,newUser});
};

export const singIn = async (req, res) => {
    const {email, password } =req.body;
const user = await userModel.findOne({email}).select('userName password confirmEmail');

if (!user) {
    return res.json ({message :"email not exists"});
}
if (!user.confirmEmail) {
    return res.json ({message :"plz confirm your email"});
}
const match = await bcrypt.compare(password, user.password);
if (!match) {
    return res.json ({message :"invalid password"});
} 
const token=jwt.sign({id: user._id}, process.env.LOGINSIG);
return res.json({ message:"success", token});

}


export const confirmEmail = async (req, res) => {
    const {token} = req.params;
    const decoded =jwt.verify(token,process.env.CONFIRMEMAILTOKEN);
    const user = await userModel.findOne({email:decoded.email},{confirmEmail: true});
    if(user.modifiedCount > 0) {

        return res.redirect (process.env.FEURL);
    }
}
