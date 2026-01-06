import express from "express"
import cors from  "cors"

import {dotenv_config} from "./config/dotenv.js";

// const imagesRouters = require("./routes/images.routes")
import imageRoutes from "./routes/image.routes.js"

const app = express()

const PORT = dotenv_config.port


app.use(cors())
app.use(express.json())


/* app.use(session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/api", authRoutes) */
app.use("/api", imageRoutes)

app.get("/", (req,res) => {
    res.send("Hello world!")
})




app.listen(PORT, () => {
    console.log(`----------------------- server runing on the port: ${PORT} -----------------------`)
})