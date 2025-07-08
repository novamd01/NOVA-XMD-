const { cmd } = require("../command");

cmd({
  pattern: "getpp1",
  alias: [],
  desc: "Get profile picture of replied user",
  category: "General",
  use: "",
  filename: __filename
}, async (zk, m, msg, { reply }) => {
  if (!m.quoted) {
    return reply("❌ Reply to a user's message to get their profile picture.");
  }

  const userJid = m.quoted.sender;

  let profilePic;
  try {
    profilePic = await zk.profilePictureUrl(userJid, 'image');
  } catch {
    profilePic = "https://i.ibb.co/sR0p7p6/default.jpg"; // fallback image
    await reply("❗ Couldn't fetch user's profile picture. Sending default image.");
  }

  await zk.sendMessage(m.chat, {
    image: { url: profilePic },
    caption: `✅ Here's @${userJid.split('@')[0]}'s profile pic.`,
    mentions: [userJid]
  }, { quoted: m });
});
