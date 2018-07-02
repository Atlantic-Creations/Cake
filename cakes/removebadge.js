const Database = require('better-sqlite3');
const db = new Database('./cakeData.sqlite');

exports.run = (cake, msg, args) => {
    let mentionz = msg.mentions.members.first()
    if(msg.author.id !== "439373663905513473") {
        msg.reply("Only my bakers remove badges! >:(")
    } else {
        if(!mentionz) return msg.channel.send("Well you need to mention a user to remove their badge..")
        if(!args[1]) return msg.channel.send("you have successfully removed 0 badges...")
        let row = db.prepare("SELECT * FROM badges WHERE userID = ?").get(mentionz.user.id)
        if(row.badgeDeveloper === 0 && row.badgeBugHunter === 0 && row.badgeFriend === 0 && row.badgeCake === 0 ) {
            db.prepare("UPDATE badges SET hasBadge = 0 WHERE userID = ?").run(mentionz.user.id)
        }
        if(!row) {
            db.prepare(`INSERT INTO badges (userID, badgeDeveloper, badgeBugHunter, badgeFriend, badgeCake, hasBadge) VALUES (?, ?, ?, ?, ?, ?)`).run(`${mentionz.user.id}`, 0, 0, 0, 0, 0)
            msg.channel.send("The person isnt even in the bakery registry.. ill add them now")
        } else {
            switch (args[1]) {
                case "cake":
                    db.prepare(`UPDATE badges SET badgeCake = 0, hasBadge = 1 WHERE userID = ?`).run(`${mentionz.user.id}`)
                    msg.channel.send(`You removed the Cake/Trusted badge from \`${mentionz.user.tag}\`!`)
                    break;
                case "bughunter":
                    db.prepare(`UPDATE badges SET badgeBugHunter = 0, hasBadge = 1 WHERE userID = ?`).run(`${mentionz.user.id}`)
                    msg.channel.send(`You removed the Cake/Trusted badge from \`${mentionz.user.tag}\`!`)
                    break;
                case "developer":
                    db.prepare(`UPDATE badges SET badgeDeveloper = 0, hasBadge = 1 WHERE userID = ?`).run(`${mentionz.user.id}`)
                    msg.channel.send(`You removed the Developer badge from \`${mentionz.user.tag}\`!`)
                    break;
                case "friend":
                    db.prepare(`UPDATE badges SET badgeFriend = 0, hasBadge = 1 WHERE userID = ?`).run(`${mentionz.user.id}`)
                    msg.channel.send(`You removed the Freind badge from \`${mentionz.user.tag}\`!`)
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
    name: "removebadge",
    description: "Remove a badge from someone",
    usage: "removebadge <@user>"
}