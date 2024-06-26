'use strict'

const { json } = require('express');
const temp = require('./brain.json')
const brain = JSON.parse(JSON.stringify(temp))
const fetchWeather = require('./weather.js')

async function extractCity(input) {
  const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney']; // Add more cities as needed
  for (let city of cities) {
    if (input.toLowerCase().includes(city.toLowerCase())) {
      return city;
     }
     else {
       continue;
     }

}
  return null;
}



var WebSocketClient = require('websocket').client

/**
 * bot ist ein einfacher Websocket Chat Client
 */

class bot {

  /**
   * Konstruktor baut den client auf. Er erstellt einen Websocket und verbindet sich zum Server
   * Bitte beachten Sie, dass die Server IP hardcodiert ist. Sie müssen sie umsetzten
   */
  constructor () {
    
    // this.dict = []
    // this.dict['suche'] = 'Wenn sie etwas suchen sind Sie hier falsch es geht um Drogen'
    // this.dict['rauche'] = 'Rauchen ist eine schreckliche Sache.'
    // this.dict['trinke'] = 'Trinken kann man auch Wasser.'
    // this.dict['schlafen'] = 'Schlafen wirkt wie eine Droge ist aber gesund.'
    // this.dict['saufe'] = 'Wasser saufen ist gesund.'
    // this.sender="";
    this.sender="";

  

    /** Die Websocketverbindung
      */
    this.client = new WebSocketClient()
    /**
     * Wenn der Websocket verbunden ist, dann setzten wir ihn auf true
     */
    this.connected = false

    /**
     * Wenn die Verbindung nicht zustande kommt, dann läuft der Aufruf hier hinein
     */
    this.client.on('connectFailed', function (error) {
      console.log('Connect Error: ' + error.toString())
    })

    /** 
     * Wenn der Client sich mit dem Server verbindet sind wir hier 
    */
    this.client.on('connect', function (connection) {
      this.con = connection
      // console.log('WebSocket Client Connected')
      connection.on('error', function (error) {
        console.log('Connection Error: ' + error.toString())
      })

      /** 
       * Es kann immer sein, dass sich der Client disconnected 
       * (typischer Weise, wenn der Server nicht mehr da ist)
      */
      connection.on('close', function () {
        console.log('echo-protocol Connection Closed')
      })

      /** 
       *    Hier ist der Kern, wenn immmer eine Nachricht empfangen wird, kommt hier die 
       *    Nachricht an. 
      */
      connection.on('message', function (message) {
        if (message.type === 'utf8') {
          var data = JSON.parse(message.utf8Data)
          // console.log('Received: ' + data.msg + ' ' + data.name)
        }
      })

      /** 
       * Hier senden wir unsere Kennung damit der Server uns erkennt.
       * Wir formatieren die Kennung als JSON
      */
      function joinGesp () {
        if (connection.connected) {
          connection.sendUTF('{"type": "join", "name":"MegaBot"}')
          var inhalt= "Lass uns über Blödsinn sprechen? Was machst du falsch?"
          var msg = '{"type": "msg", "name": "' + "MegaBot" + '", "msg":"' + inhalt + '","sender":"MegaBot" }'
          // console.log('Send: ' + msg)
          connection.sendUTF(msg)
        }
      }
      joinGesp()
    })
  }

  /**
   * Methode um sich mit dem Server zu verbinden. Achtung wir nutzen localhost
   * 
   */
  connect () {
    this.client.connect('ws://localhost:8181/', 'chat')
    this.connected = true
  }


  

  /** 
   * Hier muss ihre Verarbeitungslogik integriert werden.
   * Diese Funktion wird automatisch im Server aufgerufen, wenn etwas ankommt, das wir 
   * nicht geschrieben haben
   * @param nachricht auf die der bot reagieren soll
  */
  async post (msg) {

    var get=JSON.parse(msg);
    var nachricht = get.msg.toLowerCase();
    var name = 'MegaBot'
    var inhalt = 'Ich versteh gar nichts'
    this.sender=get.name;
    var city = await extractCity(nachricht)


    


    // for ( var i in this.dict) {
    //   console.log(i)
    //   console.log(this.dict[i])
    // }

    for (var j = 0 ;j<brain.answers.length ;j++) {
      if (nachricht.includes(brain.answers[j].intent) && brain.answers[j].answer != "function") {
            inhalt = brain.answers[j].answer
          //  console.log(brain.answers[j].answer)
         }
      else if (nachricht.includes(brain.answers[j].intent) && brain.answers[j].answer == "function" || city != null) {
        var response = await fetchWeather(city)
        inhalt = response.weather[0].description
      }
     }

     


    var msg = '{"type": "msg", "name":"' + name + '", "msg":"' + inhalt + '","sender":"'+this.sender+'"}'
    // console.log('Send: ' + msg)
    this.client.con.sendUTF(msg)
  }

}

module.exports = bot
