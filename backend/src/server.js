import express from "express"
import cors from  "cors"
import authRoutes from "./routes/auth.route.js"
import session from "express-session"
import passport from "passport";
import {dotenv_config} from "./config/dotenv.js";

// const imagesRouters = require("./routes/images.routes")


const app = express()

const PORT = dotenv_config.port


app.use(cors())
app.use(express.json())


app.use(session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/api", authRoutes)

app.get("/", (req,res) => {

})




app.listen(PORT, () => {
    console.log(`----------------------- server runing on the port: ${PORT} -----------------------`)
})