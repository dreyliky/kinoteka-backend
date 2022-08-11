import { networkInterfaces } from 'os';

export abstract class AppHelper {
    public static readonly protocol = 'http';

    public static get ip(): string {
        if (!this._ip) {
            this._ip = this.getLocalIp();
        }

        return this._ip;
    }

    public static get host(): string {
        return `${this.protocol}://${this.ip}:${global.__appPort}`
    }

    private static _ip: string;

    private static getLocalIp(): string {
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
