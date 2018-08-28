const Discord = require("discord.js")
const fs = require("fs")

module.exports = class CakeClient extends Discord.Client {
    constructor(options) {
        super(options)

        this.config = require("../config.json")
        this.commands = new Discord.Collection()
        this.aliases = new Discord.Collection()
        this.economy = require("./Economy.js")
        this.badges = require("./Badges.js")
        this.ingredients = this.config.ingredients
    }

    /**
     * Load up the commands
     */
    loadCommands() {
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
                let props = require(`../cakes/${ f }`);
                props.fileName = f;
                this.commands.set(props.help.name, props);
                props.conf.aliases.forEach(alias => {
                    this.aliases.set(alias, props.help.name);
                });
                console.log(`[Command]  ${ f.slice(0, -3) } has loaded. We gud.`)
            });
            console.log(`+${"-".repeat(50)}+\n\n[Command]  Loaded a total amount ${files.length} Commands`);
        });
    }

    /**
     * 
     * @param {String} token Login to the CakeClient with this function because memes
     */
    bake(token) {
        this.login(token)
    }

    /**
     * 
     * @param {String} command The command to run
     * @param {Class}  client What you defined as the CakeClient
     * @param {Object} message What you defined message as in the message event
     * @param {Array}  argumentz Any arguments after the command (prefix + command + *) * = arguments
     * @param {String} prefix If you need to pass the prefix anytime
     */
    runCommand(command, client = this, message, argumentz, prefix) {
        try {
            let cmd;
            if(this.commands.has(command)) {
                cmd = this.commands.get(command)
            } else if (this.aliases.get(command)) {
                cmd = this.commands.get(this.aliases.get(command))
            } else {
                return;
            }
            cmd.run(client, message, argumentz, prefix)
        } catch(err) {
            console.log(err)
        }
    }

    /**
     * 
     * @param {Array} botlists An array of botlists to post server count to
     */
    postServers(botlists) {
        const request = require("request")
        const linkMap = {
            "dbl": `https://discordbots.org/api/bots/${this.user.id}stats`,
            "bfd": `https://botsfordiscord.com/api/v1/bots/${this.user.id}`
        }
        const tokens = {
            "dbl": this.config.dbl_token,
            "bfd": this.config.bfd_token
        }

        botlists.forEach(v => {
            request.post(replaceMap(v, linkMap), {form: {"server_count": this.guilds.size}, headers: {"Authorization": replaceMap(v, tokens)}}, function(err, http, body) {
                if(err) return console.warn(err);
                console.log("Posed server count to " + v.toUpperCase())
            })
        })    
           
        function replaceMap(str, replacements) {
            var find;
            for( find in replacements ) {
                if( !replacements.hasOwnProperty(find) ) continue;
                str = str.replace(new RegExp(find, 'g'), replacements[find]);
            }
            return str;
        }
    }
}
