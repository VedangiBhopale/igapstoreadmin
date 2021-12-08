var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(express.json());


app.use((req, res, next)=>{
    res.header("Access-Cantrol-Allow-Origin", "*");
    res.header("Access-Cantrol-Allow-Headers", "*");
    if(req.method == "OPTIONS"){
         res.header("Access-Cantrol-Allow-Methods", 'POST,GET,PUT,PATCH,DELETE');
         return res.status(200).json({});
    }
    next();
});

app.get("/", function(req,res){
   res.send("Hello World, this i s to cool.Welcome to igapstore.This back end of web application.");
  res.end();
});

const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

const userRouter = require("./routes/user");
app.use("/user", userRouter);



app.listen(8081, function (){
     console.log("Server Started");
});

