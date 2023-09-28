export const connectToHost = async (hostId: string, onReceive: (data: string) => void) => {
  const {Peer} = await import('peerjs')

  const peer = new Peer(self.crypto.randomUUID(),
    {
      debug: 3,
    }
  );

  peer.on('open', () => {
    const conn = peer.connect(hostId)

    conn.on('data', (data: string) => {
      console.log('🚀 File: client.ts, Line: 16, data:', data)
      onReceive(data)
    })
  })
}