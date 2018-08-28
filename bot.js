const Discord = require("discord.js")
const CakeClient = require("./utils/CakeClient.js")
const fs = require("fs")
const cake = new CakeClient()

cake.loadCommands()

cake.on("ready", () => {
    console.log(`+${"-".repeat(50)}+\n\nIm a ${cake.user.username} and im ready to go!`)
    cake.user.setActivity(`these people bake some cakes. | ${cake.guilds.size} servers.`, { type: "WATCHING" })
	cake.user.setStatus("dnd")
	cake.postServers(["dbl", "bfd"])
});

cake.on("message", msg => {
    if (msg.author.bot) return;
    if(msg.channel.type === "dm") return;
    let message = msg.content.toLowerCase() || msg.content.toUpperCase();
    const prefixes = ["🍰" , "cake "]
    let prefix = false;
    for(const thisPrefix of prefixes) {
        if(message.startsWith(thisPrefix)) prefix = thisPrefix;
    }

	if(msg.content === `<@${cake.user.id}>`) {
		msg.channel.send({embed: {
			color: 0xFE0060,
			description: "Hi im a cake and guess what I bring you. Thats right, cake!\n\nEnjoy cake images, facts and even memes! To use my commands, simply type `cake help` or `🍰 help`! If you do encounter problems, just do `cake support` and you can join my support server! Enjoy the cakes ;D"
		}})
	}
    if (!prefix) return;

	let args = msg.content.slice(prefix.length).trim().split(' ');
	let command = args.shift().toLowerCase();
	cake.runCommand(command, cake, msg, args, prefix)
});

cake.on("guildDelete", () => {
	cake.user.setActivity(`these people bake some cakes. | ${cake.guilds.size} servers.`, { type: "WATCHING" })
	cake.postServers(["dbl", "bfd"])
})

cake.on("guildCreate", () => {
	cake.user.setActivity(`these people bake some cakes. | ${cake.guilds.size} servers.`, { type: "WATCHING" })
	cake.postServers(["dbl", "bfd"])
})

cake.bake(cake.ingredients)
