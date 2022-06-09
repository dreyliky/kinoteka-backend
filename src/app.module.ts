import { Module } from '@nestjs/common';
import {
    ClientModule,
    FilmModule,
    SettingsModule,
    TvSeriesModule
} from './features';
import { SharedModule } from './shared.module';

@Module({
    imports: [
        SharedModule,
        ClientModule,
        FilmModule,
        TvSeriesModule,
        SettingsModule
    ]
})
export class AppModule {}
