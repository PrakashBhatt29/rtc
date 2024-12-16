import { Server } from "socket.io";
import { Redis } from "ioredis"


const pub = new Redis({
    host:'caching-6f70d8a-paddybhatt-c5ca.f.aivencloud.com',
    port: 22477,
    username:"default",
    password: "AVNS_UiIKBEJVTp8dHVeF1CH"
});
const sub = new Redis({
    host:'caching-6f70d8a-paddybhatt-c5ca.f.aivencloud.com',
    port: 22477,
    username:"default",
    password: "AVNS_UiIKBEJVTp8dHVeF1CH"
});

class SocketService {
    private _io: Server;
    constructor() {
        console.log("Init Socket Service..");
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*"
            }
        });
        sub.subscribe("MESSAGES");
    }

    public initListener() {
        const io = this.io;
        console.log("Init socket listener");
        io.on("connect",async (socket)=> {
            console.log(`New Socket connected`, socket.id);
            socket.on("event:message", async({message}:{message:string})=>{
                console.log(`New Message  Rec.`,message);
                await pub.publish("MESSAGES",JSON.stringify({message}));
            })
           sub.on('message',async(channel, message)=>{
            if( channel === 'MESSAGES'){
                io.emit("message",message)
            }
           })
        })
    }
    get io(){
        return this._io
    }
}

export default SocketService