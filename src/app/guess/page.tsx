"use client"
import {EmojiViewer} from "@/components/EmojiViewer/EmojiViewer";
import {connectToHost, joinHost} from "@/socket/client";
import {useEffect, useState} from "react";


export default () => {
  const [hint, setHint] = useState<string[]>([])
  const [hostId, setHostId] = useState("")
  const [username, setUsername] = useState("")

  const submitHostId = async () => {
    await connectToHost(hostId, (data) => {
      setHint(JSON.parse(data))
    });

    joinHost(username)
  }

  return (
    <div>
      <label>
        Host ID:
        <input type="number" onChange={(event) => setHostId(event.target.value)}/>
      </label>
      <label>
        Name:
        <input type="text" onChange={(event) => setUsername(event.target.value)}/>
      </label><br/>
      <button onClick={submitHostId} disabled={!(username && hostId)}>Join!</button>
      <EmojiViewer placeholder="Waiting for a hint..." emojis={hint}/>
    </div>
  )
}