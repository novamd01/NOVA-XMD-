const { fetchJson } = require("../lib/functions");
const { cmd } = require('../command');
const axios = require("axios");

// Shared context info for all downloads
const contextInfo = {
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363382023564830@newsletter",
    newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
    serverMessageId: 1
  }
};

// ─── MEDIAFIRE ─────────────────────────────────────────────
cmd({
  pattern: "mediafire",
  alias: ["mfire"],
  desc: "To download MediaFire files.",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) return reply("❌ Please provide a valid MediaFire link.");

    await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

    const response = await axios.get(`https://www.dark-yasiya-api.site/download/mfire?url=${q}`);
    const data = response.data;

    if (!data?.status || !data.result?.dl_link) {
      return reply("⚠️ Failed to fetch MediaFire download link. Ensure the link is valid.");
    }

    const { dl_link, fileName, fileType } = data.result;
    const file_name = fileName || "mediafire_download";
    const mime_type = fileType || "application/octet-stream";

    const caption = `╭━━━〔 *MEDIAFIRE DOWNLOADER* 〕━━━⊷\n`
      + `┃▸ *File Name:* ${file_name}\n`
      + `┃▸ *File Type:* ${mime_type}\n`
      + `╰━━━⪼\n\n`
      + `📥 *Downloading your file...*`;

    await conn.sendMessage(from, {
      document: { url: dl_link },
      mimetype: mime_type,
      fileName: file_name,
      caption,
      contextInfo
    }, { quoted: m });

  } catch (error) {
    console.error("MediaFire Error:", error);
    reply("❌ An error occurred while processing the MediaFire link.");
  }
});

// ─── APK (Aptoide) ─────────────────────────────────────────
cmd({
  pattern: "apk",
  desc: "Download APK from Aptoide.",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) return reply("❌ Please provide an app name to search.");

    await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

    const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(q)}/limit=1`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data?.datalist?.list?.length) {
      return reply("⚠️ No results found for the given app name.");
    }

    const app = data.datalist.list[0];
    const appSizeMB = (app.size / 1048576).toFixed(2);

    const caption = `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 📦 Name: ${app.name}
┣━━━━━━━━━━━━━━━━━━━━━━━
┃ 🏋 Size: ${appSizeMB} MB
┣━━━━━━━━━━━━━━━━━━━━━━━
┃ 📦 Package: ${app.package}
┣━━━━━━━━━━━━━━━━━━━━━━━
┃ 📅 Updated On: ${app.updated}
┣━━━━━━━━━━━━━━━━━━━━━━━
┃ 👨‍💻 Developer: ${app.developer.name}
┗━━━━━━━━━━━━━━━━━━━━━━━
🔗 Powered by 𝗡𝗢𝗩𝗔-𝗫𝗠𝗗`;

    await conn.sendMessage(from, {
      image: { url: app.icon },
      caption
    }, { quoted: m });

    await conn.sendMessage(from, {
      document: { url: app.file.path_alt },
      fileName: `${app.name}.apk`,
      mimetype: "application/vnd.android.package-archive",
      contextInfo
    }, { quoted: m });

  } catch (error) {
    console.error("APK Error:", error);
    reply("❌ An error occurred while fetching the APK.");
  }
});

// ─── GOOGLE DRIVE ──────────────────────────────────────────
cmd({
  pattern: "gdrive",
  desc: "Download Google Drive files.",
  react: "🌐",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) return reply("❌ Please provide a valid Google Drive link.");

    await conn.sendMessage(from, { react: { text: "⬇️", key: m.key } });

    const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`;
    const response = await axios.get(apiUrl);
    const result = response.data.result;

    if (!result?.downloadUrl) {
      return reply("⚠️ No download URL found. Please check the link.");
    }

    await conn.sendMessage(from, {
      document: { url: result.downloadUrl },
      mimetype: result.mimetype,
      fileName: result.fileName,
      caption: "*© Powered By 𝗡𝗢𝗩𝗔-𝗫𝗠𝗗*",
      contextInfo
    }, { quoted: m });

  } catch (error) {
    console.error("GDrive Error:", error);
    reply("❌ An error occurred while fetching the Google Drive file.");
  }
});
