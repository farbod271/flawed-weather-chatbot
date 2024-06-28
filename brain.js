const fetchWeather = require('./weather.js')
const extractCity = require('./cityExtractor.js')
const t = require('./history.json')
const fs = require('fs')
async function go(nachricht) {



var city = await extractCity(nachricht);
    if (city == null) {
      var weather = t
      // console.log(weather)
      
    }
    //else weather is the last weather entry saved in a json file called history.json
    else {
      weather = await fetchWeather(city);
      fs.writeFileSync('history.json', JSON.stringify(weather, null, 2))

}



var lon = weather.coord.lon;
var lat = weather.coord.lat;
var base = weather.base;
var status = weather.weather[0].main;
var description = weather.weather[0].description;
var icon = weather.weather[0].icon
var main = weather.main;
var temp = weather.main.temp;
var feels_like = weather.main.feels_like 
var temp_min = weather.main.temp_min
var temp_max = weather.main.temp_max
var pressure = weather.main.pressure
var humidity = weather.main.humidity
var sea_level = weather.main.sea_level
var grnd_level = weather.main.grnd_level
var visibility = weather.visibility;
var wind = weather.wind;
var clouds = weather.clouds;
var sys = weather.sys;
var timezone = weather.timezone;
var id = weather.id;
var name = weather.name;
var wind_speed = wind.speed;
var wind_deg = wind.deg;
var wind_gust = wind.gust;

// var brain = {
//   "answers" :[
//     {"intent":"cola", "answer":"Ich habe Cola notiert. Sie kostet 1€, möchten Sie noch ein Getränk bestellen"},
//     {"intent":"klima", "answer":`Der Klima von ${city} ist ${temp}°C`},

//   ]

// }


var brain = {
  "answers": [
    {
      "intent": ["cola",],
      "answer": "Ich habe Cola notiert. Sie kostet 1€, möchten Sie noch ein Getränk bestellen"
    },
    {
      "intent": ["klima", "temp", "temperatur"],
      "answer": `Der Klima von ${city} ist ${temp}°C`
    },
    {
      "intent": ["wetterlage", "wetter", "himmel"],
      "answer": `In ${city} herrscht momentan ${description}. Der Himmel zeigt sich von seiner ${status.toLowerCase()} Seite.`
    },
    {
      "intent": ["temperaturempfinden", "gefuehlte temperatur", "empfinden", "gefuehl", "fuehlt sich an"],
      "answer": `Es fühlt sich in ${city} wie ${feels_like}°C an. Die tatsächliche Temperatur beträgt ${temp}°C. Ziehen Sie sich entsprechend an!`
    },
    {
      "intent": ["temperaturspanne", "tiefsttemperatur", "hoechsttemperatur"],
      "answer": `Heute erwarten wir in ${city} Temperaturen zwischen ${temp_min}°C und ${temp_max}°C. Ein perfekter Tag für alle Wetterlagen!`
    },
    {
      "intent": ["luftfeuchtigkeit", "feuchtigkeit"],
      "answer": `Die Luftfeuchtigkeit in ${city} beträgt aktuell ${humidity}%. ${humidity > 60 ? 'Etwas schwül heute, nicht wahr?' : 'Angenehm trocken, finden Sie nicht?'}`
    },
    {
      "intent": ["windverhaeltnisse", "wind", "boeen", "windgeschwindigkeit"],
      "answer": `Der Wind weht in ${city} mit einer Geschwindigkeit von ${wind_speed} m/s aus ${wind_deg}°. ${wind_gust ? `Böen erreichen sogar ${wind_gust} m/s. Halten Sie Ihren Hut fest!` : 'Eine sanfte Brise, genießen Sie es!'}`
    },
    {
      "intent": ["sichtweite", "sicht"],
      "answer": `Die Sichtweite in ${city} beträgt ${visibility} Meter. ${visibility > 10000 ? 'Ein kristallklarer Tag!' : 'Vielleicht nehmen Sie heute lieber eine Taschenlampe mit.'}`
    },
    {
      "intent": ["luftdruck", "druck"],
      "answer": `Der Luftdruck in ${city} liegt bei ${pressure} hPa. ${pressure > 1013 ? 'Hochdruckwetter, perfekt für Outdoor-Aktivitäten!' : 'Tiefdruck könnte Regen bringen, haben Sie einen Schirm dabei?'}`
    },
    {
      "intent": ["koordinaten", "position", "geografische lage"],
      "answer": `${city} befindet sich auf den Koordinaten ${lat}° nördlicher Breite und ${lon}° östlicher Länge. Eine wahrhaft einzigartige Position auf unserem wunderbaren Planeten!`
    },
    {
      "intent": ["wolkenbedeckung", "wolken"],
      "answer": `Die Wolkenbedeckung in ${city} beträgt ${clouds.all}%. ${clouds.all < 30 ? 'Ein strahlend blauer Himmel erwartet Sie!' : clouds.all > 70 ? 'Heute versteckt sich die Sonne hinter einer dichten Wolkendecke.' : 'Malerische Wolkenformationen zieren den Himmel.'}`
    },
    {
      "intent": ["zeitzone", "zeitunterschied", "uhrzeit"],
      "answer": `${city} befindet sich in der Zeitzone UTC${timezone > 0 ? '+' : ''}${timezone / 3600}. ${Math.abs(timezone) > 7200 ? 'Vergessen Sie nicht, Ihre Uhr anzupassen!' : 'Kein großer Zeitunterschied zu bewältigen.'}`
    }
  ]
}



console.log(nachricht)

for (var answer of brain.answers) {
  console.log('j is' + answer.intent)
  for (var inter of answer.intent) {
    console.log('i is' + inter)
    if (nachricht.includes(inter)) {
      inhalt = answer.answer;
      return inhalt;
    }
  }
  
 }
return "Ich habe dich nicht verstanden. Bitte formuliere deine Frage um."

}

module.exports = go;
