import { Client } from '@interfaces/client';
import { SocketDto } from '@interfaces/core';
import { Injectable } from '@nestjs/common';
import { SocketService } from '@services/core';
import { Socket } from 'socket.io';

@Injectable()
export class ClientsService {
    constructor(
        private readonly socketService: SocketService
    ) {}

    public getAll(): Client[] {
        return this.socketService.sockets
            .map((socket) => this.mapSocketToClient(socket));
    }

    public get(socketId: string): Client {
        const socket = this.socketService.findSocketById(socketId);

        return this.mapSocketToClient(socket);
    }

    private mapSocketToClient(socket: Socket): Client {
        const socketQuery = socket.handshake.query as SocketDto;
        const deviceInfo = JSON.parse(socketQuery.deviceInfo);

        return {
            socketId: socket.id,
            deviceInfo
        };
    }
}
