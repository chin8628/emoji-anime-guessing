import type {DataConnection} from "peerjs";

let remoteConnections: DataConnection[] = []

const getHostId = (): string => Math.floor(100000 + Math.random() * 900000).toString()

export const createHost = async (onNewUserJoin: (username: string) => void): Promise<string> => {
  const {Peer} = await import('peerjs')

  const peer = new Peer(getHostId(), {
    debug: 3,
  });

  peer.on("connection", (conn: DataConnection) => {
    remoteConnections.push(conn)
    conn.on('data', (res: string) => {
      const data = JSON.parse(res)
      if (data.type === 'join') {
        onNewUserJoin(data.data.username)
      }
    })
  });

  return new Promise<string>((res) => {
    peer.on('open', (id: string) => {
      res(id)
    });
  })
}

export const broadcast = (data: string) => {
  remoteConnections.map(conn => {
    conn.send(data)
  })
}