const { cmd } = require("../command");

cmd({
  pattern: "getpp1",
  alias: ["pp", "profilepic"],
  desc: "Get profile picture of replied user",
  category: "general",
  reaction: "📷"
}, async (zk, m, msg, { reply }) => {
  if (!m.quoted) {
    return reply("❌ Please reply to someone's message to get their profile picture.");
  }

  const target = m.quoted.sender;

  try {
    // Try fetching profile pic
    let pfp = await zk.profilePictureUrl(target, "image");

    await zk.sendMessage(m.chat, {
      image: { url: pfp },
      caption: `📸 *Profile pic of @${target.split("@")[0]}*`,
      mentions: [target]
    }, { quoted: m });

  } catch (err) {
    // If locked or error, fallback image
    await reply(`⚠️ Couldn't fetch profile picture. Maybe it's private.\nSending default image.`);

    let fallback = "https://telegra.ph/file/74d920a5a9f45b9bcb2a9.jpg"; // bad fallback pic
    await zk.sendMessage(m.chat, {
      image: { url: fallback },
      caption: `📸 *Default pic since @${target.split("@")[0]}'s pic is locked*`,
      mentions: [target]
    }, { quoted: m });
  }
});
