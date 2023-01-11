const express = require("express")

app = express()

app.get("/", (req, res)=>{
    console.log(123);
    res.send("123123")
})


app.listen(3000)