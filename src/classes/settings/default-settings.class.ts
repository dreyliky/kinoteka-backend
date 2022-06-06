import { Settings } from '@interfaces/settings';

export class DefaultSettings implements Settings {
    public readonly downloadsPath = 'C:/_kinoteka_downloads';
    public readonly dbPath = 'C:/_kinoteka_db';
}
