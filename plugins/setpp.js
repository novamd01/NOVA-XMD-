cmd({
  pattern: "setpp",
  desc: "Set bot profile pic",
  category: "owner",
  filename: __filename
}, async (zk, m, msg, { isCreator, reply }) => {
  if (!isCreator) return reply("⛔ Owner only!");

  if (!m.quoted || !/image/.test(m.quoted.mtype)) {
    return reply("⚠️ Reply to an image.");
  }

  try {
    const imageBuffer = await zk.downloadMediaMessage(m.quoted);
    if (!imageBuffer || imageBuffer.length < 1000) return reply("🚫 Image is invalid or too small.");

    await zk.updateProfilePicture(zk.user.id, imageBuffer);

    return await reply("✅ Bot profile picture updated successfully.");
  } catch (e) {
    console.error(e);
    return reply("❌ Error: " + e.message);
  }
});
