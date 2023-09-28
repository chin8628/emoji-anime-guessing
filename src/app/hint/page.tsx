"use client"
import dynamic from 'next/dynamic';
import {useEffect, useRef, useState} from "react";
import {EmojiViewer} from "@/components/EmojiViewer/EmojiViewer";
import {broadcast, createHost, disconnect} from "@/socket/host";

const EmojiPicker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  {ssr: false}
);

let initiated = false

export default function Page() {
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([])
  const [hostId, setHostId] = useState("")
  useEffect(() => {
    const asyncFn = async () => {
      if (initiated) return
      initiated = true

      const id = await createHost()
      setHostId(id)
    }

    asyncFn()
  }, [])

  const selectEmoji = (emojiData) => {
    setSelectedEmojis(prev => [...prev, emojiData.unified])
  }

  console.log('🚀 File: page.tsx, Line: 35', selectedEmojis)

  const sendEmoji = () => {
    broadcast(JSON.stringify(selectedEmojis))
  }

  const clearEmoji = () => {
    setSelectedEmojis([])
    broadcast("")
  }

  return (
    <main>
      <h1>{hostId ? `Host ID: ${hostId}` : "Creating a room..."}</h1>
      <EmojiViewer placeholder="Hint it!" emojis={selectedEmojis} className="mb-5"/>
      <EmojiPicker onEmojiClick={selectEmoji}/>
      <button onClick={sendEmoji}>Send!</button>
      <button onClick={clearEmoji}>Clear</button>
    </main>
  )
}
