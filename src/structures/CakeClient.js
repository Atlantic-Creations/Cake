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

        this.loadCommands = function() {
          fs.readdir("./commands/", (err, files) => {
              let cmds = files.filter(f => f.split(".").pop() === "js")
              if(cmds.length === 0) {
                loggr.info("There are no commands for me to load!")
                return;
              }
              cmds.forEach(f => {
                let props = require(`../../commands/${f}`)
                if(props.settings.disabled) {
                  loggr.info(`${f.slice(0, -3)} has been disabled, reason: ${props.settings.disabled.reason}`)
                  props.file = f
                  this.commands.set(props.info.name, props)
                  props.settings.aliases.forEach(a => {
                    this.aliases.set(a, props.info.name)
                  })
                  return;
                } else {
                  props.file = f
                  this.commands.set(props.info.name, props)
                  props.settings.aliases.forEach(a => {
                    this.aliases.set(a, props.info.name)
                  })
                  loggr.info(`${f.slice(0, -3)} has finished loading!`)
                }
              })
          })
      }
    }
}

module.exports = CakeClient