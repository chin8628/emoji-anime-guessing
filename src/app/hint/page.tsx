"use client"
import dynamic from 'next/dynamic';
import {useEffect, useRef, useState} from "react";
import {EmojiViewer} from "@/components/EmojiViewer/EmojiViewer";
import {broadcast, createHost} from "@/socket/host";
import {AnimeRandomizer} from "@/components/AnimeRandomizer/AnimeRandomizer";

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
  const [players, setPlayers] = useState<string[]>([])
  const [givenAnswers, setGivenAnswers] = useState<Record<string, string>>({})

  useEffect(() => {
    const asyncFn = async () => {
      if (initiated) return
      initiated = true

      const id = await createHost(newUser => {
        setPlayers(prev => ([...prev, newUser]))
      }, (username: string, answer: string) => {
        setGivenAnswers(prev => ({
          ...prev,
          [username]: answer
        }));
      })
      setHostId(id)
    }

    asyncFn()
  }, [])

  const selectEmoji = (emojiData) => {
    setSelectedEmojis(prev => [...prev, emojiData.unified])
  }

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
      <div className="flex">
        <div className="flex-1 p-4">
          <AnimeRandomizer/>
        </div>
        <div className="flex-1 p-4">
          <EmojiViewer placeholder="Hint it!" emojis={selectedEmojis} className="mb-5"/>
          <EmojiPicker onEmojiClick={selectEmoji}/>
          <button onClick={sendEmoji}>Send!</button>
          <button onClick={clearEmoji}>Clear</button>
        </div>
      </div>


      <div>
        <h2>Answer from players</h2>
        <ul>
          {
            Object.entries(givenAnswers).map(([username, answer]) => (<li key={username}>{username}: {answer}</li>))
          }
        </ul>
      </div>
      <div>
        {players.length === 0 && (<h2>You have no friend!</h2>)}
        {players.length > 0 && (<h2>Friends!</h2>)}
        <ul>
          {
            players.map((username) => (<li key={username}>{username}</li>))
          }
        </ul>
      </div>
    </main>
  )
}
