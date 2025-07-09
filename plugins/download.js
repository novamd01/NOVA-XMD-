const { fetchJson } = require("../lib/functions"); const { downloadTiktok } = require("@mrnima/tiktok-downloader"); const { facebook } = require("@mrnima/facebook-downloader"); const cheerio = require("cheerio"); const { igdl } = require("ruhend-scraper"); const axios = require("axios"); const { cmd, commands } = require('../command');

const newsletterContext = { contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: "120363382023564830@newsletter", newsletterName: "𝔹.𝔽.𝔹-𝜭𝜭𝔻", serverMessageId: 1 } } };

cmd({ pattern: "mediafire", alias: ["mfire"], desc: "To download MediaFire files.", react: "🎥", category: "download", filename: __filename }, async (conn, m, store, { from, quoted, q, reply }) => { try { if (!q) return reply("\u274c Please provide a valid MediaFire link.");

await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

const response = await axios.get(`https://www.dark-yasiya-api.site/download/mfire?url=${q}`);
const data = response.data;

if (!data || !data.status || !data.result || !data.result.dl_link) {
  return reply("\u26a0\ufe0f Failed to fetch MediaFire download link. Ensure the link is valid and public.");
}

const { dl_link, fileName, fileType } = data.result;
const file_name = fileName || "mediafire_download";
const mime_type = fileType || "application/octet-stream";

await conn.sendMessage(from, { react: { text: "⬆️", key: m.key } });

const caption = `║★ MEDIAFIRE DOWNLOADER ★

║ File Name: ${file_name} ║ File Type: ${mime_type} ║ \n\n📅 Downloading your file...`;

await conn.sendMessage(from, {
  document: { url: dl_link },
  mimetype: mime_type,
  fileName: file_name,
  caption
}, { quoted: m, ...newsletterContext });

} catch (error) { console.error("Error:", error); reply("\u274c An error occurred while processing your request. Please try again."); } });

cmd({ pattern: "apk", desc: "Download APK from Aptoide.", category: "download", filename: __filename }, async (conn, m, store, { from, quoted, q, reply }) => { try { if (!q) return reply("\u274c Please provide an app name to search.");

await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(q)}/limit=1`;
const response = await axios.get(apiUrl);
const data = response.data;

if (!data || !data.datalist || !data.datalist.list.length) {
  return reply("\u26a0\ufe0f No results found for the given app name.");
}

const app = data.datalist.list[0];
const appSizeMB = (app.size / 1048576).toFixed(2);

const caption = `╔═══ [ APK Downloader ] ═══╗\n║ 📦 Name: ${app.name}\n╟ 🂳 Size: ${appSizeMB} MB\n╟ 📦 Package: ${app.package}\n╟ 🗓 Updated On: ${app.updated}\n╟ 👨‍💼 Developer: ${app.developer.name}\n╚══════════════════╝\n\n🔗 Powered by NOVA-XMD`;

await conn.sendMessage(from, {
  image: { url: app.icon },
  caption
}, { quoted: m, ...newsletterContext });

await conn.sendMessage(from, {
  document: { url: app.file.path_alt },
  fileName: `${app.name}.apk`,
  mimetype: "application/vnd.android.package-archive",
}, { quoted: m, ...newsletterContext });

await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

} catch (error) { console.error("Error:", error); reply("\u274c An error occurred while fetching the APK. Please try again."); } });

cmd({ pattern: "gdrive", desc: "Download Google Drive files.", react: "🌐", category: "download", filename: __filename }, async (conn, m, store, { from, quoted, q, reply }) => { try { if (!q) return reply("\u274c Please provide a valid Google Drive link.");

await conn.sendMessage(from, { react: { text: "⬇️", key: m.key } });

const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`;
const response = await axios.get(apiUrl);
const downloadUrl = response.data.result.downloadUrl;

if (downloadUrl) {
  await conn.sendMessage(from, { react: { text: "⬆️", key: m.key } });

  await conn.sendMessage(from, {
    document: { url: downloadUrl },
    mimetype: response.data.result.mimetype,
    fileName: response.data.result.fileName,
    caption: "*\u00a9 Powered By ＮＯＶＡ-ＸＭＤ*"
  }, { quoted: m, ...newsletterContext });

  await conn.sendMessage(from, { react: { text: "✅", key: m.key } });
} else {
  return reply("\u26a0\ufe0f No download URL found. Please check the link and try again.");
}

} catch (error) { console.error("Error:", error); reply("\u274c An error occurred while fetching the Google Drive file. Please try again."); } });

  
