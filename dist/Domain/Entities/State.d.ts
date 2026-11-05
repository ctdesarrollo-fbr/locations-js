import City from "./City";
export default class State {
    id: number;
    name: string;
    iso2: string;
    iso3166_2: string | null;
    Cities?: City[];
    constructor(id: number, name: string, iso2: string, iso3166_2?: string | null, Cities?: City[]);
}
