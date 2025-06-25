const {
  cmd
} = require('../command');
const axios = require('axios');
cmd({
  'pattern': "img",
  'alias': ['image', 'googleimage', "searchimg"],
  'react': '🦋',
  'desc': "Search and download Google images",
  'category': "fun",
  'use': ".img <keywords>",
  'filename': __filename
}, async (_0xe2183a, _0x11a861, _0x96d883, {
  reply: _0x399465,
  args: _0x2d31ef,
  from: _0x47c06a
}) => {
  try {
    const _0x1b6e3c = _0x2d31ef.join(" ");
    if (!_0x1b6e3c) {
      return _0x399465("🖼️ Please provide a search query\nExample: .img cute cats");
    }
    await _0x399465("🔍 Searching images for \"" + _0x1b6e3c + "\"...");
    const _0x2b5938 = "https://apis.davidcyriltech.my.id/googleimage?query=" + encodeURIComponent(_0x1b6e3c);
    const _0x3bc4fd = await axios.get(_0x2b5938);
    if (!_0x3bc4fd.data?.["success"] || !_0x3bc4fd.data.results?.['length']) {
      return _0x399465("❌ No images found. Try different keywords");
    }
    const _0x16b53a = _0x3bc4fd.data.results;
    const _0x2885d9 = _0x16b53a.sort(() => 0.5 - Math.random()).slice(0x0, 0x5);
    for (const _0xf94639 of _0x2885d9) {
      await _0xe2183a.sendMessage(_0x47c06a, {
        'image': {
          'url': _0xf94639
        },
        'caption': "📷 Result for: " + _0x1b6e3c + "\n> © Powered by 𝙽𝙾𝚅𝙰-𝚇𝙼𝙳"
      }, {
        'quoted': _0x11a861
      });
      await new Promise(_0x5cefc7 => setTimeout(_0x5cefc7, 0x3e8));
    }
  } catch (_0xdd5fc6) {
    console.error("Image Search Error:", _0xdd5fc6);
    _0x399465("❌ Error: " + (_0xdd5fc6.message || "Failed to fetch images"));
  }
});