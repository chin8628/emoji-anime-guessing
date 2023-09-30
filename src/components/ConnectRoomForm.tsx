import {useState} from "react";
import {connectToHost, joinHost} from "@/socket/client";

type Props = {
  onReceiveHint: (hint: string[]) => void,
  onJoin: (username: string) => void
}

export const ConnectRoomForm = ({onReceiveHint, onJoin}: Props) => {
  const submit = async (event) => {
    event.preventDefault()

    const hostId = event.target.hostId.value
    const userName = event.target.playerName.value

    await connectToHost(hostId, (data) => {
      try {
        onReceiveHint(JSON.parse(data))
      } catch (e) {
        onReceiveHint([])
      }
    });

    joinHost(userName)
    onJoin(userName)
  }

  return (
    <div className="max-w-md mx-auto h-min mt-8 p-6 bg-white rounded-lg shadow-md relative top-[25vh]">
      <form method="post" onSubmit={submit}>
        <div className="mb-4">
          <label htmlFor="hostId" className="block text-gray-700 font-bold mb-2">Host ID</label>
          <input
            type="number"
            id="hostId"
            name="hostId"
            className="border border-gray-400 rounded w-full py-2 px-3"
            placeholder="Enter Host ID"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="playerName" className="block text-gray-700 font-bold mb-2">Player Name</label>
          <input
            type="text"
            id="playerName"
            name="playerName"
            className="border border-gray-400 rounded w-full py-2 px-3"
            placeholder="Enter Player Name"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
          >
            Join
          </button>
        </div>
      </form>
    </div>
  )
}