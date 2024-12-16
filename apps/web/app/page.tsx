"use client"

import { useState } from "react"
import { useSocket } from "../context/SockerProvider"


export default function Page() {

  const { sendMessage, messages } = useSocket()
  const [ message, setMessage] = useState("");

  function onClick(e: any){
    if(message.trim()){
    sendMessage(message)
    setMessage('');
    }
    
  }
  return <div>
    <div >
      <input className="border-2 border-slate-500 rounded-md m-2 w-52 items-center" onChange={(e) => setMessage(e.target.value)} placeholder="Message..."></input>
      <button className="pl-1 rounded-xl bg-cyan-500 w-20 border-2 border-cyan-800" onClick={onClick}>Send</button>
    </div>
    <div>
      {messages.map((e, index) => 
      <li key={index}>{e}</li>)}
    </div>
  </div>
}