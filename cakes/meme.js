const request = require("request")

exports.run = (cake, msg) => {
    request.get("http://cakebirb.us.to/api/memes", function(err, res) {
        let ceme = JSON.parse(res.body)
        msg.channel.send({embed: {
            color: 0x079DFF,
            description: "Cake Memes? Yes, its a thing.",
            image: {
                url: `${ceme.cakememe}`
            }
        }})
    })
}

exports.conf = {
    aliases: ["memes"]
}

exports.help = {
    name: "meme",
    description: "Memes, except that its cake",
    usage: "meme"
}