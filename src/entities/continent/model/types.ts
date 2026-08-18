export interface Continent {
    id: number;
    code: string;
    name: string;
}

export interface ContinentDetail extends Continent {
    translations: Record<string, string>;
}
