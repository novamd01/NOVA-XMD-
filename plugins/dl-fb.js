const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook video using link",
  category: "download",
  filename: __filename
}, async (conn, m, match, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("❌ *Usage:* fb <Facebook Video URL>");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const { data } = await axios.get(`https://api.davidcyriltech.my.id/facebook2?url=${encodeURIComponent(q)}`);

    if (!data.status || !data.video || !data.video.downloads) {
      return reply("⚠️ *Failed to fetch Facebook video. Please try again.*");
    }

    const { title, downloads } = data.video;
    const bestQuality = downloads.find(v => v.quality === "HD") || downloads.find(v => v.quality === "SD");

    if (!bestQuality) {
      return reply("⚠️ *No downloadable video found.*");
    }

    const caption = `📹 *Facebook Video*\n\n🎬 *Title:* ${title}\n📥 *Quality:* ${bestQuality.quality}\n\n🔗 *Powered By 𝙽𝙾𝚅𝙰-𝚇𝙼𝙳 ✅*`;

    await conn.sendMessage(from, {
      video: { url: bestQuality.downloadUrl },
      mimetype: "video/mp4",
      caption,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "𝗡𝗢𝗩𝗔-𝗫𝗠𝗗",
          serverMessageId: 144
        }
      }
    }, { quoted: m });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (err) {
    console.error("Facebook Downloader Error:", err);
    reply("❌ *An error occurred while processing your request. Please try again later.*");
  }
});
