const express = require('express')
const app = express()
app.use(express.json());
require('dotenv').config()

app.listen(3000, () => {
    console.log("Listening on port 3000")
})

const Discord = require("discord.js") // uses discord.js@v12 because I hate other versions :D
const client = new Discord.Client()
const channels = {
    // ["channel-identifier"]: "channelID string"
}

app.get("/", (req, res) => {
    res.send("WebhookServer online")
})

app.post("/webhook", (req, res) => {
    var { body } = req
    var { Authorization, Message, Channel } = body

    if(Authorization == process.env.AUTHORIZATION && (process.env.AUTHORIZATION != "" && process.env.AUTHORIZATION != undefined)){
        if(channels[Channel] || typeof Channel == "number"){
            if(channels[Channel]) Channel = channels[Channel] // If an identifier is provided, convert it to the string of the channelID

            const channel = client.channels.cache.find(c => c.id == channels[Channel])
            if(channel && Message != undefined){
                if (isDictionary(Message)){ // if it's an embed, then make it an embed !!!!
                    const embed = new Discord.MessageEmbed()
                    .setTitle(Message.Title)
                    .setDescription(Message.Description)
                    .setColor("RANDOM")
                    channel.send(embed)
                } else {
                    channel.send(Message)
                } 
                
                // console.log("Sent")
                res.status(200).send({
                    message: "Sent successfully"
                })
            } else {
                console.log("Invalid channel")
            }
        } else {
            console.log("Key 'channel' not found in table channels")
        }
    } else {
        console.log("Wrong key! Provided: " + Authorization)
        res.status(403).send({
            message: "Incorrect authentication"
        })
    }
})

function isDictionary(obj) {
    return typeof obj === 'object' && obj !== null &&
           typeof obj.Title === 'string' &&
           typeof obj.Description === 'string'
}

client.on("ready", () => {
    console.log("Kaboom utility online")
})

client.login(process.env.TOKEN)