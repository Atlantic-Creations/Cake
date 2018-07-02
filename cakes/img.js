exports.run = function(cake, msg) {
    require("request").get("http://cakebirb.us.to/api/img", function(err, res) {
    msg.channel.send({embed: {
        color: 0x00FE36,
        image: {
            url: `${JSON.parse(res.body).cakeimg}`
        },
        footer: {
            text: "Using the bot's official API. | http://cakebirb.us.to/"
        }
    }})
})
}

exports.conf = {
    aliases: ["cakeimg", "image"]
}

exports.help = {
    name: "img",
    description: "Gets a random cake image",
    usage: "img"
}