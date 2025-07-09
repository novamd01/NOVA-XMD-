const axios = require("axios");
const { cmd } = require("../command");

function getFlagEmoji(countryCode) {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .split("")
    .map(letter => String.fromCodePoint(letter.charCodeAt(0) + 127397))
    .join("");
}

cmd({
  pattern: "check1",
  desc: "Checks the country calling code and returns the corresponding country name(s) with flag",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
  try {
    let code = args[0];
    if (!code) return reply("❌ Please provide a country code. Example: `.check 255`");

    // Toa alama ya +
    code = code.replace(/\+/g, '');

    // Tumia API yako ya render
    const apiUrl = `https://country-code-tefd.onrender.com/check/${code}`;
    const { data } = await axios.get(apiUrl);

    const jid = m.sender;

    if (data && Array.isArray(data) && data.length > 0) {
      const countryList = data
        .map(country => `${getFlagEmoji(country.code)} ${country.name}`)
        .join("\n");

      await conn.sendMessage(from, {
        text: `✅ *Country Code:* ${code}\n🌍 *Countries:*\n${countryList}\n\n👤 *JID:* ${jid}`,
        contextInfo: {
          mentionedJid: [jid],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363382023564830@newsletter",
            newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
            serverMessageId: 1
          }
        }
      }, { quoted: mek });
    } else {
      reply(`❌ No country found for the code ${code}.\n👤 *JID:* ${jid}`);
    }

  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while checking the country code.");
  }
});
