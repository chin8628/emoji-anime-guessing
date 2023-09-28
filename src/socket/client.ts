export const connectToHost = async (hostId: string, onReceive: (data: string) => void) => {
  const {Peer} = await import('peerjs')

  const peer = new Peer("client1", {
    debug: 3,
  });

  peer.on('open', () => {
    const conn = peer.connect('test2')

    conn.on('data', (data: string) => {
      console.log('🚀 File: client.ts, Line: 16, data:', data)
      onReceive(data)
    })
  })
}