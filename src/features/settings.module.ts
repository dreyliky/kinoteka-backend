import { Module } from '@nestjs/common';
import { SettingsService } from '@services/settings';
import { SharedModule } from '../shared.module';

@Module({
    imports: [
        SharedModule
    ],
    providers: [
        SettingsService
    ],
    exports: [
        SettingsService
    ]
})
export class SettingsModule {}
