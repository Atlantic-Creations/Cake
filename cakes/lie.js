exports.run = function(cake, msg) {
    let ifLies = ["isn\'t a lie!", "is a LIE!"]
    const checkForLies = ifLies[Math.floor(Math.random() * ifLies.length)]

    const mentioned = msg.mentions.members.first()
    if (!mentioned) {
        msg.channel.send(`\`${endS(msg.author.username)}\` cake ${checkForLies}`)   
    } else {
        msg.channel.send(`\`${endS(cake.users.get(mentioned.id).username)}\` cake ${checkForLies}`)
    }
}

function endS(params) {
    if(params.endsWith("s")) {
        return params + "\'"
    } else {
        return params + "\'s"
    }
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "lie",
    description: "checks if your cake is a lie",
    usage: "lie [@user]"
}