import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FileDownloaderService, OsService, SocketService } from '@services/core';

@Module({
    imports: [
        HttpModule
    ],
    providers: [
        SocketService,
        FileDownloaderService,
        OsService
    ],
    exports: [
        HttpModule,

        SocketService,
        FileDownloaderService,
        OsService
    ]
})
export class SharedModule {}
