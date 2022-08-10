
export abstract class AppHelper {
    public static get url(): string {
        return AppHelper._url;
    }

    private static _url: string;

    public static setUrl(url: string): void {
        if (AppHelper._url) {
            throw new Error(`Can't set app URL twice!`);
        }

        AppHelper._url = url;
    }
}
