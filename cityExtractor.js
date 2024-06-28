async function extractCity(input) {
    const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney']; // Add more cities as needed
    for (let city of cities) {
      if (input.includes(city.toLowerCase())) {
        return city;
      }
       else {
         continue;
        }
        
      }
      return null;
    }

module.exports = extractCity;