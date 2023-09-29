"use client"
import {EmojiViewer} from "@/components/EmojiViewer/EmojiViewer";
import {sendAnswer} from "@/socket/client";
import {useState} from "react";
import {ConnectRoomForm} from "@/components/ConnectRoomForm";

export default () => {
  const [hint, setHint] = useState<string[]>([])
  const [answer, setAnswer] = useState("")
  const [username, setUsername] = useState("")

  return (
    <div>
      {
        username === "" ? (
          <ConnectRoomForm onReceiveHint={(hint) => setHint(hint)} onJoin={(username) => setUsername(username)}/>
        ) : (
          <>
            <EmojiViewer placeholder="Waiting for a hint..." emojis={hint}/>
            <label>
              Answer:
              <input type="text" onChange={(event) => setAnswer(event.target.value)}/>
            </label>
            <button onClick={() => sendAnswer(username, answer)} disabled={!answer}>Answer!</button>
          </>
        )
      }
    </div>
  )
}