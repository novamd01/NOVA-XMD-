const config = require('../config');
const { cmd } = require('../command');
const { getGroupAdmins } = require('../lib/functions');

cmd({
  pattern: "tagall",
  react: "🔊",
  alias: ["gc_tagall"],
  desc: "To Tag all Members",
  category: "group",
  use: '.tagall [message]',
  filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, command, body }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const botOwner = conn.user.id.split(":")[0];
    const senderJid = senderNumber + "@s.whatsapp.net";

    if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
      return reply("❌ Only group admins or the bot owner can use this command.");
    }

    const groupInfo = await conn.groupMetadata(from).catch(() => null);
    if (!groupInfo) return reply("❌ Failed to fetch group info.");

    const groupName = groupInfo.subject || "Unknown Group";
    const totalMembers = participants.length;

    const emojis = ['📢','🔊','🌐','🔰','❤‍🩹','🤍','🖤','🩵','📝','💗','🔖','🪩','📦','🎉','🛡️','💸','⏳','🗿','🚀','🎧','🪀','⚡','🚩','🍁','🗣️','👻','⚠️','🔥'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    const message = body.slice(body.indexOf(command) + command.length).trim() || "Attention Everyone";

    let teks = `▢ Group : *${groupName}*\n▢ Members : *${totalMembers}*\n▢ Message: *${message}*\n\n┌───⊷ *MENTIONS*\n`;

    for (const mem of participants) {
      if (!mem.id) continue;
      teks += `${randomEmoji} @${mem.id.split('@')[0]}\n`;
    }

    teks += "└──✪ 𝗡𝗢𝗩𝗔 ┃ 𝗫𝗠𝗗 ✪──";

    await conn.sendMessage(from, {
      text: teks,
      mentions: participants.map(a => a.id),
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
          serverMessageId: 1
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.error("TagAll Error:", e);
    reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
  }
});
