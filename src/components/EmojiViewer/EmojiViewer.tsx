import {Emoji} from "emoji-picker-react";
import './style.css'

type Props = {
  placeholder: string
  emojis: string[]
  className?: string
}

export const EmojiViewer = ({emojis, placeholder, className}: Props) => {
  return (
    <div className={className}>
      <div className="container">
        {!emojis.length ?
          placeholder :
          emojis.map((emoji, index) => (
            <Emoji key={index} unified={emoji}/>
          ))
        }
      </div>
    </div>
  )
}