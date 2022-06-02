import { BaseState } from '@core';
import { Injectable } from '@nestjs/common';

/** Array of kinopoiskId of films which are currently downloading */
@Injectable()
export class DownloadingFilmsState extends BaseState<string[]> {
    constructor() {
        super([]);
    }

    public add(kinopoiskId: string): void {
        if (!this.data.includes(kinopoiskId)) {
            this.set([...this.data, kinopoiskId]);
        }
    }

    public remove(kinopoiskId: string): void {
        this.set(
            this.data.filter((id) => (id !== kinopoiskId))
        )
    }

    public includes(kinopoiskId: string): boolean {
        return this.data.includes(kinopoiskId);
    }
}
