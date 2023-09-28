"use client"
import {EmojiViewer} from "@/components/EmojiViewer/EmojiViewer";
import {connectToHost} from "@/socket/client";
import {useEffect, useState} from "react";


export default () => {
  const [hint, setHint] = useState<string[]>([])
  const [hostId, setHostId] = useState("")

  const submitHostId = () => {
    connectToHost(hostId, (data) => {
      setHint(JSON.parse(data))
    });
  }

  return (
    <div>
      <label>
        Host ID:
        <input type="number" onChange={(event) => setHostId(event.target.value)}/>
      </label>
      <button onClick={submitHostId}>Join!</button>
      <EmojiViewer placeholder="Waiting for a hint..." emojis={hint}/>
    </div>
  )
}