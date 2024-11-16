const express = require("express");
const http = require("http");
const app = express();
const server=http.createServer(app)// accepts a request listener
const path = require("path");//--> path.join deta h 
const socketio = require("socket.io");
const io=socketio(server);// its an object


// for static files
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.get('/',(req,res)=>{
    console.log("home page");
    res.render("home")
})
app.get('/chat',(req,res)=>{
    res.render("landing.ejs")
})
io.on("connection",(socket)=>{
    console.log( `connection is established at ${socket.id}`);

    socket.on("send-msg",(data)=>{// listen to some event
        console.log(data)
        io.emit("recieved-msg", {
            msg: data.msg,
            id: socket.id,
            username: data.username || "Anonumous"
           
        });
    })
    
    
})

const port =  3000;
server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})