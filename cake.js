const Cake = require("./src/Cake")
const cake = new Cake.Client(require("./src/config.json").token, {
    disableEveryone: true
})
const loggr = new (require("cat-loggr"))()
cake.loadCommands()

cake.on("ready", () => {
    loggr.info("Connected to Discord, I am ready!")
})

cake.on("messageCreate", msg => {
	if (msg.author.cake) return;
	if(msg.channel.type === "dm") return;
    let message = msg.content.toLowerCase() || msg.content.toUpperCase();
    const prefixes = ["🍰" , "cake "]
    let prefix = false;
    for(const thisPrefix of prefixes) {
        if(message.startsWith(thisPrefix)) prefix = thisPrefix;
    }

    if(msg.content === `<@!${cake.user.id}>` || msg.content === `<@${cake.user.id}>`) {
		msg.channel.createMessage({embed: {
			color: 0xFE0060,
			description: "Hi im a cake and guess what I bring you. Thats right, cake!\n\nEnjoy cake images, facts and even memes! To use my commands, simply type `cake help` or `🍰 help`! If you do encounter problems, just do `cake support` and you can join my support server! Enjoy the cakes ;D"
		}})
    }
    if (!prefix) return;
  
      let args = msg.content.slice(prefix.length).trim().split(" ")
      let coms = args.shift().toLowerCase()
  
      try {
        let cmd = cake.commands.get(coms) || cake.commands.get(cake.commands.aliases.get(coms))
        if(!cmd) return;
        if(cmd.settings.owner && msg.author.id !== "439373663905513473") {
            boat.addMessageReaction(msg.channel.id, msg.id, "❌")
            msg.channel.createMessage("This command is reserved for the bakers smh")
          return;
        } else if(!msg.channel.nsfw && cmd.settings.nsfw) {
          msg.channel.createMessage("I don't know why a cake bot would need NSFW commands but yea go in an NSFW channel to use this")
        } else if(cmd.settings.disabled) {
          msg.channel.createMessage("This command has been temporarily disabled :(")
        } else {
          cmd.run(cake, msg, args, prefix)
          cake.botinfo.cmds_ran++
        }
      } catch (err) {
        if(err.message === "Cannot read property 'get' of undefined") return;
        console.log(err)
      }  
})
cake.connect()

Map.map = function(fn, thisArg) {
  if (thisArg) fn = fn.bind(thisArg);
  const arr = new Array(this.size);
  let i = 0;
  for (const [key, val] of this) arr[i++] = fn(val, key, this);
  return arr;
}
Map.filter = function(fn, thisArg) {
    if (thisArg) fn = fn.bind(thisArg);
    const results = new Collection();
    for (const [key, val] of this) {
      if (fn(val, key, this)) results.set(key, val);
    }
    return results;
}