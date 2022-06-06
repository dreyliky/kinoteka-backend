import { Injectable } from '@nestjs/common';
import { networkInterfaces } from 'os';

@Injectable()
export class OsService {
    public readonly ip = networkInterfaces()['Ethernet'][0].address;
}
