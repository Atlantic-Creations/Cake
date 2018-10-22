const Cake = require("./src/Cake")
var cake = new Cake.Client(cake.config.token, {
    disableEveryone: true
})
const loggr = new (require("cat-loggr"))()

cake.on("ready", () => {
    loggr.info("Connected to Discord, I am ready!")
})

cake.bake()