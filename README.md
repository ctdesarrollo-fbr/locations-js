# Locations-js

Lib for use more easy the json databases countries+cities+states belonging to https://github.com/dr5hn/countries-states-cities-database

## Getting started

Locations js!!!!!

How can use this lib?

![example_can_use_lib](./docs/examples/example_use_code.png)

Upgrading JSON DB

The source JSON is not tracked in this repo. Download it pinned to a specific upstream commit (to upgrade the data, replace the SHA with a newer one), then generate the fragments:

    curl -fL --create-dirs -o "jsonData/countries+states+cities.json" "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/20de077b176b00ba0fc0f298a55caa1dc6337a86/json/countries%2Bstates%2Bcities.json"

    Rscript ./utils/fragmentFile.R "jsonData/countries+states+cities.json" "src/Infrastructure/Repositories/JsonDB/JsonData/fragments" 4


## Methods

### getAllCountries

### findCountryByIsoTwoCodeWithStates

### findCountryByIsoTwoCodeWithStatesAndCities

### findStatesByIsoTwoCode

### findCitiesByIsoTwoCodeAndStatecode



## Command to make sushi roll locations

docker-compose exec r-base Rscript ./utils/fragmentFile.R "jsonData/countries+states+cities.json" "dist/Infrastructure/Repositories/JsonDB/JsonData/fragments/" 4