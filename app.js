const express = require("express");
const app = express();
const { Server } = require("socket.io");
const connectToDatabase = require(".");

connectToDatabase()
const server = app.listen(4000, () => {
  console.log("Server has started at 4000");
});
//on - request pathaune
//emit  - response recieve garne but if there is no listener data gets lost cause there is no handler but data send even if there is listener or not

// creating a Socket.IO server , we should only once instance throughout project
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Someone has connected");

  // socket.on("disconnect",()=>{
  //     console.log("someone has disconnected")
  // })

  //client bata kei data aaudaixa vane [on] le linxa i.e postman , eventname - sendData
  // socket.on("sendData",(data)=>{
  //     console.log(data)
  // })

  //sending data form server to client(i.e postman) backend to frontend
  // socket.emit("hi", {
  //   greeting: "Hello how are you"
  // });

  // socket.on("sendData",(data)=>{
  //     if(data){
  //       socket.emit("response","Thank you your data was recived")
  //     }
  // })


  socket.on("sendData", (data) => {
    if(data){
      // to specific id , returning same data to frontend
      io.to(socket.id).emit('response',{data})
    }
  });
});

