import { Injectable } from '@nestjs/common';
import { LocalStorage } from 'node-localstorage';

@Injectable()
export class SettingsRepository {
    private readonly localStorage = new LocalStorage(`${global.__dbFolder}`);

    constructor() {}
}
