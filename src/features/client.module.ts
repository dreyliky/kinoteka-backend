import { ClientsController } from '@controllers/client';
import { Module } from '@nestjs/common';
import { ClientCastService, ClientsService } from '@services/client';
import { SharedModule } from '../shared.module';

@Module({
    imports: [
        SharedModule
    ],
    controllers: [
        ClientsController
    ],
    providers: [
        ClientsService,
        ClientCastService
    ],
    exports: [
        ClientsService,
        ClientCastService
    ]
})
export class ClientModule {}
