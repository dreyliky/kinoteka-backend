import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class SocketService {
    public get sockets(): Socket[] {
        return this._sockets;
    }

    private readonly io = new Server(3001, {
        cors: {
            origin: '*'
        }
    });

    private readonly _sockets: Socket[] = [];

    constructor() {
        this.io.on('connection', (socket) => {
            this._sockets.push(socket);
            socket.on('disconnect', () => this.removeFromSockets(socket));
        });
    }

    private removeFromSockets(socket: Socket): void {
        const socketIndex = this.sockets.indexOf(socket);

        this.sockets.splice(socketIndex, 1);
    }
}
