const { cmd } = require("../command");
const fetch = require("node-fetch");

cmd({
  pattern: "lyrics",
  alias: ["lyric"],
  desc: "Get song lyrics from Genius",
  category: "music",
  use: "<song title>",
  reaction: "🎙️"
}, async (zk, m, msg, { text, prefix, command, reply }) => {
  if (!text) {
    return reply(`Please provide a song title.\nExample: *${prefix + command} robbery*`);
  }

  const query = encodeURIComponent(text);
  const apiUrl = `https://zenz.biz.id/tools/genius?query=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.result || !data.result.lyrics || data.result.lyrics.length === 0) {
      return reply("❌ Lyrics not found.");
    }

    const { title, artist, album, url, lyrics } = data.result;

    // Jenga kibox cha message
    let message = `┏━━━━━━━━━━━━━━━━━━━━━━━┓\n`;
    message += `┃ 🎵 *${title}*\n`;
    message += `┣━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `┃ 👤 Artist: ${artist}\n`;
    message += `┣━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `┃ 💿 Album: ${album}\n`;
    message += `┣━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `┃ 🔗 ${url}\n`;
    message += `┣━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `┃ > *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝙽𝙾𝚅𝙰-𝚇𝙼𝙳*💫\n`;
    message += `┣━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `┃ 📄 *Lyrics:*\n`;

    // Ongeza mistari ya lyrics ndani ya box
    for (const line of lyrics) {
      if (line.type === "header") {
        message += `┃ \n┃ *${line.text}*\n`;
      } else {
        message += `┃ ${line.text}\n`;
      }
    }

    message += `┗━━━━━━━━━━━━━━━━━━━━━━━┛`;

    await zk.sendMessage(m.chat, {
      text: message.trim(),
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "🌐𝐁.𝐌.𝐁-𝐗𝐌𝐃🌐",
          serverMessageId: 1
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    reply("❌ Failed to fetch lyrics. Try again later.");
  }
});
