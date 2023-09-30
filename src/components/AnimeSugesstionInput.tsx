import {useEffect, useState} from "react";

const searchAnime = async (query: string): Promise<Record<string, unknown>[]> => {
  const res = await fetch(`https://api.jikan.moe/v4/anime?limit=8&type=tv&sfw&page=1&q=${encodeURIComponent(query)}`)
  return (await res.json()).data || []
}

export const AnimeSugesstionInput = () => {
  const [animeSuggestions, setAnimeSuggestions] = useState<string[]>([])

  const onTypeKeyword = async (event) => {
    const q = event.target.value
    if (q.length < 3) return

    console.log('🚀 File: AnimeSugesstionInput.tsx, Line: 15, q:', q)
    const animes = await searchAnime(q)
    console.log('🚀 File: AnimeSugesstionInput.tsx, Line: 17, animes:', animes)
    const titles = animes.reduce((prev, curr) => ([...prev, ...[curr.title, curr.title_english]]), []).filter(item => item)
    console.log('🚀 File: AnimeSugesstionInput.tsx, Line: 19, titles:', titles)
    setAnimeSuggestions(titles as [])
  }

  return (
    <>
      <input
        type="text"
        id="answer"
        name="answer"
        className="border border-gray-400 rounded w-full py-2 px-3 mb-4"
        placeholder="Enter your answer"
        required
        list="anime"
        onChange={onTypeKeyword}
      />
      <datalist id="anime">
        {
          animeSuggestions.map((title, index) => (<option key={index} value={title}></option>))
        }
      </datalist>

    </>
  )
}