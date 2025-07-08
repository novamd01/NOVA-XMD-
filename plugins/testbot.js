const { cmd } = require("../command");
const fetch = require("node-fetch");

cmd({
  pattern: "lyrics11",
  alias: ["lyric"],
  desc: "Get song lyrics from Genius",
  category: "music",
  use: "<song title>"
}, async (m, user, msg, { text, prefix, command, reply }) => {
  if (!text) {
    return reply(`Please provide a song title.\nExample: *${prefix + command} robbery*`);
  }

  const query = encodeURIComponent(text);
  const apiUrl = `https://zenz.biz.id/tools/genius?query=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (
      !data.result ||
      !data.result.lyrics ||
      data.result.lyrics.length === 0
    ) {
      return reply("❌ Lyrics not found.");
    }

    const {
      title,
      artist,
      album,
      url,
      lyrics
    } = data.result;

    let message = `🎵 *${title}*\n👤 Artist: ${artist}\n💿 Album: ${album}\n🔗 ${url}\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝙽𝙾𝚅𝙰-𝚇𝙼𝙳*💫\n\n📄 *Lyrics:*\n`;

    for (const line of lyrics) {
      if (line.type === "header") {
        message += `\n\n*${line.text}*\n`;
      } else {
        message += `${line.text}\n`;
      }
    }

    await reply(message.trim());
  } catch (error) {
    console.error(error);
    reply("❌ Failed to fetch lyrics. Try again later.");
  }
});
