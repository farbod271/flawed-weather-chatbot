function neuron(weather) {

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

    var lon = weather.coord.lon;
    var lat = weather.coord.lat;
    var base = weather.base;
    var main_status = weatherConditions[weather.weather[0].main];
    var description = weatherDescriptions[weather.weather[0].description];
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
    "zwei": [
      {
        "intent": ["klima", "temp", "temperatur"],
        "answer": `Der Klima von ${name} ist ${temp}°C. Möchten Sie wissen, wie das Wetter momentan aussieht?`
      },
      {
        "intent": ["wetterlage", "wetter", "himmel"],
        "answer": `In ${name} herrscht momentan ${description}. Der Himmel zeigt sich von seiner ${main_status} Seite. Möchten Sie wissen, wie sich die Temperatur anfühlt?`
      },
      {
        "intent": ["temperaturempfinden", "gefuehlte temperatur", "empfinden", "gefuehl", "fuehlt sich an"],
        "answer": `Es fühlt sich in ${name} wie ${feels_like}°C an. Die tatsächliche Temperatur beträgt ${temp}°C. Ziehen Sie sich entsprechend an! Möchten Sie die Temperaturspanne für heute wissen?`
      },
      {
        "intent": ["temperaturspanne", "tiefsttemperatur", "hoechsttemperatur"],
        "answer": `Heute erwarten wir in ${name} Temperaturen zwischen ${temp_min}°C und ${temp_max}°C. Ein perfekter Tag für alle Wetterlagen! Möchten Sie die aktuelle Luftfeuchtigkeit wissen?`
      },
      {
        "intent": ["luftfeuchtigkeit", "feuchtigkeit"],
        "answer": `Die Luftfeuchtigkeit in ${name} beträgt aktuell ${humidity}%. ${humidity >= 60 ? 'Etwas schwül heute, nicht wahr?' : 'Angenehm trocken, finden Sie nicht?'} Möchten Sie die aktuellen Windverhältnisse wissen?`
      },
      {
        "intent": ["windverhaeltnisse", "wind", "boeen", "windgeschwindigkeit"],
        "answer": `Der Wind weht in ${name} mit einer Geschwindigkeit von ${wind_speed} m/s aus ${wind_deg}°. ${wind_gust ? `Böen erreichen sogar ${wind_gust} m/s. Halten Sie Ihren Hut fest!` : 'Eine sanfte Brise, genießen Sie es!'} Möchten Sie die aktuelle Sichtweite wissen?`
      },
      {
        "intent": ["sichtweite", "sicht"],
        "answer": `Die Sichtweite in ${name} beträgt ${visibility} Meter. ${visibility >= 10000 ? 'Ein kristallklarer Tag!' : 'Vielleicht nehmen Sie heute lieber eine Taschenlampe mit.'} Möchten Sie den aktuellen Luftdruck wissen?`
      },
      {
        "intent": ["luftdruck", "druck"],
        "answer": `Der Luftdruck in ${name} liegt bei ${pressure} hPa. ${pressure >= 1013 ? 'Hochdruckwetter, perfekt für Outdoor-Aktivitäten!' : 'Tiefdruck könnte Regen bringen, haben Sie einen Schirm dabei?'} Möchten Sie die geografische Lage wissen?`
      },
      {
        "intent": ["koordinaten", "position", "geografische lage"],
        "answer": `${name} befindet sich auf den Koordinaten ${lat}° nördlicher Breite und ${lon}° östlicher Länge. Eine wahrhaft einzigartige Position auf unserem wunderbaren Planeten! Möchten Sie die aktuelle Wolkenbedeckung wissen?`
      },
      {
        "intent": ["wolkenbedeckung", "wolken"],
        "answer": `Die Wolkenbedeckung in ${name} beträgt ${clouds.all}%. ${clouds.all <= 30 ? 'Ein strahlend blauer Himmel erwartet Sie!' : clouds.all >= 70 ? 'Heute versteckt sich die Sonne hinter einer dichten Wolkendecke.' : 'Malerische Wolkenformationen zieren den Himmel.'} Möchten Sie die aktuelle Zeitzone wissen?`
      },
      {
        "intent": ["zeitzone", "zeitunterschied", "uhrzeit"],
        "answer": `${name} befindet sich in der Zeitzone UTC${timezone > 0 ? '+' : ''}${timezone / 3600}. ${Math.abs(timezone) >= 7200 ? 'Vergessen Sie nicht, Ihre Uhr anzupassen!' : 'Kein großer Zeitunterschied zu bewältigen.'}`
      }
      
    ],
    "eins": [],
    "null": []
  }

return brain;

}

module.exports = neuron;