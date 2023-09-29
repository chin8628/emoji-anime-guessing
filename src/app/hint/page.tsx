"use client"
import dynamic from 'next/dynamic';
import {useEffect, useRef, useState} from "react";
import {EmojiViewer} from "@/components/EmojiViewer/EmojiViewer";
import {broadcast, createHost} from "@/socket/host";

const EmojiPicker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  {ssr: false}
);

let initiated = false

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomAnime = async () => {
  const randomNumber = randomIntFromInterval(1, 7720)
  const res = await fetch(`https://api.jikan.moe/v4/anime?limit=1&type=tv&sfw&page=${randomNumber}`)
  return (await res.json()).data[0]
}

export default function Page() {
  const [anime, setAnime] = useState<Record<string, unknown>>(null)
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([])
  const [hostId, setHostId] = useState("")
  const [players, setPlayers] = useState<string[]>([])

  useEffect(() => {
    const asyncFn = async () => {
      if (initiated) return
      initiated = true

      const id = await createHost(newUser => {
        setPlayers(prev => ([...prev, newUser]))
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

  const getAnime = async () => {
    setAnime(await getRandomAnime())
  }

  return (
    <main>
      <h1>{hostId ? `Host ID: ${hostId}` : "Creating a room..."}</h1>
      {anime && (<img alt="" src={anime.images.jpg.image_url}/>)}<br/>
      {anime && (<strong>{anime.title}</strong>)}<br/>
      <button onClick={getAnime}>Give me anime</button>
      <EmojiViewer placeholder="Hint it!" emojis={selectedEmojis} className="mb-5"/>
      <EmojiPicker onEmojiClick={selectEmoji}/>
      <button onClick={sendEmoji}>Send!</button>
      <button onClick={clearEmoji}>Clear</button>
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
