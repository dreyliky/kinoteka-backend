import { ParsedUrlQuery } from 'querystring';

export interface SocketDto extends ParsedUrlQuery {
    readonly deviceInfo: string;
}
