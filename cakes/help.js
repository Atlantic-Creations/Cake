exports.run = function(cake, msg, args) {
    const fs = require("fs")
    const path = require('path');
    let commandArr = [];
    let commandList = fs.readdirSync(__dirname);

    for (let i = 0; i < commandList.length; i++) {
        commandArr.push(`${prefix()}${path.basename(`${__dirname}/${commandList[i]}`, `.js`)} - ${cake.commands.get(`${path.basename(`${__dirname}/${commandList[i]}`, `.js`)}`).help.description}`);
    }
    msg.channel.send({embed: {
        color: 0xFE0060,
        description: commandArr.join('\n')
    }})

    function prefix() {
        const prefixes = ["cake ", "🍰"]
        if(msg.content.includes(prefixes[0])) {
            return prefixes[0]
        } else {
            return prefixes[1]
        }
    }
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "help",
    description: "Gives you my commands and/or information about a command",
    usage: "help [command]"
}