
const express = require("express");
const app = express();
let roomId = "conference";
// server
const httpServer = require("http").createServer(app);
const socketServer = require("socket.io")(httpServer);

// client-size

app.use(express.static("main"));

socketServer.on("connection" , function (socket) {
    // socket.room = roomId;
    console.log("New Client Connected");
    console.log(socket.id);
    socket.room = roomId;

    socket.on('switchRoom', function(newroom){
        // roomId = newroom;
        console.log("Room Id changed");
        socket.leave(socket.room);
        socket.join(newroom);
        socket.room = newroom;
     });
    // listener ==> recieve
    socket.on("colorChange", function (color) {
        socket.to(socket.room).emit('rColorChange' , color);
    })

    socket.on("md",function(point) {
        socket.to(socket.room).emit("onmd",point);
    })

    socket.on("mm", function(point) {
        socket.to(socket.room).emit("onmm",point);
    })

})

httpServer.listen(3000, function() {
    console.log("Server is listening to request at port 3000");
})