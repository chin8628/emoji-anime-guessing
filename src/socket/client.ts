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
        onReceive(data)
      })
    })
  })
}

export const joinHost = async (username: string) => {
  conn.send(JSON.stringify({
    type: 'join',
    data: {
      username
    }
  }))
}