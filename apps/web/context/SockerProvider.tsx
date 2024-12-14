'use client'

import React, { useCallback, useContext, useEffect } from "react"
import { io } from "socket.io-client"

interface SocketProviderProps {
    children?: React.ReactNode
}

interface SocketContextProps {
    sendMessage: (msg :string) => any
}

const SocketContext = React.createContext<SocketContextProps | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext)
    if(!state) throw new Error (`State is Undefined`)
}


export const SocketProvider: React.FC<SocketProviderProps> = ({children})=>{

    const sendMessage: SocketContextProps['sendMessage']= useCallback((msg)=>{
        console.log("Send Message", msg);
    },[])

    useEffect(()=>{
        const _socket = io('http://localhost:8080')

        return ()=>{
            _socket.disconnect();
        }
    },[])

    return (
        <SocketContext.Provider value={null}>
            {children}
        </SocketContext.Provider>
    )
}