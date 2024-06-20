import allCountries from "constants/countriesWithCode.json"

function getCountryCodeByName(countryName:string): string | undefined {
 const matchingCountry = allCountries.find(country => country.name.toLowerCase() === countryName.toLowerCase() )
 return matchingCountry?.code
}

export default getCountryCodeByName