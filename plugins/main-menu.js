const config = require('../config')
const { cmd, commands } = require('../command');
const os = require("os")
const { runtime } = require('../lib/functions')
const fs = require("fs");
const path = require("path");

cmd({
  pattern: "menu",
  alias: ["allmenu", "bmb"],
  use: '.menu',
  desc: "menu the bot",
  category: "menu",
  react: "📱",
  filename: __filename
},
  async (conn, mek, m, {
    from,
    quoted,
    body,
    isCmd,
    command,
    args,
    q,
    isGroup,
    sender,
    senderNumber,
    botNumber2,
    botNumber,
    pushname,
    isMe,
    isOwner,
    groupMetadata,
    groupName,
    participants,
    groupAdmins,
    isBotAdmins,
    isAdmins,
    reply
  }) => {
    try {

      const randomIndex = Math.floor(Math.random() * 10) + 1;
      const imagePath = path.join(__dirname, '..', 'scs', `menu${randomIndex}.jpg`);
      const imageBuffer = fs.readFileSync(imagePath);

      let dec = `
╭━〔*🔰 𝗡𝗢𝗩𝗔-𝗫𝗠𝗗 🔰*〕━━┈⊷
┃❒╭────────────
┃❒│ 👑 *ʀᴜɴᴛɪᴍᴇ:* ${runtime(process.uptime())}
┃❒│ 🕹️ *ᴍᴏᴅᴇ:* *${config.MODE}*
┃❒│ 🎯 *ᴘʀᴇғɪx:* *${config.PREFIX}*
┃❒│ 💡 *ʀᴀᴍ ᴜsᴇ:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} GB / ${Math.round(require('os').totalmem / 1024 / 1024)} GB
┃❒│ 👑 *ᴅᴇᴠ:* *𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷*
┃❒│ 🚀 *ᴠᴇʀsɪᴏɴ:* *1.0.0*
┃❒╰────────────────
╰━━━━━━━━━━━━━━━━━━┈⊷

---
📚 *DOWNLOAD COMMANDS*
---
* 🎧 .fb
* 🎧 .insta
* 🎧 .video
* 🎧 .gdrive
* 🎧 .twitter
* 🎧 .tt
* 🎧 .mediafire
* 🎧 .play
* 🎧 .song
* 🎧 .spotify
* 🎧 .video4
* 🎧 .img
* 🎧 .lyrics
* 🎧 .apk
* 🎧 .baiscope
* 🎧 .ginisisila

---
🔍 *SEARCH COMMANDS*
---
* 🔎 .yts
* 🔎 .yta
* 🔎 .movie
* 🔎 .romance
* 🔎 .motivate
* 🔎 .aivoice
* 🔎 .google
* 🔎 .weather
* 🔎 .sticksearch

---
🎨 *LOGO COMMANDS*
---
* 🔴 .3dcomic
* 🔴 .dragonball
* 🔴 .deadpool
* 🔴 .blackpink
* 🔴 .neonlight
* 🔴 .cat
* 🔴 .sadgirl
* 🔴 .pornhub
* 🔴 .naruto
* 🔴 .thor
* 🔴 .america
* 🔴 .eraser
* 🔴 .3dpaper
* 🔴 .futuristic
* 🔴 .clouds
* 🔴 .sans
* 🔴 .galaxy
* 🔴 .leaf
* 🔴 .sunset
* 🔴 .nigeria
* 🔴 .devilwings
* 🔴 .hacker
* 🔴 .boom
* 🔴 .luxury
* 🔴 .zodiac
* 🔴 .angelwings
* 🔴 .bulb
* 🔴 .tattoo
* 🔴 .castle
* 🔴 .frozen
* 🔴 .paint
* 🔴 .birthday
* 🔴 .typography
* 🔴 .bear
* 🔴 .valorant

---
🧠 *AI COMMANDS*
---
* 🤖 .gpt
* 🤖 .ai
* 🤖 .imagescan
* 🤖 .imagine

---
👑 *OWNER COMMANDS*
---
* 👑 .updatecmd
* 👑 .settings
* 👑 .owner
* 👑 .repo
* 👑 .system
* 👑 .status
* 👑 .about
* 👑 .block
* 👑 .unblock
* 👑 .shutdown
* 👑 .broadcast
* 👑 .jid
* 👑 .gjid
* 👑 .pair
* 👑 .save
* 👑 .getpp
* 👑 .restart

---
👥 *GROUP COMMANDS*
---
* 👥 .remove
* 👥 .del
* 👥 .add
* 👥 .kick
* 👥 .kickall
* 👥 .promote
* 👥 .demote
* 👥 .tagall
* 👥 .invite
* 👥 .revoke
* 👥 .poll
* 👥 .randomship
* 👥 .newgc
* 👥 .mute
* 👥 .unmute
* 👥 .lockgc
* 👥 .unlockgc
* 👥 .leave
* 👥 .gname
* 👥 .makeadmin
* 👥 .tagadmins
* 👥 .gdesc
* 👥 .join
* 👥 .hidetag
* 👥 .ginfo

---
ℹ️ *INFO COMMANDS*
---
* 💡 .about
* 💡 .alive
* 💡 .request
* 💡 .botinfo
* 💡 .status
* 💡 .ping
* 💡 .system
* 💡 .uptime

---
🤖 *BOT SETTINGS*
---
* ⚙️ .repo
* ⚙️ .anticall 
* ⚙️ .menu
* ⚙️ .update
* ⚙️ .mode
* ⚙️ .auto-typing
* ⚙️ .alwaysonline
* ⚙️ .auto-recording
* ⚙️ .autoreadstatus
* ⚙️ .antibad
* ⚙️ .autosticker
* ⚙️ .autoreply
* ⚙️ .autoreact
* ⚙️ .antilink
* ⚙️ .autoread

---
🔄 *CONVERTER COMMANDS*
---
* ⚡ .sticker
* ⚡ .take
* ⚡ .trt
* ⚡ .tts
* ⚡ .fancy
* ⚡ .url
* ⚡ .age
* ⚡ .convert
* ⚡ .tiny
* ⚡ .movie
* ⚡ .terminate
* ⚡ .family

---
🎲 *RANDOM COMMANDS*
---
* 🍀 .anime
* 🍀 .couplepp
* 🍀 .loli
* 🍀 .waifu
* 🍀 .cosplay
* 🍀 .neko
* 🍀 .randomanime

---
🖼️ *WALLPAPERS COMMANDS*
---
* 🏞️ .img
* 🏞️ .logo
* 🏞️ .ss
* 🏞️ .rw
* 🏞️ .fluxai

---
✨ *OTHER COMMANDS*
---
* 🌐 .trt
* 🌐 .joke
* 🌐 .fact
* 🌐 .github
* 🌐 .gpass
* 🌐 .hack
* 🌐 .vv
* 🌐 .vv2
* 🌐 .spam
* 🌐 .vcard
* 🌐 .srepo
* 🌐 .channelinfo
* 🌐 .system
* 🌐 .rank
* 🌐 .timezone
* 🌐 .define
* 🌐 .dailyfact

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷🔥`;

      await conn.sendMessage(
        from,
        {
          image: imageBuffer,
          caption: dec,
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363382023564830@newsletter',
              newsletterName: '𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷',
              serverMessageId: 143
            }
          }
        },
        { quoted: mek }
      );

    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  });
