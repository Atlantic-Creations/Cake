exports.run = function(cake, msg, args) {
    if (msg.author.id !== "439373663905513473") {
        msg.react("❌")
        msg.channel.send("This cake is only eaten by my bakers. (No permissions)")
    } else {
        if (!args[0]) return  msg.channel.send("You need some extra ingredients if you get what I mean :^)")
        try {
    let code = args.join(" ")
   var evaled = eval(code);
   if (typeof evaled !== 'string')
    evaled = require('util').inspect(evaled);
   if (code.includes("--silent")) {
    msg.channel.send("```js\n" + clean(evaled) + "\n```")
   } else {
   msg.channel.send( {embed : {
    color: 0x00CA06,
    description: `Well here you go:\n\`\`\`js\n${clean(evaled)}\n\`\`\``
   }})
   }
   } catch (err) {
   msg.channel.send("`Oh noes something wrong with the cake:`\n```js\n" +
    clean(err) +
    "\n```");
   }
    }
}

function clean(text) {
    if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
        return text;
    }
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "eval",
    description: "Does some stuff...",
    usage: "eval <stuff>"
}