import express from "express"
import SocketService  from "./services/socket";
import { createServer } from "http";


const app = express();
const socketService = new SocketService()

const server = createServer(app)

socketService.io.attach(server);

socketService.initListener()
app.get("/", (req, res)=>{
    res.json({
        msg:"Hello"
    })
})

server.listen(8080,()=>{
    console.log(`Server Running at http Port: 8080`); 
});