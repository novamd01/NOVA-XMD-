const { cmd } = require("../command");
const fetch = require("node-fetch");

cmd({
  pattern: "test11",
  alias: ["lyric"],
  desc: "Get song lyrics from Genius",
  category: "music",
  use: "<song title>"
}, async (m, user, msg, { text, prefix, command, reply }) => {
  if (!text) {
    return reply({
      text: `Please provide a song title.\nExample: *${prefix + command} robbery*`,
      mentions: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363382023564830@newsletter',
        newsletterName: '🌐𝐁.𝐌.𝐁-𝐗𝐌𝐃🌐',
        serverMessageId: 143
      }
    });
  }

  const query = encodeURIComponent(text);
  const apiUrl = `https://zenz.biz.id/tools/genius?query=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.result || !data.result.lyrics || data.result.lyrics.length === 0) {
      return reply({
        text: "❌ Lyrics not found.",
        mentions: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363382023564830@newsletter',
          newsletterName: '🌐𝐁.𝐌.𝐁-𝐗𝐌𝐃🌐',
          serverMessageId: 143
        }
      });
    }

    const { title, artist, album, url, lyrics } = data.result;

    let message = `🎵 *${title}*\n👤 Artist: ${artist}\n💿 Album: ${album}\n🔗 ${url}\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐁.𝐌.𝐁-𝐗𝐌𝐃*💫\n\n📄 *Lyrics:*\n`;

    for (const line of lyrics) {
      if (line.type === "header") {
        message += `\n\n*${line.text}*\n`;
      } else {
        message += `${line.text}\n`;
      }
    }

    await reply({
      text: message.trim(),
      mentions: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363382023564830@newsletter',
        newsletterName: '🌐𝐁.𝐌.𝐁-𝐗𝐌𝐃🌐',
        serverMessageId: 143
      }
    });
  } catch (error) {
    console.error(error);
    reply({
      text: "❌ Failed to fetch lyrics. Try again later.",
      mentions: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363382023564830@newsletter',
        newsletterName: '🌐𝐁.𝐌.𝐁-𝐗𝐌𝐃🌐',
        serverMessageId: 143
      }
    });
  }
});
