const { cmd } = require("../command");

cmd({
  pattern: "setpp",
  alias: ["setbotpic"],
  desc: "Set bot profile picture (compatible with baileys-pro)",
  category: "owner",
  filename: __filename
}, async (zk, m, msg, { isCreator, reply }) => {
  if (!isCreator) return reply("❌ Owner only.");

  if (!m.quoted || !/image/.test(m.quoted.mtype)) {
    return reply("⚠️ Reply to an image to set as bot profile picture.");
  }

  try {
    const media = await zk.downloadMediaMessage(m.quoted);
    if (!media) return reply("❌ Failed to download image.");

    // Hii ndio njia ya msingi kabisa kufanya setpp (inayofanya kazi kwenye baileys-pro)
    await zk.query({
      tag: 'iq',
      attrs: {
        to: zk.user.id,
        type: 'set',
        xmlns: 'w:profile:picture'
      },
      content: [{
        tag: 'picture',
        attrs: { type: 'image' },
        content: media
      }]
    });

    await reply("✅ Profile picture updated successfully.");
  } catch (e) {
    console.error("SETPP ERROR:", e);
    return reply("❌ Error: " + (e?.message || e));
  }
});
