const Database = require('better-sqlite3');
const db = new Database('./cakeData.sqlite');

exports.run = (cake, msg, args) => {
    let mentionz = msg.mentions.members.first()
    if(msg.author.id !== "439373663905513473") {
        msg.reply("Only my bakers give out badges! >:(")
    } else {
        if(!mentionz) return msg.channel.send("Well you need to mention a user to give them a badge..")
        if(!args[1]) return msg.channel.send("Congrats you gave the person a invisible badge! oh wait, that doesn't exist SO SAY WHAT BADGE YOU WANT TO GIVE THEM")
        let row = db.prepare("SELECT * FROM badges WHERE userID = ?").get(mentionz.user.id)
        if(!row) {
            db.prepare(`INSERT INTO badges (userID, badgeDeveloper, badgeBugHunter, badgeFriend, badgeCake, hasBadge) VALUES (?, ?, ?, ?, ?, ?)`).run(`${mentionz.user.id}`, 0, 0, 0, 0, 0)
            msg.channel.send("The mentioned person was not in the bakery registry! Adding you to the list now...")
        } else {
            switch (args[1]) {
                case "cake":
                    db.prepare(`UPDATE badges SET badgeCake = 1, hasBadge = 1 WHERE userID = ?`).run(`${mentionz.user.id}`)
                    msg.channel.send(`You gave \`${mentionz.user.tag}\` the Cake/Trusted badge!`)
                    break;
                case "bughunter":
                    db.prepare(`UPDATE badges SET badgeBugHunter = 1, hasBadge = 1 WHERE userID = ?`).run(`${mentionz.user.id}`)
                    msg.channel.send(`You gave \`${mentionz.user.tag}\` the Bug Hunter badge!`)
                    break;
                case "developer":
                    db.prepare(`UPDATE badges SET badgeDeveloper = 1, hasBadge = 1 WHERE userID = ?`).run(`${mentionz.user.id}`)
                    msg.channel.send(`You gave \`${mentionz.user.tag}\` the Developer badge!`)
                    break;
                case "friend":
                    db.prepare(`UPDATE badges SET badgeFriend = 1, hasBadge = 1 WHERE userID = ?`).run(`${mentionz.user.id}`)
                    msg.channel.send(`You gave \`${mentionz.user.tag}\` the Friend badge!`)
                    break;
                default:
                    break;
            }
        }
    }
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "addbadge",
    description: "Adds a cake badge to someone",
    usage: "addbadge <@user>"
}