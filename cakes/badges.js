const Database = require('better-sqlite3');
const db = new Database('./cakeData.sqlite');
db.prepare("CREATE TABLE IF NOT EXISTS badges (userID TEXT PRIMARY KEY, badgeDeveloper INTEGER, badgeBugHunter INTEGER, badgeCake INTEGER, badgeFriend INTEGER, hasBadge INTEGER)")

exports.run = (cake, msg) => {
    let mentionz = msg.mentions.members.first()
    let row = db.prepare("SELECT * FROM badges WHERE userID = ?").get(msg.author.id)
    if(!mentionz) {
    if(!row) {
        db.prepare(`INSERT INTO badges (userID, badgeDeveloper, badgeBugHunter, badgeCake, badgeFriend, hasBadge) VALUES (?, ?, ?, ?, ?, ?)`).run(`${msg.author.id}`, 0, 0, 0, 0, 0)
        msg.channel.send("You were not in the bakery registry! Adding you to the list now...")
    }
    if(row.hasBadge === 0) {
        msg.channel.send({embed: {
            color: 0xFF107D, 
            title: `Badges => ${msg.author.tag}`,
            description: "You don't have any badges!",
            footer: {
                text: "Don't cry, here is a 🍰. We still love you!"
            }
        }})
    } else {
        msg.channel.send({embed: {
            color: 0xFF107D, 
            title: `Badges => ${msg.author.tag}`,
            description: `Badges: ${row.badgeDeveloper === 1 ? "Cake Developer 🛠\n       " : ""}` +
                         `${row.badgeBugHunter === 1 ? "Bug Hunter 🐛\n       " : ""}` +
                         `${row.badgeCake === 1 ? "Trusted 🍰\n       " : ""}` +
                         `${row.badgeFriend === 1 ? "Friend 🤝" : ""}`,
            footer: {
                text: "ayy you have badges :D"
            }
        }})
    }
} else {
    let mentionRow = db.prepare("SELECT * FROM badges WHERE userID = ?").get(mentionz.user.id)
    if(!mentionRow) {
        db.prepare(`INSERT INTO badges (userID, badgeDeveloper, badgeBugHunter, badgeFriend, badgeCake, hasBadge) VALUES (?, ?, ?, ?, ?, ?)`).run(`${mentionz.user.id}`, 0, 0, 0, 0, 0)
        msg.channel.send(`${mentionz.user.username} was not in the bakery registry! Adding you to the list now...`)
    }
    if(mentionRow.hasBadge === 0) {
        msg.channel.send({embed: {
            color: 0xFF107D, 
            title: `Badges => ${mentionz.user.tag}`,
            description: "You don't have any badges!",
            footer: {
                text: "Don't cry, here is a 🍰. We still love you!"
            }
        }})
    } else {
        msg.channel.send({embed: {
            color: 0xFF107D, 
            title: `Badges => ${mentionz.user.tag}`,
            description: `Badges: ${mentionRow.badgeDeveloper === 1 ? "Cake Developer 🛠\n\t\t" : ""}` +
                         `${mentionRow.badgeBugHunter === 1 ? "Bug Hunter 🐛\n\t\t" : ""}` +
                         `${mentionRow.badgeCake === 1 ? "Trusted 🍰\n\t\t" : ""}` +
                         `${mentionRow.badgeFriend === 1 ? "Friend 🤝" : ""}`,
            footer: {
                text: "ayy you have badges :D"
            }
        }})
    }
}
}

exports.conf = {
    aliases: ["badge"]
}

exports.help = {
    name: "badges",
    description: "See info about you or someone else.",
    usage: "badges [@user]"
}