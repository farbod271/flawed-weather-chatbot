const fs = require('fs').promises;
const dataProcessor = require('./dataProcessor.js');
const neuron = require('./neuron.js');
const filePath = 'history.json'; 







async function go(nachricht, unparsed_nachricht, user) {

result = await dataProcessor(nachricht, unparsed_nachricht, user)
console.log(result)

const weatherDescriptions = {
  "thunderstorm with light rain": "Gewitter mit leichtem Regen",
  "thunderstorm with rain": "Gewitter mit Regen",
  "thunderstorm with heavy rain": "Gewitter mit starkem Regen",
  "light thunderstorm": "leichtes Gewitter",
  "thunderstorm": "Gewitter",
  "heavy thunderstorm": "starkes Gewitter",
  "ragged thunderstorm": "unregelmäßiges Gewitter",
  "thunderstorm with light drizzle": "Gewitter mit leichtem Nieselregen",
  "thunderstorm with drizzle": "Gewitter mit Nieselregen",
  "thunderstorm with heavy drizzle": "Gewitter mit starkem Nieselregen",
  "light intensity drizzle": "Nieselregen mit leichter Intensität",
  "drizzle": "Nieselregen",
  "heavy intensity drizzle": "Nieselregen mit starker Intensität",
  "light intensity drizzle rain": "leichter Nieselregen und Regen",
  "drizzle rain": "Nieselregen und Regen",
  "heavy intensity drizzle rain": "starker Nieselregen und Regen",
  "shower rain and drizzle": "Regenschauer und Nieselregen",
  "heavy shower rain and drizzle": "starker Regenschauer und Nieselregen",
  "shower drizzle": "Nieselschauer",
  "light rain": "leichter Regen",
  "moderate rain": "mäßiger Regen",
  "heavy intensity rain": "starker Regen",
  "very heavy rain": "sehr starker Regen",
  "extreme rain": "extremer Regen",
  "freezing rain": "gefrierender Regen",
  "light intensity shower rain": "leichter Regenschauer",
  "shower rain": "Regenschauer",
  "heavy intensity shower rain": "starker Regenschauer",
  "ragged shower rain": "unregelmäßiger Regenschauer",
  "light snow": "leichter Schnee",
  "snow": "Schnee",
  "heavy snow": "starker Schnee",
  "sleet": "Schneeregen",
  "light shower sleet": "leichter Schneeregenschauer",
  "shower sleet": "Schneeregenschauer",
  "light rain and snow": "leichter Regen und Schnee",
  "rain and snow": "Regen und Schnee",
  "light shower snow": "leichter Schneeschauer",
  "shower snow": "Schneeschauer",
  "heavy shower snow": "starker Schneeschauer",
  "mist": "Nebel",
  "smoke": "Rauch",
  "haze": "Dunst",
  "sand/dust whirls": "Sand-/Staubwirbel",
  "fog": "Nebel",
  "sand": "Sand",
  "dust": "Staub",
  "volcanic ash": "Vulkanasche",
  "squalls": "Böen",
  "tornado": "Tornado",
  "clear sky": "klarer Himmel",
  "few clouds": "wenige Wolken",
  "scattered clouds": "vereinzelte Wolken",
  "broken clouds": "aufgelockerte Bewölkung",
  "overcast clouds": "bedeckte Wolken"
};

const weatherConditions = {
  "Thunderstorm": "gewittrigen",
  "Drizzle": "nieselnden",
  "Rain": "regnerischen",
  "Snow": "verschneiten",
  "Mist": "nebligen",
  "Smoke": "rauchigen",
  "Haze": "dunstigen",
  "Dust": "staubigen",
  "Fog": "nebligen",
  "Sand": "sandigen",
  "Ash": "aschebedeckten",
  "Squall": "böigen",
  "Tornado": "tornadischen",
  "Clear": "klaren",
  "Clouds": "wolkigen"
};



if (result.status == 2) {
weather = result.weather;
  var brain = neuron(weather)
  var description = weatherDescriptions[weather.weather[0].description];
  var name = weather.name;

}


if (result.status == 1) {
  return `bitte geben sie eine Stadt ein`
}


if (result.status == 0) {
  return `hallo ich bin ein wetter bot. Bitte geben sie eine Stadt und was sie wissen mochten ein`
}




const data = await fs.readFile(filePath, 'utf8')
var jsonData = JSON.parse(data);

var savedi = 0;
var savedj;
  //this is status code 2
if (result.status === 2) {
  for (var answer of brain.zwei) {
    savedi++;
    console.log('savedi is ' + savedi)
    for (var inter of answer.intent) {
      if (nachricht.includes(inter)) {
        inhalt = answer.answer;
        for (let key in jsonData) {
          if (jsonData.hasOwnProperty(key)) {
            // console.log(jsonData[key].user === user && !jsonData[key].last)
              if (jsonData[key].user === user) {
              jsonData[key].last = savedi;
              console.log('last is ' + jsonData[key].last);
              const updatedJsonData = JSON.stringify(jsonData, null, 2);
              fs.writeFile(filePath, updatedJsonData, 'utf8')
              }
          }
        }
        return inhalt;
      }
    }
    if (nachricht.includes('ja')){
      for (let key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            if (jsonData[key].user === user && jsonData[key].last !== 0) {
              temp = jsonData[key].last;
            jsonData[key].last++;
            console.log('last is ' + jsonData[key].last);
            const updatedJsonData = JSON.stringify(jsonData, null, 2);
            fs.writeFile(filePath, updatedJsonData, 'utf8')
            return brain.zwei[temp].answer;
            }
        }
      }
    }
    else if (nachricht.includes('nein')){
      return `Was möchten Sie stattdessen wissen?ich kann dir mehr informationen uber sicht oder wind oder luftdruck oder koordinaten oder wolkenbedeckung oder zeitzone oder klima oder wetterlage oder temperaturempfinden oder temperaturspanne oder luftfeuchtigkeit oder windverhaeltnisse oder sichtweite oder luftdruck`;
    }
  }
  for (let key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
        if (jsonData[key].user === user && jsonData[key].hardfallback === 0) {
        jsonData[key].hardfallback = 1;
        
        const updatedJsonData = JSON.stringify(jsonData, null, 2);
        fs.writeFile(filePath, updatedJsonData, 'utf8')
        console.log('hardfallback is ' + jsonData[key].hardfallback)
        return `Ich habe nicht verstanden was du uber ${name} gefragt hast aber In ${name} herrscht momentan ${description}. ich kann auch mehr informationen geben wenn du willst. schreib einfach sicht oder wind oder luftdruck oder koordinaten oder wolkenbedeckung oder zeitzone oder klima oder wetterlage oder temperaturempfinden oder temperaturspanne oder luftfeuchtigkeit oder windverhaeltnisse oder sichtweite oder luftdruck`
        }
        // jsonData[key].hardfallback = false;
        else if (jsonData[key].user === user && jsonData[key].hardfallback === 1) {
        jsonData[key].weather = {};
        const updatedJsonData = JSON.stringify(jsonData, null, 2);
        fs.writeFile(filePath, updatedJsonData, 'utf8')
        console.log('hardfallback isssss' + jsonData[key].hardfallback)
        return `wiso fangen wir nicht von vorne an? bitte geben sie eine Stadt ein`
      }
    }
    }
}



//this is status code 0


}

module.exports = go;

