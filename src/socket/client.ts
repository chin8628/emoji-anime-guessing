let conn

export const connectToHost = async (hostId: string, onReceive: (data: string) => void) => {
  const {Peer} = await import('peerjs')

  const peer = new Peer(self.crypto.randomUUID(),
    {
      debug: 3,
    }
  );

  return new Promise(res => {
    peer.on('open', () => {
      conn = peer.connect(hostId)

      conn.on('open', () => {
        res(true)
      })

      conn.on('data', (data: string) => {
        console.log('🚀 File: client.ts, Line: 21, data:', data)
        onReceive(data)
      })
    })
  })
}

export const joinHost = (username: string) => {
  conn.send(JSON.stringify({
    type: 'join',
    data: {
      username
    }
  }))
}

export const sendAnswer = (username: string, answer: string) => {
  conn.send(JSON.stringify({
    type: 'answer',
    data: {
      username,
      answer
    }
  }))
}