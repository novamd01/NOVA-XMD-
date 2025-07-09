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
  pattern: "check",
  desc: "Checks the country calling code and returns the corresponding country name(s) with flag",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
  try {
    let code = args[0];
    if (!code) return reply("❌ Please provide a country code. Example: `.check 255`");

    code = code.replace(/\+/g, '');

    const url = "https://restcountries.com/v3.1/all";
    const { data } = await axios.get(url);

    const matchingCountries = data.filter(country => {
      if (
        country.idd &&
        country.idd.root &&
        country.idd.suffixes &&
        country.idd.suffixes.length
      ) {
        return country.idd.suffixes.some(suffix => {
          const fullCode = country.idd.root.replace('+', '') + suffix;
          return fullCode === code;
        });
      }
      return false;
    });

    const jid = m.sender;

    if (matchingCountries.length > 0) {
      const countryNames = matchingCountries
        .map(country => `${getFlagEmoji(country.cca2)} ${country.name.common}`)
        .join("\n");

      await conn.sendMessage(from, {
        text: `✅ *Country Code:* ${code}\n🌍 *Countries:*\n${countryNames}\n\n👤 *JID:* ${jid}`,
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
