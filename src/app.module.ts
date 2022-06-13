import { CONTROLLERS } from '@controllers/list';
import { FACTORIES } from '@factories/list';
import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { REPOSITORIES } from '@repositories/list';
import { SERVICES } from '@services/list';
import { STATES } from '@states/list';

@Module({
    imports: [
        HttpModule,
        CacheModule.register({
            ttl: (1000 * 30)
        })
    ],
    controllers: CONTROLLERS,
    providers: [
        ...SERVICES,
        ...FACTORIES,
        ...REPOSITORIES,
        ...STATES
    ]
})
export class AppModule {}
