import { Injectable } from '@nestjs/common';
import { networkInterfaces } from 'os';

@Injectable()
export class OsService {
    public readonly ip: string;

    constructor() {
        this.ip = this.getLocalIp();
    }

    private getLocalIp(): string {
        for (let newtworkInterfaces of Object.values(networkInterfaces())) {
            for (let network of newtworkInterfaces) {
                if (
                    (network.family === 'IPv4') &&
                    network.address.startsWith('192.168')
                ) {
                    return network.address;
                }
            }
        }
    }
}
