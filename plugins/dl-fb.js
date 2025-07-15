const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook video using backup APIs",
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

    const apis = [
      `https://api.giftedtech.web.id/api/download/facebookv2?apikey=gifted&url=${encodeURIComponent(q)}`,
      `https://api.giftedtech.web.id/api/download/facebook?apikey=gifted&url=${encodeURIComponent(q)}`
    ];

    let videoUrl = null;
    let title = "Facebook Video";

    for (const api of apis) {
      try {
        const { data } = await axios.get(api);
        if (data?.result?.url) {
          videoUrl = data.result.url;
          title = data.result.title || title;
          break;
        }
      } catch (err) {
        // Jaribu API inayofuata kama hii imefail
        continue;
      }
    }

    if (!videoUrl) {
      return reply("⚠️ *Failed to fetch Facebook video from both APIs. Try another link.*");
    }

    const caption = `📹 *Facebook Video*\n🎬 *Title:* ${title}\n\n🔗 *Powered By 𝙽𝙾𝚅𝙰-𝚇𝙼𝙳 ✅*`;

    await conn.sendMessage(from, {
      video: { url: videoUrl },
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
