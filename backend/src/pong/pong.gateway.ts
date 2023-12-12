import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect,
  WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server} from 'socket.io';

@WebSocketGateway({ cors: true })
export class PongGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server: Server;
  handleConnection(socket: Socket) {
    console.log('Connected to WebSocket server');

 //   socket.on('game', (playerData) => {
 //     console.log('Received player move:', playerData);
 //   });
  }
  handleDisconnect(client: Socket) {
		console.log('Client disconnected ');
  }
  @SubscribeMessage('move')
  handleMove(socket :Socket, data:{y: number}){
    console.log(data)
    this.server.emit('move', { id: socket.id, ...data });
  }
}
