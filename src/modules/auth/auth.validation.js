import joi from "joi";
export const singupSchema ={ 
    body: joi.object({
    userName: joi.string().alphanum().min(3).max(20).required()
    .messages({
        "string.empty":"userName is required",
        "any.required":"userName is required"
    }),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).required(),
    cPassword: joi.valid(joi.ref('password')).required(),
    // age: joi.number().min(20).positive().required(),
    // gender: joi.string().alphanum().valid('Male', 'Female').required()

}),
        query:joi.object({
            test:joi.boolean().required()
        })
};

export const singinSchema = {
    body:joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).required(),
})}