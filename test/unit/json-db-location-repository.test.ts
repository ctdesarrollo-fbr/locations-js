import JsonDBLocationRepository from "../../src/Infrastructure/Repositories/JsonDB/JsonDBLocationRepository";
import {Country, City, ExceptionsDomain} from "../../src/Domain";

describe('Json DB repository test', () => {

    const _JsonDbRepository :JsonDBLocationRepository = new JsonDBLocationRepository;

    /**
     * get all countries method
     */

    it('get all countries', () => {

        let countries = _JsonDbRepository.getAllCountries()

        expect(countries).not.toBeNull();

        //valid the first got that has translations
        expect(countries[0].translations).not.toBeNull();

    });

    /**
     * scenarios METHOD findCountriesByIsoTwoCode
     */

    it('get countries by iso code 2 happy path', () => {

        //with many countries
        let countries = _JsonDbRepository.findCountriesByIsoTwoCode(['EC','VE'])

        expect(countries.length).toBe(2);

    });

    it('get_countries_by_non_existent_iso_code_2', () => {

       //with many countries
        let countries = _JsonDbRepository.findCountriesByIsoTwoCode(['345'], true)

        expect(countries.length).toBe(0);

    });

    it('get countries by iso code 2 with states', () => {

       //with many countries have states
        let countries = _JsonDbRepository.findCountriesByIsoTwoCode(['EC','VE'], true)

        expect(countries.length).toBe(2);
        expect(countries[0].States).not.toBeNull();

    });

    it('get countries by iso code 2 with states and cities', () => {

        //with many countries have states
        let countries = _JsonDbRepository.findCountriesByIsoTwoCode(['EC','VE'], true, true)

        expect(countries.length).toBe(2);
        expect(countries[0].States[0].Cities).not.toBeNull();
        expect(countries[0].States[0].Cities).not.toBeUndefined();

    });

    /**
     * scenarios METHOD findCountryByIsoTwoCodeOrFail
     */

    it('get_country_by_iso_code_2_or_fail_happy_path', () => {

        //with one country
        let CountryObject = _JsonDbRepository.findCountryByIsoTwoCodeOrFail('VE')

        expect(CountryObject).toBeInstanceOf(Country);

    });

    it('get_country_by_iso_code_2_or_fail_when_expected_exception', () => {

        expect(() => _JsonDbRepository.findCountryByIsoTwoCodeOrFail('NOT_FOUND')).toThrow(Error);
    });

    it('get_country_by_iso_code_2_or_fail_when_have_states', () => {

        let CountryObject = _JsonDbRepository.findCountryByIsoTwoCodeOrFail('VE', true)

        expect(CountryObject.States).not.toBeNull();
    });

    it('get_country_by_iso_code_2_or_fail_when_have_states_and_cities', () => {

        let CountryObject = _JsonDbRepository.findCountryByIsoTwoCodeOrFail('VE', true, true)

        expect(CountryObject.States[0].Cities).not.toBeUndefined();
        expect(CountryObject.States[0].Cities).not.toBeNull();
    });

    /**
     * scenarios METHOD findStatesByCountryIsoTwoCode
     */

    it('get_state_by_iso_code_2_or_fail_happy_path_without_cities', () => {

        //with one country
        let States = _JsonDbRepository.findStatesByCountryIsoTwoCode('VE')

        expect(States).not.toBeUndefined();
        expect(States).not.toBeNull();
        expect(States[0].Cities).toBeUndefined();

    });

    it('get_state_by_iso_code_2_or_fail_happy_path_with_cities', () => {

        //with one country
        let States = _JsonDbRepository.findStatesByCountryIsoTwoCode('VE', true)

        expect(States).not.toBeUndefined();
        expect(States).not.toBeNull();
        expect(States[0].Cities).not.toBeUndefined();

    });

    /*
     * This scenario occurs by using the findCountryByIsoTwoCodeOrFail method
     * is validated to take the scenario into consideration
     */
    it('get_states_by_iso_code_2_or_fail_when_expected_exception', () => {

        expect(() => _JsonDbRepository.findStatesByCountryIsoTwoCode('NOT_FOUND')).toThrow(Error);
    });

    /**
     * scenarios METHOD findCitiesByCountryIsoTwoCodeAndStateCode
     */

    it('get_cities_by_iso_code_2_and_state_code_happy_path', () => {

        //with one country
        let Cities = _JsonDbRepository.findCitiesByCountryIsoTwoCodeAndStateCode('VE','A')

        expect(Cities).not.toBeUndefined();
        expect(Cities).not.toBeNull();
        expect(Cities[0]).toBeInstanceOf(City)

    });

    it('get_cities_by_iso_code_2_and_state_code_when_state_code_not_exist', () => {

        expect(() => _JsonDbRepository.findCitiesByCountryIsoTwoCodeAndStateCode('VE','NOT_FOUND')).toThrow(ExceptionsDomain.StateNotFound);
    });

    it('get_cities_by_iso_code_2_and_state_code_when_state_dont_have_cities', () => {

        //with one country
        let Cities = _JsonDbRepository.findCitiesByCountryIsoTwoCodeAndStateCode('BB','03')

        expect(Cities).toHaveLength(0);

    });

    /**
     * scenarios source schema mapping
     */

    it('should_map_state_iso2_and_iso3166_2', () => {

        let State = _JsonDbRepository.findStatesByCountryIsoTwoCode('VE').filter((state) => state.iso2 == 'A')[0]

        expect(State.name).toBe('Distrito Capital');
        expect(State.iso3166_2).toBe('VE-A');

    });

    it('should_map_state_iso3166_2_as_null_when_source_does_not_have_it', () => {

        let State = _JsonDbRepository.findStatesByCountryIsoTwoCode('ET').filter((state) => state.iso2 == '55')[0]

        expect(State.name).toBe('Central Ethiopia');
        expect(State.iso3166_2).toBeNull();

    });

    it('should_map_country_phone_code', () => {

        const country = _JsonDbRepository.findCountryByIsoTwoCodeOrFail('EC');

        expect(country.phoneCode).toBe('593');

    });

    it('should_contain_country_flag', () => {
            
        const country = _JsonDbRepository.findCountryByIsoTwoCodeOrFail('EC');

        console.log(country);

        expect(country.flagEmoji).not.toBeUndefined();
        expect(country.flagEmojiUnicode).not.toBeNull();
    });

});