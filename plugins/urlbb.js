const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");
const FormData = require("form-data");
const { cmd } = require("../command");

cmd({
  pattern: "urlbb",
  alias: ["imgtourl", "img2url"],
  desc: "Upload image and get a public URL.",
  category: "utility",
  use: ".tourl",
  filename: __filename
}, async (msg, match, m, client) => {
  const { from, quoted, reply, sender } = client;

  try {
    const target = match.quoted || match;
    const mimetype = (target.msg || target).mimetype || "";

    if (!mimetype.startsWith("image")) {
      return reply("⚠️ Please reply to an image.");
    }

    // Download the image
    const buffer = await target.download();
    const tempPath = path.join(os.tmpdir(), "upload.jpg");
    fs.writeFileSync(tempPath, buffer);

    // Prepare the form
    const form = new FormData();
    form.append("image", fs.createReadStream(tempPath));

    // Send to your Render API
    const res = await axios.post(
      "https://b-m-b-api-code.onrender.com/api/upload",
      form,
      { headers: form.getHeaders() }
    );

    fs.unlinkSync(tempPath);

    const imageURL = res.data.url;

    if (!imageURL) throw "❌ Failed to retrieve uploaded image URL.";

    // Send response
    await msg.sendMessage(from, {
      text: `✅ *Image Uploaded Successfully:*\n📎 ${imageURL}`,
      contextInfo: {
        mentionedJid: [sender]
      }
    });

  } catch (err) {
    console.error("❌ Upload Error:", err);
    reply("❌ Upload failed: " + err.toString());
  }
});
