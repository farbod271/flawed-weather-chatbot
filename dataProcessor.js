const fs = require('fs').promises;
const extractCity = require('./cityExtractor');
var fetchWeather = require('./weather');
const filePath = './history.json'; 


async function dataProcessor (nachricht, unparsed_nachricht, user) {
    
result = {
    status: "",
    weather: {}
}


var city = await extractCity(unparsed_nachricht);






// Read the JSON file
    const data = await fs.readFile(filePath, 'utf8')

    
    // Parse the JSON data
    var jsonData = JSON.parse(data);
    // console.log(jsonData)

    // Loop through the keys and examine the `user` property
    let i = 1;
    for (let key in jsonData) {
        // console.log(key)
        if (jsonData.hasOwnProperty(key)) {
            // console.log(jsonData[key].user, user)
            length = Object.keys(jsonData).length;
            // console.log('User:', jsonData[key].user);
            if (jsonData[key].user === user) {
                //if city call weather api and save the weather in the json file 2
                // console.log('User found:', jsonData[key].user)
                if (city) {
                    weather = await fetchWeather(city);
                    jsonData[key].weather = weather;              
                    result.status = 2;
                    result.weather = weather;
                    jsonData[key].hardfallback = 0;

                    // console.log("shoulds")

                    break;
              }
                //if city == null and there is a city in the json file status code 2
                else if (jsonData[key].weather.name !== undefined) {
                    // console.log(jsonData[key].weather.name == undefined)
                    result.status = 2;
                    result.weather = jsonData[key].weather;
                    // console.log("should1")

                    break;
                }
                //if city == null and there is no city in the json file status code 1 user is fucking around
                else if (jsonData[key].weather.name === undefined) {
                    result.status = 1
                   break;

                }

            }
            //if user not found create a new entry for the user this is status code 0 is the greeting mesasge
            //if user not found and city status code 2
            if (city && jsonData[key].user !== user && i == length ) {
                weather = await fetchWeather(city);
                let newkey = `entry-${length+1}`;
                console.log(newkey, user, jsonData[newkey])
                // jsonData[newkey].user = user  
                // jsonData[newkey].weather = weather;    
                jsonData[newkey] = {
                    user: user,
                    last: 0,
                    weather: weather,
                    hardfallback: 0
                };
                result.status = 2;
                result.weather = weather;
                console.log("this is")
                break;
            }
            else if (!city && jsonData[key].user !== user && i == length ) {
                result.status = 0;
                let newkey = `entry-${length+1}`;
                jsonData[newkey] = {
                    user: user,
                    last: 0,
                    weather: {},
                    hardfallback: 0

                }; 
                break;
            }

            i++;


        }
    }


                // Stringify the modified data
                const updatedJsonData = JSON.stringify(jsonData, null, 2);
        
                // Write back to the JSON file
                fs.writeFile(filePath, updatedJsonData, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing the file:', err);
                        return;
                    }
                    console.log('File successfully updated!');
    
                });
    
                
                console.log(result.status);
                return result;

}

// dataProcessor("wetter", "tehran", "hose");

module.exports = dataProcessor;