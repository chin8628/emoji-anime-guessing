import type {DataConnection} from "peerjs";

let remoteConnections: DataConnection[] = []

export const createHost = async (): Promise<string> => {
  const {Peer} = await import('peerjs')

  const peer = new Peer("test2", {
    debug: 3,
  });

  peer.on("connection", (conn: DataConnection) => {
    remoteConnections.push(conn)
  });

  return new Promise<string>((res) => {
    peer.on('open', (id: string) => {
      console.log('My peer ID is: ' + id);
      res(id)
    });
  })
}

export const broadcast = (data: string) => {
  remoteConnections.map(conn => {
    conn.send(data)
  })
}