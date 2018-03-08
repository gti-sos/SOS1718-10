var express=require("express");
//var cool =require("cool-ascii-faces");
var port = (process.env.PORT || 1607)

var app=express();

app.use("/",express.static(__dirname+"/public"));

app.get("/hello",(req,res)=>{
    res.send("Hello world!");
});

app.get("/time",(req,res)=>{
    console.log("new request to /time");
    res.send(new Date());
})

app.listen(port,()=>{
    console.log("Server Ready on port" +port+ "!");
}).on("error",(e)=>{
    console.log("Server NOT READY:" +e+ "!");
});

//console.log(cool());
console.log("Server setting up....");
//