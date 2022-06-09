import { Client } from '@interfaces/client';
import { CastDto } from '@interfaces/core';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientCastService, ClientsService } from '@services/client';

@Controller('clients')
export class ClientsController {
    constructor(
        private readonly clientsService: ClientsService,
        private readonly clientCastService: ClientCastService
    ) {}

    @Get()
    public getAll(): Client[] {
        return this.clientsService.getAll();
    }

    @Get(':socketId')
    public get(@Param('socketId') socketId: string): Client {
        return this.clientsService.get(socketId);
    }

    @Post(':socketId/cast')
    public cast(
        @Param('socketId') socketId: string,
        @Body() castDto: CastDto
    ): unknown {
        this.clientCastService.cast(socketId, castDto);

        return null;
    }
}
