import City from "./City"

export default class State {

    constructor(
        public id: number,
        public name: string,
        public iso2: string,
        public iso3166_2: string|null = null,
        public Cities?: City[],
    ) {
        this.id = id
        this.name = name
    }

}