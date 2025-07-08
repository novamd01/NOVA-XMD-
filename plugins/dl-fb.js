const axios = require("axios");
const { cmd } = require("../command");

// ========== FACEBOOK HD ==========
cmd({
  pattern: "fb11",
  alias: ["facebook"],
  desc: "Download Facebook video (HD)",
  category: "download",
  filename: __filename
}, async ({ m, args, sock, repondre }) => {
  if (!args[0]) return repondre("🔗 Please provide a Facebook video URL!");

  try {
    const data = await getFBInfo(args.join(" "));
    await sock.sendMessage(m.jid, {
      image: { url: data.thumbnail },
      caption: `🎥 *${data.title}*\n🔗 ${data.url}`
    }, { quoted: m });

    await sock.sendMessage(m.jid, {
      video: { url: data.hd },
      caption: "Facebook HD video powered by B.M.B-TECH"
    }, { quoted: m });

  } catch (e) {
    repondre("❌ Failed to fetch video. Try `.fb2` instead.");
  }
});

// ========== FACEBOOK SD ==========
cmd({
  pattern: "fb2",
  desc: "Download Facebook video (SD)",
  category: "download",
  filename: __filename
}, async ({ m, args, sock, repondre }) => {
  if (!args[0]) return repondre("🔗 Provide a Facebook video URL!");

  try {
    const data = await getFBInfo(args.join(" "));
    await sock.sendMessage(m.jid, {
      image: { url: data.thumbnail },
      caption: `🎥 *${data.title}*\n🔗 ${data.url}`
    }, { quoted: m });

    await sock.sendMessage(m.jid, {
      video: { url: data.sd },
      caption: "Facebook SD video powered by B.M.B-TECH"
    }, { quoted: m });

  } catch (e) {
    repondre("❌ Couldn't get SD video.");
  }
});

// ========== TIKTOK ==========
cmd({
  pattern: "tiktok22",
  desc: "Download TikTok video",
  category: "download",
  filename: __filename
}, async ({ m, args, sock, repondre }) => {
  if (!args[0]) return repondre("🎵 Please provide a TikTok video link.");

  try {
    const api = `https://api.onesytex.my.id/api/tiktok-dl=${encodeURIComponent(args.join(" "))}`;
    const { data } = await axios.get(api);
    const vid = data.data;

    await sock.sendMessage(m.jid, {
      video: { url: vid.links[0].a },
      caption: `👤 ${vid.author}\n📝 ${vid.desc}`
    }, { quoted: m });

  } catch (e) {
    repondre("❌ Failed to download TikTok video.");
  }
});

// ========== FB HELPER ==========
async function getFBInfo(url) {
  const { data } = await axios.get(`https://api.myfbdownloader.com?url=${encodeURIComponent(url)}`);
  return {
    title: data.title,
    url: data.url,
    thumbnail: data.thumbnail,
    hd: data.hd,
    sd: data.sd
  };
      }
