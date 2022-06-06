import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FileDownloaderService, SocketService } from '@services/core';

@Module({
    imports: [
        HttpModule
    ],
    providers: [
        SocketService,
        FileDownloaderService
    ],
    exports: [
        HttpModule,

        SocketService,
        FileDownloaderService
    ]
})
export class SharedModule {}
