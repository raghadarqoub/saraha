import express from "express";
import initApp from "./src/modules/app.router.js";
import 'dotenv/config';
const app = express();
const PORT =process.env.PORT;

initApp(app,express);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
