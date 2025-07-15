const { cmd } = require('../command');
const axios = require('axios');

// Newsletter context info to show "View Channel"
const newsletterContext = {
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363382023564830@newsletter", // Hii ndio JID ya channel yako
    newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
    serverMessageId: 1
  },
  mentionedJid: [] // Optional if you still want to mention sender
};

cmd({
  pattern: "tiktok",
  alias: ["ttdl", "tt", "tiktokdl"],
  desc: "Download TikTok video without watermark",
  category: "downloader",
  react: "🎵",
  filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
  try {
    if (!q) return reply("Please provide a TikTok video link.");
    if (!q.includes("tiktok.com")) return reply("Invalid TikTok link.");

    reply("Downloading video, please wait...");

    const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
    const { data } = await axios.get(apiUrl);

    if (!data.status || !data.data) return reply("Failed to fetch TikTok video.");

    const { title, like, comment, share, author, meta } = data.data;
    const videoUrl = meta.media.find(v => v.type === "video").org;

    const caption = `🎵 *TikTok Video* 🎵\n\n` +
                    `👤 *User:* ${author.nickname} (@${author.username})\n` +
                    `📖 *Title:* ${title}\n` +
                    `👍 *Likes:* ${like}\n💬 *Comments:* ${comment}\n🔁 *Shares:* ${share}`;

    await conn.sendMessage(from, {
      video: { url: videoUrl },
      caption: caption,
      contextInfo: {
        ...newsletterContext,
        mentionedJid: [m.sender] // Hii inamu-tag user aliyetoa command
      }
    }, { quoted: mek });

  } catch (e) {
    console.error("Error in TikTok downloader command:", e);
    reply(`An error occurred: ${e.message}`);
  }
});
