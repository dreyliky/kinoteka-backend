import { CastTypeEnum } from '@enums/core';
import { ClientDeviceInfo } from '../client';

export interface CastDto<T = unknown> {
    readonly type: CastTypeEnum;
    readonly data: T;
    readonly initiatorDeviceInfo: ClientDeviceInfo;
}
