const { cmd } = require("../command");

const countries = [
  { name: "Afghanistan", code: "AF", calling_code: "93" },
  { name: "Albania", code: "AL", calling_code: "355" },
  { name: "Algeria", code: "DZ", calling_code: "213" },
  { name: "Andorra", code: "AD", calling_code: "376" },
  { name: "Angola", code: "AO", calling_code: "244" },
  { name: "Argentina", code: "AR", calling_code: "54" },
  { name: "Australia", code: "AU", calling_code: "61" },
  { name: "Brazil", code: "BR", calling_code: "55" },
  { name: "Canada", code: "CA", calling_code: "1" },
  { name: "China", code: "CN", calling_code: "86" },
  { name: "France", code: "FR", calling_code: "33" },
  { name: "Germany", code: "DE", calling_code: "49" },
  { name: "India", code: "IN", calling_code: "91" },
  { name: "Kenya", code: "KE", calling_code: "254" },
  { name: "Nigeria", code: "NG", calling_code: "234" },
  { name: "South Africa", code: "ZA", calling_code: "27" },
  { name: "Tanzania", code: "TZ", calling_code: "255" },
  { name: "Uganda", code: "UG", calling_code: "256" },
  { name: "United Kingdom", code: "GB", calling_code: "44" },
  { name: "United States", code: "US", calling_code: "1" }
];

function getFlagEmoji(countryCode) {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .split("")
    .map(c => String.fromCodePoint(c.charCodeAt(0) + 127397))
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
    if (!code) return reply("❌ Please provide a country calling code. Example: `.check 254`");

    code = code.replace(/\+/g, '').trim();

    const foundCountries = countries.filter(c => c.calling_code === code);

    if (foundCountries.length > 0) {
      const list = foundCountries.map(c => `${getFlagEmoji(c.code)} ${c.name}`).join("\n");
      return reply(`✅ Country Code: ${code}\n🌍 Countries:\n${list}`);
    } else {
      return reply(`❌ No countries found with the calling code ${code}`);
    }
  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while processing your request.");
  }
});
