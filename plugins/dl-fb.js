const { cmd } = require("../command");

// ======== FB HD ========== //
cmd({
  pattern: "fb",
  alias: [],
  desc: "Download Facebook video (HD quality)",
  category: "download",
  use: "<facebook video link>",
  reaction: "📽️"
}, async (zk, m, msg, { args, reply }) => {
  if (!args[0]) return reply("Insert a public Facebook video link!");

  const queryURL = args.join(" ");
  try {
    getFBInfo(queryURL)
      .then(async (result) => {
        const caption = `🎬 *Title:* ${result.title}\n🔗 *Link:* ${result.url}`;
        await zk.sendMessage(m.chat, {
          image: { url: result.thumbnail },
          caption
        }, { quoted: m });

        await zk.sendMessage(m.chat, {
          video: { url: result.hd },
          caption: "✅ Facebook HD video downloader\n🔧 Powered by B.M.B TECH"
        }, { quoted: m });
      })
      .catch((error) => {
        console.error("Error:", error);
        reply("⚠️ Try using *fb2* on this link.");
      });
  } catch (error) {
    console.error("Video download error:", error);
    reply("❌ An error occurred while downloading the video.");
  }
});

// ======== FB SD (fb2) ========== //
cmd({
  pattern: "fb2",
  alias: [],
  desc: "Download Facebook video (SD quality)",
  category: "download",
  use: "<facebook video link>",
  reaction: "📽️"
}, async (zk, m, msg, { args, reply }) => {
  if (!args[0]) return reply("Insert a public Facebook video link!");

  const queryURL = args.join(" ");
  try {
    getFBInfo(queryURL)
      .then(async (result) => {
        const caption = `🎬 *Title:* ${result.title}\n🔗 *Link:* ${result.url}`;
        await zk.sendMessage(m.chat, {
          image: { url: result.thumbnail },
          caption
        }, { quoted: m });

        await zk.sendMessage(m.chat, {
          video: { url: result.sd },
          caption: "📥 Facebook SD video downloader\n🔧 Powered by B.M.B TECH"
        }, { quoted: m });
      })
      .catch((error) => {
        console.error("Error:", error);
        reply("❌ Failed: " + (error.message || error));
      });
  } catch (error) {
    console.error("Video download error:", error);
    reply("❌ An error occurred while downloading the video.");
  }
});
