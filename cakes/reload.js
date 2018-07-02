exports.run = function(cake, msg, args) {
    if(!args[0] || args[0].size < 1) return msg.reply("Must provide a command name to reload.");
    const commandName = args[0];
    // Check if the command exists and is valid
    if(!cake.commands.has(commandName)) return msg.reply("That command does not exist");
    if(msg.author.id !== "439373663905513473") return msg.channel.send("Only my bakers can eat this cake. (No permissions)")
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${commandName}.js`)];
    // We also need to delete and reload the command from the client.commands Enmap
    cake.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    cake.commands.set(commandName, props);
    msg.reply(`The command ${commandName} has been reloaded`);
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "reload",
    description: "Re-bakes a cake / reload a command",
    usage: "reload <command>"
}