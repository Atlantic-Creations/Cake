exports.run = function(cake, msg) {
    const start = Date.now()
    msg.channel.createMessage({embed: {
        color: 0xFE0060,
        description: "Baking a cake..."
    }})
    .then(m => {
        const end = Date.now()
        m.edit({embed: {
            color: 0xFE0060,
            description: `🍰 It took me \`${end - start}ms\` to bake a cake\n` +
                         `📡 It also took Discord \`${cake.shards.get(0).latency}ms\` to bake their own cake.`
        }})
    })
}

exports.settings = {
    aliases: []
}
exports.info = {
    name: "ping",
    description: "See how long it takes me to bake a cake!",
    usage: "ping"
}