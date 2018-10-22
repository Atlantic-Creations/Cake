const Eris = require("eris")
const fs = require("fs")
const loggr = new (require("cat-loggr"))()

class CakeClient extends Eris {
    constructor(token, options) {
        super(token, options)

        this.config = require("../config.json")
        this.botinfo = require("../../data/botinfo.json")
        this.commands = new Map()
        this.aliases = new Map()
    }

    loadCommands() {
        fs.readdir("../commands/", (err, files) => {
            let cmds = files.filter(f => f.split(".").pop() === "js")
            if(cmds.length === 0) {
              console.log("There are no commands for me to load!")
              return;
            }
            cmds.forEach(f => {
              let props = require(`../../commands/${f}`)
              if(props.settings.disabled) {
                loggr.info(`${f.slice(0, -3)} has been disabled, reason: ${props.settings.disabled.reason}`)
                props.file = f
                boat.commands.set(props.info.name, props)
                props.settings.aliases.forEach(a => {
                  boat.aliases.set(a, props.info.name)
                })
                return;
              } else {
                console.time()
                props.file = f
                boat.commands.set(props.info.name, props)
                props.settings.aliases.forEach(a => {
                  boat.aliases.set(a, props.info.name)
                })
                loggr.info(`${f.slice(0, -3)} has loaded after ${console.timeEnd()}`)
              }
            })
        })
    }

    bake() {
        this.connect()
    }
}

module.exports = CakeClient