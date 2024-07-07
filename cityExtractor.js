async function extractCity(input) {
  const cities = [
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney',
    'Los Angeles', 'Chicago', 'Houston', 'Toronto', 'Mexico City',
    'Rio de Janeiro', 'São Paulo', 'Buenos Aires', 'Bogota',
    'Madrid', 'Barcelona', 'Rome', 'Milan', 'Amsterdam',
    'Brussels', 'Vienna', 'Prague', 'Warsaw', 'Budapest',
    'Copenhagen', 'Stockholm', 'Oslo', 'Helsinki', 'Moscow',
    'St. Petersburg', 'Kiev', 'Istanbul', 'Athens', 'Cairo',
    'Dubai', 'Abu Dhabi', 'Riyadh', 'Tel Aviv', 'Jerusalem',
    'Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai',
    'Karachi', 'Lahore', 'Dhaka', 'Bangkok', 'Singapore',
    'Kuala Lumpur', 'Jakarta', 'Manila', 'Ho Chi Minh City', 'Hanoi',
    'Seoul', 'Busan', 'Osaka', 'Kyoto', 'Shanghai',
    'Beijing', 'Guangzhou', 'Shenzhen', 'Hong Kong', 'Taipei',
    'Melbourne', 'Brisbane', 'Perth', 'Auckland', 'Wellington',
    'Vancouver', 'Montreal', 'Ottawa', 'Calgary', 'Edmonton',
    'San Francisco', 'Seattle', 'Boston', 'Washington D.C.', 'Miami',
    'Atlanta', 'Dallas', 'Phoenix', 'Las Vegas', 'Denver',
    'Cape Town', 'Johannesburg', 'Nairobi', 'Lagos', 'Accra',
    'Casablanca', 'Tunis', 'Algiers', 'Addis Ababa', 'Dakar',
    'Lisbon', 'Porto', 'Dublin', 'Edinburgh', 'Glasgow',
    'Reykjavik', 'Zurich', 'Geneva', 'Bern', 'Bucharest',
    'Sofia', 'Belgrade', 'Zagreb', 'Ljubljana', 'Bratislava',
    'Warsaw', 'Budapest', 'Prague', 'Vienna', 'Copenhagen',
    'Stockholm', 'Oslo', 'Helsinki', 'Tallinn', 'Riga',
    'Vilnius', 'Kiev', 'Minsk', 'Moscow', 'St. Petersburg',
    'Istanbul', 'Ankara', 'Athens', 'Thessaloniki', 'Nicosia',
    'Jerusalem', 'Tel Aviv', 'Riyadh', 'Jeddah', 'Abu Dhabi',
    'Dubai', 'Doha', 'Kuwait City', 'Manama', 'Muscat',
    'Karachi', 'Lahore', 'Islamabad', 'Mumbai', 'Delhi',
    'Bangalore', 'Chennai', 'Kolkata', 'Dhaka', 'Colombo',
    'Yangon', 'Bangkok', 'Hanoi', 'Ho Chi Minh City', 'Manila',
    'Jakarta', 'Kuala Lumpur', 'Singapore', 'Hong Kong', 'Taipei', 'tehran',
    'Baghdad', 'Riyadh', 'Kuwait City', 'Doha', 'Abu Dhabi',
    'deggendorf', 'Passau', 'Regensburg', 'Landshut', 'Straubing',
    'Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt',
    'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig',
    'Bremen', 'Dresden', 'Hanover', 'Nuremberg', 'Duisburg', 'münchen'
]; // Add more cities as needed
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