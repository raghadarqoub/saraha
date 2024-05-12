import  mongoose  from "mongoose";
const connectDb = ()=>{
    mongoose.connect(process.env.DB)
    .then(()=>{
        console.log("Connected to MongoDB")
    }).catch((error)=>{
        console.log(error);
    })
};

export default connectDb;