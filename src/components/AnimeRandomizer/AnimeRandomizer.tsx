import {useState} from "react";
import './style.css'

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomAnime = async () => {
  const randomNumber = randomIntFromInterval(1, 7720)
  const res = await fetch(`https://api.jikan.moe/v4/anime?limit=1&type=tv&sfw&page=${randomNumber}`)
  return (await res.json()).data[0]
}

export const AnimeRandomizer = () => {
  const [anime, setAnime] = useState<Record<string, unknown>>(null)
  const getAnime = async () => {
    setAnime(await getRandomAnime())
  }

  return (
    <div>
      <div className="imageBox">
        {anime && (<img alt="" src={anime.images.jpg.image_url}/>)}
      </div>
      <h1 className="animeTitle">{anime && (<strong>{anime.title}</strong>)}</h1>
      <button onClick={getAnime}>Random</button>
    </div>
  )
}