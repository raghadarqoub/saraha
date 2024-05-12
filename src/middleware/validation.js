const dataMethods =['body','query','params','headers']
const validation =(schema)=>{
    return (req,res,next)=>{
        const validtionArray=[];
        dataMethods.forEach(key=>{if(schema[key])
            {
                const validtionResult = schema[key].validate(req[key],{abortEarly:false});
                if (validtionResult.error) {
                    validtionArray.push(validtionResult.error)
            }
        }
        });

        
        if (validtionArray.length > 0) {
            return res.status(400).json ({message:"validation error",error:validtionArray});
    }
    next();
}
}
export default validation;