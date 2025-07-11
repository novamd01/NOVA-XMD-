const config = require('../config');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');

cmd({
  pattern: "tagall",
  react: "🔊",
  alias: ["gc_tagall"],
  desc: "To Tag all Members",
  category: "group",
  use: '.tagall [message]',
  filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, args, body }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const botOwner = conn.user.id.split(":")[0];
    const senderJid = senderNumber + "@s.whatsapp.net";

    if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
      return reply("❌ Only group admins or the bot owner can use this command.");
    }

    let groupInfo = await conn.groupMetadata(from).catch(() => null);
    if (!groupInfo) return reply("❌ Failed to fetch group information.");

    let groupName = groupInfo.subject || "Unknown Group";
    let totalMembers = participants ? participants.length : 0;
    if (totalMembers === 0) return reply("❌ No members found in this group.");

    let emojis = ['📢', '🔊', '🌐', '🔰', '❤‍🩹', '🤍', '🖤', '🩵', '📝', '💗', '🔖', '🪩', '📦', '🎉', '🛡️', '💸', '⏳', '🗿', '🚀', '🎧', '🪀', '⚡', '🚩', '🍁', '🗣️', '👻', '⚠️', '🔥'];
    let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    let message = body.slice(body.indexOf(command) + command.length).trim();
    if (!message) message = "Attention Everyone";

    let teks = `▢ Group : *${groupName}*\n▢ Members : *${totalMembers}*\n▢ Message: *${message}*\n\n┌───⊷ *MENTIONS*\n`;

    for (let mem of participants) {
      if (!mem.id) continue;
      teks += `${randomEmoji} @${mem.id.split('@')[0]}\n`;
    }

    teks += "└──✪ 𝗡𝗢𝗩𝗔 ┃ 𝗫𝗠𝗗 ✪──";

    const newsletterContext = {
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
          serverMessageId: 1
        }
      }
    };

    await conn.sendMessage(from, {
      text: teks,
      mentions: participants.map(a => a.id),
      ...newsletterContext.contextInfo
    }, { quoted: mek });

  } catch (e) {
    console.error("TagAll Error:", e);
    reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
  }
});
