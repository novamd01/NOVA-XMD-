const axios = require("axios");
const { cmd } = require("../command");

// ingiza token yako hapa (au environment variable)
const APIFY_TOKEN = process.env.APIFY_TOKEN;

cmd({
  pattern: "test",
  desc: "Download video from Facebook / Twitter / Instagram",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
  if (!args[0]) return reply("❌ Please provide a URL !!");

  const url = args[0];
  const apiUrl = `https://api.apify.com/v2/acts/wilcode~all-social-media-video-downloader/run-sync-get-dataset-items?token=${APIFY_TOKEN}`;
  try {
    const resp = await axios.post(apiUrl, { url });
    const items = resp.data.items;
    if (!items || items.length === 0) return reply("❌ Download failed or no video");

    const video = items[0];
    const videoUrl = video.videoUrl || video.url;

    await conn.sendMessage(from,
      { video: { url: videoUrl }, caption: "Downloaded video ✅" },
      { quoted: m }
    );
  } catch (err) {
    console.error(err);
    reply("❌ Error downloading video: " + (err.message || err));
  }
});
