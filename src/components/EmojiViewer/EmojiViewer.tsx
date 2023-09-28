import {Emoji} from "emoji-picker-react";
import './style.css'

type Props = {
  placeholder: string
  emojis: string[]
}

export const EmojiViewer = ({emojis, placeholder}: Props) => {
  return (
    <div className="container">
      {!emojis.length ?
        placeholder :
        emojis.map((emoji, index) => (
          <Emoji key={index} unified={emoji}/>
        ))
      }
    </div>
  )
}