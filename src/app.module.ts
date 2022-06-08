import { Module } from '@nestjs/common';
import {
    FilmModule,
    SettingsModule,
    TvSeriesModule
} from './features';
import { SharedModule } from './shared.module';

@Module({
    imports: [
        SharedModule,
        FilmModule,
        TvSeriesModule,
        SettingsModule
    ]
})
export class AppModule {}
