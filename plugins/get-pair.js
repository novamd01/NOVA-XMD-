const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
  pattern: "pair",
  alias: ["getpair", "code"],
  react: "✅",
  desc: "Get pairing code for 𝗡𝗢𝗩𝗔-𝗫𝗠𝗗 bot",
  category: "download",
  use: ".pair 255767862457",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply }) => {
  try {
    const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

    if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
      return await reply("❌ Please provide a valid phone number without `+`\nExample: `.pair 255767`");
    }

    const response = await axios.get(`https://session-bmb-code.onrender.com/code?number=${encodeURIComponent(phoneNumber)}`);

    if (!response.data || !response.data.code) {
      return await reply("❌ Failed to retrieve pairing code. Please try again later.");
    }

    const pairingCode = response.data.code;
    const messageText = `> *𝗡𝗢𝗩𝗔-𝗫𝗠𝗗 PAIRING COMPLETED*\n\n*Your pairing code is:* ${pairingCode}`;

    await conn.sendMessage(from, {
      text: messageText,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        mentionedJid: [m.sender],
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
          serverMessageId: 1
        }
      }
    }, { quoted: mek });

    await new Promise(resolve => setTimeout(resolve, 2000));

    await conn.sendMessage(from, {
      text: `${pairingCode}`,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        mentionedJid: [m.sender],
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
          serverMessageId: 1
        }
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("Pair command error:", error);
    await reply("❌ An error occurred while getting pairing code. Please try again later.");
  }
});
