const express = require("express")
const logger = require("morgan")
const fs = require("fs")

app = express()
app.use(logger("combined", {
    stream: fs.createWriteStream("./access.log", {flags: 'a'})
}))
app.use(logger("dev"))

app.get("/", (req, res)=>{
    console.log(123);
    res.send("우와아아")
})


app.listen(4000,()=>console.log("http://localhost:4000"))