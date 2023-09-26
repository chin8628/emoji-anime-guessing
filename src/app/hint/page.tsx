"use client"
import dynamic from 'next/dynamic';
import {useState} from "react";
import {EmojiViewer} from "@/components/EmojiViewer/EmojiViewer";

const EmojiPicker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  {ssr: false}
);

export default function Home() {
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([])

  const selectEmoji = (emojiData) => {
    setSelectedEmojis(prev => [...prev, emojiData.unified])
  }

  const sendEmoji = () => {
  }

  return (
    <main>
      <EmojiViewer emojis={selectedEmojis}/>
      <EmojiPicker onEmojiClick={selectEmoji}/>
      <button onClick={sendEmoji}>Send!</button>
    </main>
  )
}
