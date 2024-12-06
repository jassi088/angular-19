export interface ILocalStore {
    get(key: string): object;
    remove(key: string): object;
    set(key: string, value: object): void;
    flush(): void;
}
