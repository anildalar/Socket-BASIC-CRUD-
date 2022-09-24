//console.log('OK');
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const env = require('dotenv');
env.config();

//const object = new  ClassName();
const io = new Server(httpServer, { /* options */ });

//io.on() Listen

//io.emit() speak
/* io.on("connection", (socket) => {
    console.log("Client Connected ",socket.id)
}); */

io.of("/admin").on("connection", (socket) => {
    console.log('Admin Connected ',socket.id);
    socket.on('adminEvent',(payload)=>{
        console.log('Payload',payload);
    });
});
io.of("/teacher").on("connection", (socket) => {
    console.log('Teacher Connected ',socket.id);
});
io.of("/student").on("connection", (socket) => {
    console.log('Student Connected ',socket.id);
    socket.on('studentEvent',(payload)=>{
        console.log('Payload',payload);
    });
});
  
  
let port = process.env.PORT || 3000;
httpServer.listen(port,()=>{
    console.log('Lisinting on port',port)
});