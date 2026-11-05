"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class State {
    constructor(id, name, iso2, iso3166_2 = null, Cities) {
        this.id = id;
        this.name = name;
        this.iso2 = iso2;
        this.iso3166_2 = iso3166_2;
        this.Cities = Cities;
        this.id = id;
        this.name = name;
    }
}
exports.default = State;
