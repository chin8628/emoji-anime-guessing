"use client"
import {EmojiViewer} from "@/components/EmojiViewer/EmojiViewer";
import {sendAnswer} from "@/socket/client";
import {useState} from "react";
import {ConnectRoomForm} from "@/components/ConnectRoomForm";

export default () => {
  const [hint, setHint] = useState<string[]>([])
  const [username, setUsername] = useState("")
  const [showNoti, setShowNoti] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()

    sendAnswer(username, event.target.answer.value)
    setShowNoti(true)

    setTimeout(() => {
      setShowNoti(false)
    }, 3000)
  }

  return (
    <div className="flex justify-center h-screen">
      {
        username === "" ? (
          <ConnectRoomForm onReceiveHint={(hint) => setHint(hint)} onJoin={(username) => setUsername(username)}/>
        ) : (
          <div className="relative top-[25vh]">
            <EmojiViewer placeholder="Waiting for a hint..." emojis={hint}/>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <form method="post" onSubmit={onSubmit}>
                <label htmlFor="answer" className="block text-gray-700 font-bold mb-2">Answer</label>
                <input
                  type="text"
                  id="answer"
                  name="answer"
                  className="border border-gray-400 rounded w-full py-2 px-3 mb-4"
                  placeholder="Enter your answer"
                  required
                />
                <button
                  type="submit"
                  className="w-full"
                >
                  Submit
                </button>
              </form>
            </div>
            {showNoti &&
              <div
                className="shadow-md mt-4 bg-emerald-400 text-white font-semibold px-2 py-1 rounded-md">
                Sent!
              </div>
            }
          </div>
        )
      }
    </div>
  )
}