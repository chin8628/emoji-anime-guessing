import {Emoji} from "emoji-picker-react";
import './style.css'

type Props = {
  emojis: string[]
}

export const EmojiViewer = ({emojis}: Props) => {
  return (
    <div className="container">
      {!emojis.length ?
        'Hint it!' :
        emojis.map((emoji) => (
          <Emoji unified={emoji}/>
        ))
      }
    </div>
  )
}