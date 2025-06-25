const {
  cmd
} = require("../command");
const {
  ytsearch
} = require("@dark-yasiya/yt-dl.js");
cmd({
  'pattern': "mp4",
  'alias': ["video"],
  'react': '🎥',
  'desc': "Download YouTube video",
  'category': "main",
  'use': ".mp4 < Yt url or Name >",
  'filename': __filename
}, async (_0x2468c4, _0x1f2068, _0x5d2c6c, {
  from: _0xb75264,
  prefix: _0x2e0deb,
  quoted: _0x260d33,
  q: _0x5d468e,
  reply: _0x5af746
}) => {
  try {
    if (!_0x5d468e) {
      return await _0x5af746("Please provide a YouTube URL or video name.");
    }
    const _0x16c93d = await ytsearch(_0x5d468e);
    if (_0x16c93d.results.length < 0x1) {
      return _0x5af746("No results found!");
    }
    let _0x2842b1 = _0x16c93d.results[0x0];
    let _0x41adb4 = "https://apis.davidcyriltech.my.id/download/ytmp4?url=" + encodeURIComponent(_0x2842b1.url);
    let _0x1d1d99 = await fetch(_0x41adb4);
    let _0x4891b3 = await _0x1d1d99.json();
    if (_0x4891b3.status !== 0xc8 || !_0x4891b3.success || !_0x4891b3.result.download_url) {
      return _0x5af746("Failed to fetch the video. Please try again later.");
    }
    let _0x3ffaca = "📹 *Video Downloader*\n🎬 *Title:* " + _0x2842b1.title + "\n⏳ *Duration:* " + _0x2842b1.timestamp + "\n👀 *Views:* " + _0x2842b1.views + "\n👤 *Author:* " + _0x2842b1.author.name + "\n🔗 *Link:* " + _0x2842b1.url + "\n> Powered By NOVA TECH ☣️";
    await _0x2468c4.sendMessage(_0xb75264, {
      'video': {
        'url': _0x4891b3.result.download_url
      },
      'caption': _0x3ffaca,
      'mimetype': "video/mp4"
    }, {
      'quoted': _0x1f2068
    });
  } catch (_0x22b4da) {
    console.log(_0x22b4da);
    _0x5af746("An error occurred. Please try again later.");
  }
});
cmd({
  'pattern': 'song',
  'alias': ["play", 'mp3'],
  'react': '🎶',
  'desc': "Download YouTube song",
  'category': "main",
  'use': ".song <query>",
  'filename': __filename
}, async (_0x12937d, _0x17df40, _0x426a8c, {
  from: _0x38f316,
  sender: _0x2119a1,
  reply: _0xbb6020,
  q: _0x47856f
}) => {
  try {
    if (!_0x47856f) {
      return _0xbb6020("Please provide a song name or YouTube link.");
    }
    const _0x234bf6 = await ytsearch(_0x47856f);
    if (!_0x234bf6.results.length) {
      return _0xbb6020("No results found!");
    }
    const _0x5993e2 = _0x234bf6.results[0x0];
    const _0x42807a = "https://apis.davidcyriltech.my.id/youtube/mp3?url=" + encodeURIComponent(_0x5993e2.url);
    const _0x5d4ff6 = await fetch(_0x42807a);
    const _0x378836 = await _0x5d4ff6.json();
    if (!_0x378836?.["result"]?.["downloadUrl"]) {
      return _0xbb6020("Download failed. Try again later.");
    }
    await _0x12937d.sendMessage(_0x38f316, {
      'audio': {
        'url': _0x378836.result.downloadUrl
      },
      'mimetype': "audio/mpeg",
      'fileName': _0x5993e2.title + ".mp3",
      'contextInfo': {
        'externalAdReply': {
          'title': _0x5993e2.title.length > 0x19 ? _0x5993e2.title.substring(0x0, 0x16) + "..." : _0x5993e2.title,
          'body': "Join our WhatsApp Channel",
          'mediaType': 0x1,
          'thumbnailUrl': _0x5993e2.thumbnail.replace("default.jpg", 'hqdefault.jpg'),
          'sourceUrl': "https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z",
          'mediaUrl': "https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z",
          'showAdAttribution': true,
          'renderLargerThumbnail': true
        }
      }
    }, {
      'quoted': _0x17df40
    });
  } catch (_0x1bf927) {
    console.error(_0x1bf927);
    _0xbb6020("An error occurred. Please try again.");
  }
});