import { networkInterfaces } from 'os';

export abstract class AppHelper {
    public static readonly protocol = 'http';
    public static ip: string;

    public static get host(): string {
        return `${this.protocol}://${this.ip}:${global.__appPort}`
    }

    constructor() {
        AppHelper.ip = this.getLocalIp();
    }

    private getLocalIp(): string {
        for (let newtworkInterfaces of Object.values(networkInterfaces())) {
            for (let network of newtworkInterfaces) {
                if (
                    (network.family === 'IPv4') &&
                    network.address.startsWith('192.168.1.')
                ) {
                    return network.address;
                }
            }
        }
    }
}
