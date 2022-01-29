const Discord = require("discord.js")
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS]
})
require("dotenv").config()
var weather = require('weather-js');
const {prefix}=require("./cfg.json")
client.on("ready", () => {
    console.log("[Bot] connected to Discord")
})
client.on("messageCreate", msg => {
    if(msg.content.startsWith("><weather")) {
        const args = msg.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        weather.find({search: `${args}`, degreeType: 'C'}, function(err, result) {
            
             const e = new Discord.MessageEmbed()
             .setTitle("Weather for " + args)
.setDescription("https://development.pgamerx.com")
             .addField("Temperature", `${result[0].current.temperature} Celcius`, true)
             .addField("Sky Text", result[0].current.skytext, true)
             .addField("Humidity", result[0].current.humidity, true)
             .addField("Wind Speed", result[0].current.windspeed, true)
             .addField("Observation Time", result[0].current.observationtime, true)
             .addField("Wind Display", result[0].current.winddisplay, true)
             .setColor("RANDOM")
             .setFooter("Coded by Deveroonie as a part of PGamerX Development")
             
             msg.reply({
            embeds: [e]
             })
            
    })
}
})

client.login(process.env.token)
