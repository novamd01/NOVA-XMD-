const axios = require("axios");
const { cmd } = require("../command");


cmd({
    pattern: "logo",
    alias: ["logomenu"],
    desc: "menu the bot",
    category: "menu",
    react: "🎀",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `*╭───❍「 LOGO 𝖫𝖨𝖲𝖳 」❍*
‎*├⬡ .ɴᴇᴏɴʟɪɢʜᴛ*
‎*├⬡ .ʙʟᴀᴄᴋᴘɪɴᴋ*
‎*├⬡ .ᴅʀᴀɢᴏɴʙᴀʟʟ*
‎*├⬡ .𝟹ᴅᴄᴏᴍɪᴄ*
‎*├⬡ .ᴀᴍᴇʀɪᴄᴀ*
‎*├⬡ .ɴᴀʀᴜᴛᴏ*
‎*├⬡ .sᴀᴅɢɪʀʟ*
‎*├⬡ .ᴄʟᴏᴜᴅs*
‎*├⬡ .ғᴜᴛᴜʀɪsᴛɪᴄ*
‎*├⬡ .𝟹ᴅᴘᴀᴘᴇʀ*
‎*├⬡ .ᴇʀᴀsᴇʀ*
‎*├⬡ .sᴜɴsᴇᴛ*
‎*├⬡ .ʟᴇᴀғ*
‎*├⬡ .ɢᴀʟᴀxʏ*
‎*├⬡ .sᴀɴs*
‎*├⬡ .ʙᴏᴏᴍ*
‎*├⬡ .ʜᴀᴄᴋᴇʀ*
‎*├⬡ .ᴅᴇᴠɪʟᴡɪɴɢs*
‎*├⬡ .ɴɪɢᴇʀɪᴀ*
‎*├⬡ .ʙᴜʟʙ*
‎*├⬡ .ᴀɴɢᴇʟᴡɪɴɢs*
‎*├⬡ .ᴢᴏᴅɪᴀᴄ*
‎*├⬡ .ʟᴜxᴜʀʏ*
‎*├⬡ .ᴘᴀɪɴᴛ*
‎*├⬡ .ғʀᴏᴢᴇɴ*
‎*├⬡ .ᴄᴀsᴛʟᴇ*
‎*├⬡ .ᴛᴀᴛᴏᴏ*
‎*├⬡ .ᴠᴀʟᴏʀᴀɴᴛ*
‎*├⬡ .ʙᴇᴀʀ*
‎*├⬡ .ᴛʏᴘᴏɢʀᴀᴘʜʏ*
‎*├⬡ .ʙɪʀᴛʜᴅᴀʏ*
‎*╰───────────────❍*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://github.com/novaxmd/BMB-DATA/raw/refs/heads/main/image/allmenu.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363382023564830@newsletter',
                        newsletterName: "𝗡𝗢𝗩𝗔-𝗫𝗠𝗗  𝐋𝐎𝐆𝐎 𝐌𝐄𝐍𝐔🧸₊",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
