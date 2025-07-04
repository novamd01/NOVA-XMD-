const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { cmd } = require("../command");

cmd({
  pattern: "tourl",
  alias: ["imgtourl", "img2url", "urlbmb"],
  desc: "Convert an image to a URL using imgbb.",
  category: "utility",
  react: "🖇",
  use: ".tourl",
  filename: __filename
}, async (message, match, m, client) => {
  const { from, quoted, reply, sender } = client;

  try {
    const quotedMsg = match.quoted ? match.quoted : match;
    const mimetype = (quotedMsg.msg || quotedMsg).mimetype || "";

    if (!mimetype.startsWith("image")) {
      return reply("🌻 Please reply to an image.");
    }

    // Download the image
    const buffer = await quotedMsg.download();
    const tempPath = path.join(os.tmpdir(), "bmb_temp_image.jpg");
    fs.writeFileSync(tempPath, buffer);

    // Prepare the image for upload
    const form = new FormData();
    form.append("image", fs.createReadStream(tempPath));

    // Upload to imgbb
    const response = await axios.post(
      "https://api.imgbb.com/1/upload?key=3b4a0e1a465acac9fbbf72c8d6f791cb",
      form,
      { headers: form.getHeaders() }
    ).catch(err => {
      console.error("API ERROR:", err.response?.data || err.message);
      throw "❌ Failed to contact imgbb API.";
    });

    const imageURL = response?.data?.data?.url;

    // Delete the temporary file
    fs.unlinkSync(tempPath);

    if (!imageURL) {
      throw "❌ Failed to retrieve image URL.";
    }

    // Send success response
    await message.sendMessage(from, {
      text: `*✅ Image Uploaded Successfully*\n📎 URL: ${imageURL}`,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "𝗡𝗢𝗩𝗔-𝗫𝗠𝗗 🔥",
          serverMessageId: 100
        }
      }
    });

  } catch (error) {
    console.error("Error:", error);
    reply("⚠️ Error: " + error.toString());
  }
});
