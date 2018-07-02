exports.run = function(cake, msg) {
    msg.channel.send({embed: {
        color: 0,
        description: "Baking a cake..."
    }})
    .then(m => {
        m.edit({embed: {
            color: 0,
            description: `:cake: It took me \`${m.createdTimestamp - msg.createdTimestamp}ms\` to bake a cake\n` +
                         `It also took Discord \`${cake.ping.toFixed(0)}ms\` to bake their own cake.`
        }})
    })
}

exports.conf = {
    aliases: []
}
exports.help = {
    name: "ping",
    description: "See how long it takes me to bake a cake!",
    usage: "ping"
}