import { ClientDeviceInfo } from './client-device-info.interface';

export interface Client {
    readonly socketId: string;
    readonly deviceInfo: ClientDeviceInfo;
}
