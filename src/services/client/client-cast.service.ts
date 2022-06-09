import { SocketEventEnum } from '@enums/core';
import { CastDto } from '@interfaces/core';
import { Injectable } from '@nestjs/common';
import { SocketService } from '@services/core';

@Injectable()
export class ClientCastService {
    constructor(
        private readonly socketService: SocketService
    ) {}

    public cast(socketId: string, data: CastDto): void {
        this.socketService.notify(socketId, SocketEventEnum.Cast, data);
    }
}
