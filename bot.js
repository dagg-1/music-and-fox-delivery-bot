const discord = require('discord.js')
const ytdl = require('ytdl-core')
const robot = new discord.Client()

// npm install

let BOTTOKEN = "EDITME"
let VOICEID = "EDITME"

robot.login(BOTTOKEN)

let active = false;

robot.on('message', async message=> {
    let recmessage = message.content
    if (active === false && recmessage.includes("https://www.youtube.com/watch?v=") || active === false && recmessage.includes("https://youtu.be/")) {
        play(recmessage)
    }
    else if (recmessage === "stop") {
        play(recmessage)
    }
    else if (recmessage === "fox") {
        message.reply("https://dagg.xyz/randomfox/images/" + Math.floor(Math.random() * 125) + ".jpg")
    }
})

async function play(recmessage) {
    active = true;
    const voicechannel = robot.channels.get(VOICEID);
    let connection = await voicechannel.join()

    if(recmessage === "stop") {
        active = false
        voicechannel.leave()
    }
    else {
        connection.playStream(ytdl(recmessage))
        .on("end",()=>{
            active = false
            voicechannel.leave()
        })
    }
}
