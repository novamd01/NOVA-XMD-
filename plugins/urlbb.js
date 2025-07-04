const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { cmd } = require("../command");

cmd({
  pattern: "tourl",
  alias: ["imgtourl", "img2url", "urlbb"],
  react: "🖇",
  desc: "Convert an image to a URL using your own API.",
  category: "utility",
  use: ".tourl",
  filename: __filename
}, async (_0x2a615f, _0x296ebb, _0x131287, _0x46c0dd) => {
  const { from: _0x462e92, quoted: _0x38fbf1, reply: _0x74c833, sender: _0x5931e7 } = _0x46c0dd;

  try {
    const _0x2fc0f4 = _0x296ebb.quoted ? _0x296ebb.quoted : _0x296ebb;
    const _0x4dd0ec = (_0x2fc0f4.msg || _0x2fc0f4).mimetype || '';

    if (!_0x4dd0ec.startsWith("image")) {
      throw "🌻 Please reply to an image.";
    }

    const _0x227cf8 = await _0x2fc0f4.download();
    const _0x18c2b8 = path.join(os.tmpdir(), "temp_image.jpg");
    fs.writeFileSync(_0x18c2b8, _0x227cf8);

    const _0x1bf672 = new FormData();
    _0x1bf672.append("image", fs.createReadStream(_0x18c2b8));

    // ✅ NEW API
    const _0x338f64 = await axios.post("https://b-m-b-api-code.onrender.com/api/upload", _0x1bf672, {
      headers: _0x1bf672.getHeaders()
    });

    fs.unlinkSync(_0x18c2b8);

    const _0x2b12b1 = _0x338f64.data?.url;
    if (!_0x2b12b1) {
      throw "❌ Failed to upload image or get URL.";
    }

    const _0x273817 = {
      mentionedJid: [_0x5931e7],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363382023564830@newsletter",
        newsletterName: "𝗡𝗢𝗩𝗔-𝗫𝗠𝗗 🔥",
        serverMessageId: 143
      }
    };

    await _0x2a615f.sendMessage(_0x462e92, {
      text: `*✅ Image Uploaded Successfully 📸*\n\n🔗 URL:\n${_0x2b12b1}`,
      contextInfo: _0x273817
    });

  } catch (_0x5db687) {
    _0x74c833("❌ Error: " + _0x5db687);
    console.error("Upload Error:", _0x5db687);
  }
});
