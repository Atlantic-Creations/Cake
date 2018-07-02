exports.run = function(cake, msg) {
    msg.channel.send({embed: {
        color: 0xFE009E,
        description: "➕ You can invite me to your server [here](https://discordapp.com/oauth2/authorize?client_id=447790972475015208&scope=bot&permissions=1848650831)\n\n" +
                     "🛠 Or join my support server [here](https://discord.gg/JMNzKyf)"
    }})
}

exports.conf = {
    aliases: ["support"]
}

exports.help = {
    name: "invite",
    description: "Invite me to your server or get the link to my restaurant/support server",
    usage: "invite/support"
}