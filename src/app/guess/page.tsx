"use client"
import {EmojiViewer} from "@/components/EmojiViewer/EmojiViewer";
import {connectToHost} from "@/socket/client";
import {useEffect, useState} from "react";


let initiated = false

export default () => {
  const [hint, setHint] = useState<string[]>([])

  useEffect(() => {
    if (initiated) return
    initiated = true
    connectToHost('host', (data) => {
      setHint(JSON.parse(data))
    });
  }, [])

  return (
    <EmojiViewer placeholder="Loading..." emojis={hint}/>
  )
}