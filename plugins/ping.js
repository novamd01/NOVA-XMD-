const config = require("../config");
const { cmd } = require("../command");

cmd({
  pattern: "ping",
  alias: ["speed", "pong"],
  use: ".ping",
  desc: "Check bot's response time.",
  category: "main",
  react: "🔥",
  filename: __filename
}, async (conn, mek, m, { from, quoted, sender, reply }) => {
  try {
    const start = Date.now();

    const speedIcons = ['✅', '🟢', '✨', '📶', '🔋'];
    const quotes = [
      "✨Stay foolish to stay sane.✨",
      "🟢The only way to do great work is to love what you do.🎀",
      "❤️Simplicity is the ultimate sophistication.💞",
      "🤔Your time is limited, so don’t waste it living someone else’s life.🥹",
      "✅Innovation distinguishes between a leader and a follower📊.",
      "📆Strive for greatness.🟢"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const end = Date.now();
    const speed = end - start;

    let status = "Stable";
    if (speed > 1000) {
      status = "Faster🔥";
    } else if (speed > 500) {
      status = "Moderate";
    }

    // Try to get profile picture
    let pfp;
    try {
      pfp = await conn.profilePictureUrl(sender, "image");
    } catch {
      pfp = "https://files.catbox.moe/v5we38.jpg";
    }

    // Compose message
    const message = `
┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🤖 *Bot Name:* ${config.botname || "𝗡𝗢𝗩𝗔-𝗫𝗠𝗗"}
┣━━━━━━━━━━━━━━━━━━━━━━━
┃ ⚡ *Speed:* ${speedIcons[Math.floor(Math.random() * speedIcons.length)]} ${speed}ms
┣━━━━━━━━━━━━━━━━━━━━━━━ 
┃ 📶 *Status:* ${speedIcons[Math.floor(Math.random() * speedIcons.length)]} ${status}
┣━━━━━━━━━━━━━━━━━━━━━━━
┃ ⏱️ *Checked At:* ${new Date().toLocaleTimeString()}
┗━━━━━━━━━━━━━━━━━━━━━━━┛
*${randomQuote}*
    `.trim();

    // Send final response
    await conn.sendMessage(from, {
      image: { url: pfp },
      caption: message,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "𝗡𝗢𝗩𝗔-𝗫𝗠𝗗",
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (err) {
    console.error("Error in ping command:", err);
    reply("An error occurred: " + err.message);
  }
});
