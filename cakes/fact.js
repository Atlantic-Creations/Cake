exports.run = function(cake, msg) {
    require("request").get("http://cakebirb.us.to/api/img", function(err, res) {
        require("request").get("http://cakebirb.us.to/api/fact", function(errr, rez) {
          msg.channel.send({embed: {
              color: 0x00FE36,
               description: `${JSON.parse(rez.body).cakefact}`,
              image: {
                  url: `${JSON.parse(res.body).cakeimg}`
              },
              footer: {
                  text: "Using the official CakeBirb API. http://cakebirb.us.to/"
              }
          }})
        })
      })
}
exports.conf = {
    aliases: []
}

exports.help = {
    name: "fact",
    description: "Cake facts! Everything to know about cake",
    usage: "fact"
}