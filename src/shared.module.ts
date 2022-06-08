import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { FileDownloaderService, OsService, SocketService } from '@services/core';

@Module({
    imports: [
        HttpModule,
        CacheModule.register({
            ttl: (1000 * 30)
        })
    ],
    providers: [
        SocketService,
        FileDownloaderService,
        OsService
    ],
    exports: [
        HttpModule,
        CacheModule,

        SocketService,
        FileDownloaderService,
        OsService
    ]
})
export class SharedModule {}
