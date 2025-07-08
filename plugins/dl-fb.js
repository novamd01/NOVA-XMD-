const axios = require("axios");
const { cmd } = require("../command");

// ========== FACEBOOK HD ==========
cmd({
  pattern: "fb11",
  alias: ["facebook"],
  desc: "Download Facebook video (HD)",
  category: "download",
  use: "<facebook_video_url>",
  filename: __filename,
}, async ({ m, args, sock, repondre }) => {
  if (!args[0]) return repondre("Insert a public Facebook video link!");

  const queryURL = args.join(" ");
  try {
    const result = await getFBInfo(queryURL);

    let caption = `
🎥 Title: ${result.title}
🔗 Link: ${result.url}
`;

    await sock.sendMessage(m.jid, {
      image: { url: result.thumbnail },
      caption,
    }, { quoted: m });

    await sock.sendMessage(m.jid, {
      video: { url: result.hd },
      caption: 'Facebook video downloader powered by B.M.B-TECH',
    }, { quoted: m });

  } catch (e) {
    console.error("FB Error:", e);
    repondre("Try using the command: .fb2 if this fails.");
  }
});

// ========== FACEBOOK SD ==========
cmd({
  pattern: "fb2",
  alias: ["facebooksd"],
  desc: "Download Facebook video (SD)",
  category: "download",
  use: "<facebook_video_url>",
  filename: __filename,
}, async ({ m, args, sock, repondre }) => {
  if (!args[0]) return repondre("Insert a public Facebook video link!");

  const queryURL = args.join(" ");
  try {
    const result = await getFBInfo(queryURL);

    let caption = `
🎥 Title: ${result.title}
🔗 Link: ${result.url}
`;

    await sock.sendMessage(m.jid, {
      image: { url: result.thumbnail },
      caption,
    }, { quoted: m });

    await sock.sendMessage(m.jid, {
      video: { url: result.sd },
      caption: 'Facebook video downloader powered by B.M.B-TECH',
    }, { quoted: m });

  } catch (e) {
    console.error("FB2 Error:", e);
    repondre("Failed to get Facebook video.");
  }
});

// ========== TIKTOK ==========
cmd({
  pattern: "tiktok11",
  alias: ["tt"],
  desc: "Download TikTok video",
  category: "download",
  use: "<tiktok_video_url>",
  filename: __filename,
}, async ({ m, args, sock, prefix, repondre }) => {
  if (!args[0]) return repondre(`How to use:\n${prefix}tiktok <tiktok_video_link>`);

  const videoUrl = args.join(" ");

  try {
    const res = await axios.get(`https://api.onesytex.my.id/api/tiktok-dl=${encodeURIComponent(videoUrl)}`);
    const tik = res.data.data;

    const caption = `
👤 Author: ${tik.author}
📝 Description: ${tik.desc}
`;

    await sock.sendMessage(m.jid, {
      video: { url: tik.links[0].a },
      caption,
    }, { quoted: m });

  } catch (error) {
    console.error("TikTok Error:", error);
    repondre("Failed to download TikTok video.");
  }
});

// ========== HELPER FUNCTION ==========
async function getFBInfo(url) {
  const res = await axios.get(`https://api.myfbdownloader.com?url=${encodeURIComponent(url)}`);
  return {
    title: res.data.title,
    url: res.data.url,
    thumbnail: res.data.thumbnail,
    hd: res.data.hd,
    sd: res.data.sd
  };
    }
