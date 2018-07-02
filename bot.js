const Discord = require("discord.js")
const config = require("./config.json")
const fs = require("fs")
const snekfetch = require("snekfetch")
const cake = new Discord.Client()

let ingredients;
ingredients = config.ingredients;

function bake_cake(params) {
    cake.login(params)
}

cake.commands = new Discord.Collection();
cake.aliases = new Discord.Collection();

fs.readdir('./cakes/', (err, files) => {
	if (err)
		console.error(err);
	let jsfiles = files.filter(f => f.split('.')
		.pop() === 'js');
	if (jsfiles.length <= 0) {
		console.log('No commands to load!');
		return;
	}
	jsfiles.forEach(f => {
        console.log(`[Command]  ${ f.slice(0, -3) } has loaded. We gud.`)
		let props = require(`./cakes/${ f }`);
		props.fileName = f;
		cake.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			cake.aliases.set(alias, props.help.name);
		});
    });
    console.log(`+${"-".repeat(50)}+\n\n[Command]  Loaded a total amount ${files.length} Commands`);
});

cake.on("ready", () => {
    console.log(`+${"-".repeat(50)}+\n\nIm a ${cake.user.username} and im ready to go!`)
    cake.user.setActivity(`these people bake some cakes. | ${cake.guilds.size} servers.`, { type: "WATCHING" })
	cake.user.setStatus("dnd")
	snekfetch.post(`https://discordbots.org/api/bots/${cake.user.id}/stats`)
  	.set('Authorization', `${config.dbl_token}`)
  	.send({ server_count: cake.guilds.size })
  	.then(console.log('Updated dbots.org status.'))
  	.catch(e => console.warn('dbots.org down spam @oliy'));
});

cake.on("message", msg => {
    let message = msg.content.toLowerCase() || msg.content.toUpperCase();
    const prefixes = ["🍰" , "cake "]
    let prefix = false;
    for(const thisPrefix of prefixes) {
        if(message.startsWith(thisPrefix)) prefix = thisPrefix;
    }

    if (!prefix) return;

	if (msg.author.bot) return;
	if(msg.channel.type === "dm") return;
	let args = msg.content.slice(prefix.length).trim().split(' ');
	let command = args.shift().toLowerCase();

	try {
        let cmd;
	if (cake.commands.has(command)) {
		cmd = cake.commands.get(command);
	} else if (cake.aliases.has(command)) {
		cmd = cake.commands.get(cake.aliases.get(command));
	}
		cmd.run(cake, msg, args, config, prefix);
    } catch(err) {
        console.log(err)
    }
});

cake.on("guildDelete", () => {
	cake.user.setActivity(`these people bake some cakes. | ${cake.guilds.size} servers.`, { type: "WATCHING" })
	snekfetch.post(`https://discordbots.org/api/bots/${cake.user.id}/stats`)
	.set('Authorization', `${config.dbl_token}`)
	.send({ server_count: cake.guilds.size })
	.then(console.log('Updated dbots.org status.'))
	.catch(e => console.warn('dbots.org down spam @oliy'));
})

cake.on("guildCreate", () => {
	cake.user.setActivity(`these people bake some cakes. | ${cake.guilds.size} servers.`, { type: "WATCHING" })
	snekfetch.post(`https://discordbots.org/api/bots/${cake.user.id}/stats`)
	.set('Authorization', `${config.dbl_token}`)
	.send({ server_count: cake.guilds.size })
	.then(console.log('Updated dbots.org status.'))
	.catch(e => console.warn('dbots.org down spam @oliy'));
})

bake_cake(ingredients)