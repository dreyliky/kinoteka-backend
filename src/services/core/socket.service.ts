import { SocketEventEnum } from '@enums/core';
import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Server, Socket } from 'socket.io';

@Injectable()
export class SocketService {
    public get sockets(): Socket[] {
        return this._sockets;
    }

    public get onSocketConnect$(): Observable<Socket> {
        return this._onSocketConnect$.asObservable();
    }

    public get onSocketDisconnect$(): Observable<Socket> {
        return this._onSocketDisconnect$.asObservable();
    }

    private readonly io = new Server(3001, {
        cors: {
            origin: '*'
        }
    });

    private readonly _sockets: Socket[] = [];
    private readonly _onSocketConnect$ = new Subject<Socket>();
    private readonly _onSocketDisconnect$ = new Subject<Socket>();

    constructor() {
        this.io.on('connection', (socket) => {
            this._sockets.push(socket);
            this._onSocketConnect$.next(socket);

            socket.on('disconnect', () => {
                this.removeFromSockets(socket);
                this._onSocketDisconnect$.next(socket);
            });
        });
    }

    public notifyAll(event: SocketEventEnum, data: unknown): void {
        this.sockets
            .forEach((socket) => socket.emit(event, data));
    }

    private removeFromSockets(socket: Socket): void {
        const socketIndex = this.sockets.indexOf(socket);

        this.sockets.splice(socketIndex, 1);
    }
}
