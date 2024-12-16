'use client'

import React, { createContext, useCallback, useContext, useEffect, useState, useMemo } from "react"
import { io, Socket } from "socket.io-client"

interface SocketProviderProps {
    children?: React.ReactNode
}

export interface ISocketContext {
    sendMessage: (msg: string) => any; 
    messages: string[];
};

const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error("Erroraneous State")
  
    return state;
  };


export const SocketProvider: React.FC<SocketProviderProps> = ({children})=>{
    const [socket, setSocket] = useState<Socket>()
    const [ messages, setMessages] = useState<string[]>([])

    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg)=>{
        console.log("Send Message", msg);
        if(socket){
            socket.emit("event:message", { message: msg})
        }
    },[socket])

    const onMessageRec= useCallback((msg: string)=>{
        try {
            const { message } = JSON.parse(msg) as { message: string };
            setMessages((prev) => [...prev, message]);
        } catch (err) {
            console.error("Failed to parse server message:", err);
        }
    },[])

    useEffect(()=>{
        const _socket = io('http://localhost:8080')
        
        _socket.on('message',onMessageRec)
        setSocket(_socket)

        return ()=>{
            _socket.off("message",onMessageRec)
            _socket.disconnect();
            setSocket(undefined)
        }
    },[])


    const value = useMemo(
        () => ({
            sendMessage,
            messages,
        }),
        [sendMessage, messages]
    );

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}