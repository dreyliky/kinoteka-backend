import { Module } from '@nestjs/common';
import { FilmModule } from './features';
import { SharedModule } from './shared.module';

@Module({
    imports: [
        SharedModule,
        FilmModule
    ]
})
export class AppModule {}
