const fs = require('fs')
async function go(nachricht, unparsed_nachricht) {
  var extractCity = require('./cityExtractor.js')
  var fetchWeather = require('./weather.js')
  var weather = null;



var city = await extractCity(unparsed_nachricht);
    if (city == null) {

      
      try {
        const data = fs.readFileSync('history.json', 'utf8');
        var weather = JSON.parse(data);
        console.log(weather);
      } catch (err) {
        console.error(err);
      }
      

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


var brain = {
  "answers": [
    {
      "intent": ["cola",],
      "answer": "Ich habe Cola notiert. Sie kostet 1€, möchten Sie noch ein Getränk bestellen"
    },
    {
      "intent": ["klima", "temp", "temperatur"],
      "answer": `Der Klima von ${name} ist ${temp}°C`
    },
    {
      "intent": ["wetterlage", "wetter", "himmel"],
      "answer": `In ${name} herrscht momentan ${description}. Der Himmel zeigt sich von seiner ${status.toLowerCase()} Seite.`
    },
    {
      "intent": ["temperaturempfinden", "gefuehlte temperatur", "empfinden", "gefuehl", "fuehlt sich an"],
      "answer": `Es fühlt sich in ${name} wie ${feels_like}°C an. Die tatsächliche Temperatur beträgt ${temp}°C. Ziehen Sie sich entsprechend an!`
    },
    {
      "intent": ["temperaturspanne", "tiefsttemperatur", "hoechsttemperatur"],
      "answer": `Heute erwarten wir in ${name} Temperaturen zwischen ${temp_min}°C und ${temp_max}°C. Ein perfekter Tag für alle Wetterlagen!`
    },
    {
      "intent": ["luftfeuchtigkeit", "feuchtigkeit"],
      "answer": `Die Luftfeuchtigkeit in ${name} beträgt aktuell ${humidity}%. ${humidity > 60 ? 'Etwas schwül heute, nicht wahr?' : 'Angenehm trocken, finden Sie nicht?'}`
    },
    {
      "intent": ["windverhaeltnisse", "wind", "boeen", "windgeschwindigkeit"],
      "answer": `Der Wind weht in ${name} mit einer Geschwindigkeit von ${wind_speed} m/s aus ${wind_deg}°. ${wind_gust ? `Böen erreichen sogar ${wind_gust} m/s. Halten Sie Ihren Hut fest!` : 'Eine sanfte Brise, genießen Sie es!'}`
    },
    {
      "intent": ["sichtweite", "sicht"],
      "answer": `Die Sichtweite in ${name} beträgt ${visibility} Meter. ${visibility > 10000 ? 'Ein kristallklarer Tag!' : 'Vielleicht nehmen Sie heute lieber eine Taschenlampe mit.'}`
    },
    {
      "intent": ["luftdruck", "druck"],
      "answer": `Der Luftdruck in ${name} liegt bei ${pressure} hPa. ${pressure > 1013 ? 'Hochdruckwetter, perfekt für Outdoor-Aktivitäten!' : 'Tiefdruck könnte Regen bringen, haben Sie einen Schirm dabei?'}`
    },
    {
      "intent": ["koordinaten", "position", "geografische lage"],
      "answer": `${name} befindet sich auf den Koordinaten ${lat}° nördlicher Breite und ${lon}° östlicher Länge. Eine wahrhaft einzigartige Position auf unserem wunderbaren Planeten!`
    },
    {
      "intent": ["wolkenbedeckung", "wolken"],
      "answer": `Die Wolkenbedeckung in ${name} beträgt ${clouds.all}%. ${clouds.all < 30 ? 'Ein strahlend blauer Himmel erwartet Sie!' : clouds.all > 70 ? 'Heute versteckt sich die Sonne hinter einer dichten Wolkendecke.' : 'Malerische Wolkenformationen zieren den Himmel.'}`
    },
    {
      "intent": ["zeitzone", "zeitunterschied", "uhrzeit"],
      "answer": `${name} befindet sich in der Zeitzone UTC${timezone > 0 ? '+' : ''}${timezone / 3600}. ${Math.abs(timezone) > 7200 ? 'Vergessen Sie nicht, Ihre Uhr anzupassen!' : 'Kein großer Zeitunterschied zu bewältigen.'}`
    }
  ]
}




for (var answer of brain.answers) {
  for (var inter of answer.intent) {
    if (nachricht.includes(inter)) {
      inhalt = answer.answer;
      return inhalt;
    }
  }
  
 }
return "Ich habe dich nicht verstanden. Bitte formuliere deine Frage um."

}

module.exports = go;

