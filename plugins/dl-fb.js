const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "fb",
  desc: "Download Facebook video with fb API",
  category: "download",
  use: "<facebook video link>",
  reaction: "📽️"
}, async (zk, m, msg, { args, reply }) => {
  if (!args[0]) {
    return reply("📌 Please provide a Facebook video link.\nExample: *.fb https://facebook.com/reel/...*");
  }

  const queryURL = args.join(" ");
  const apiURL = `https://giftedapi.zone.id/api/download/facebook?apikey=gifted&url=${encodeURIComponent(queryURL)}`;

  try {
    const res = await axios.get(apiURL);
    const result = res.data.result;

    if (!result || (!result.hd && !result.sd)) {
      return reply("❌ Could not retrieve the video. Make sure it's a public video.");
    }

    const caption = `🎬 *Title:* ${result.title || "Untitled"}\n🧷 *Link:* ${queryURL}`;

    if (result.thumbnail) {
      await zk.sendMessage(m.chat, {
        image: { url: result.thumbnail },
        caption
      }, { quoted: m });
    }

    await zk.sendMessage(m.chat, {
      video: { url: result.hd || result.sd },
      caption: "✅ Facebook video downloaded via fb API\n⚡ Powered by *B.M.B XMD*"
    }, { quoted: m });

  } catch (error) {
    console.error("fb download error:", error.message || error);
    reply("🚫 Failed to download the video. Please check the link or try later.");
  }
});


cmd({
  pattern: "fb2",
  desc: "Download Facebook video with fb2 API",
  category: "download",
  use: "<facebook video link>",
  reaction: "📽️"
}, async (zk, m, msg, { args, reply }) => {
  if (!args[0]) {
    return reply("📌 Please provide a Facebook video link.\nExample: *.fb2 https://facebook.com/reel/...*");
  }

  const queryURL = args.join(" ");
  const apiURL = `https://giftedapi.zone.id/api/download/facebookv2?apikey=gifted&url=${encodeURIComponent(queryURL)}`;

  try {
    const res = await axios.get(apiURL);
    const result = res.data.result;

    if (!result || (!result.hd && !result.sd)) {
      return reply("❌ Could not retrieve the video. Make sure it's a public video.");
    }

    const caption = `🎬 *Title:* ${result.title || "Untitled"}\n🧷 *Link:* ${queryURL}`;

    if (result.thumbnail) {
      await zk.sendMessage(m.chat, {
        image: { url: result.thumbnail },
        caption
      }, { quoted: m });
    }

    await zk.sendMessage(m.chat, {
      video: { url: result.hd || result.sd },
      caption: "✅ Facebook video downloaded via fb2 API\n⚡ Powered by *B.M.B XMD*"
    }, { quoted: m });

  } catch (error) {
    console.error("fb2 download error:", error.message || error);
    reply("🚫 Failed to download the video. Please check the link or try later.");
  }
});
