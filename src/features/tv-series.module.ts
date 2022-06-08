import { TvSeriesController } from '@controllers/tv-series';
import { Module } from '@nestjs/common';
import { TvSeriesService } from '@services/tv-series';
import { SharedModule } from '../shared.module';

@Module({
    imports: [
        SharedModule
    ],
    controllers: [
        TvSeriesController
    ],
    providers: [
        TvSeriesService
    ],
    exports: [
        TvSeriesService
    ]
})
export class TvSeriesModule {}
