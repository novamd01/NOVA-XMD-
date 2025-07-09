const axios = require("axios");
const { cmd } = require("../command");

function getFlagEmoji(code) {
  return code
    .toUpperCase()
    .split("")
    .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

cmd({
  pattern: "check",
  desc: "Checks country name from code",
  category: "utility",
  filename: __filename
}, async (conn, m, msg, { from, args, reply }) => {
  try {
    let code = args[0];
    if (!code) return reply("❌ Example: .check 255");

    code = code.replace(/\+/g, "");

    const { data } = await axios.get("https://restcountries.com/v3.1/all");

    const results = data.filter(c => {
      if (!c.idd?.root || !c.idd?.suffixes) return false;
      return c.idd.suffixes.some(suffix =>
        (c.idd.root + suffix).replace(/\+/g, "") === code
      );
    });

    if (!results.length) return reply(`❌ No country found for code ${code}`);

    const output = results
      .map(c => `${getFlagEmoji(c.cca2)} ${c.name.common}`)
      .join("\n");

    reply(`✅ *Code:* ${code}\n🌍 *Country(s):*\n${output}`);
  } catch (e) {
    console.error("CHECK ERROR:", e);
    reply("❌ Error occurred. API might be unreachable.");
  }
});
