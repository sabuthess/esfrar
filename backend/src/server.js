const express = require("express")
const app = express()


app.get("/", (req,res) => {
    res.send("hello! ")
})


app.listen(3500, () => {
    console.log("----------------------- server runing -----------------------")
})