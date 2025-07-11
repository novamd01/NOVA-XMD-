const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename,
  use: "<Facebook URL>",
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("*`Need a valid Facebook URL`*\n\nExample: `.fb https://www.facebook.com/...`");
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://nova-downloadbmb.vercel.app/api/facebook?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data.success || !data.url) {
      return reply("❌ Failed to fetch the video. Please try another link.");
    }

    const videoUrl = data.url;
    await conn.sendMessage(from, {
      video: { url: videoUrl },
      caption: "📥 *Facebook Video Downloaded*\n\n- Powered by 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷 ✅",
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ Error fetching the video. Please try again later.");
  }
});
