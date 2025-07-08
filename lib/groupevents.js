const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');

const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363382023564830@newsletter',
            newsletterName: 'NOVA-XMD',
            serverMessageId: 143,
        },
    };
};

const ppUrls = ['', '', '', ''];

const GroupEvents = async (conn, update) => {
    try {
        const isGroup = isJidGroup(update.id);
        if (!isGroup) return;

        const metadata = await conn.groupMetadata(update.id);
        const participants = update.participants;
        const desc = metadata.desc || "No Description";
        const groupMembersCount = metadata.participants.length;

        for (const num of participants) {
            const userName = num.split("@")[0];
            const timestamp = new Date().toLocaleString();

            let ppUrl;
            try {
                ppUrl = await conn.profilePictureUrl(num, 'image');
            } catch {
                ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
            }

            if (update.action === "add" && config.WELCOME === "true") {
                const WelcomeText =
                    `┏━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 👋 Welcome @${userName}\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 🏠 Group: *${metadata.subject}*\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 🧑 Member No: ${groupMembersCount}\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 🕒 Joined: ${timestamp}\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 📜 Description:\n` +
                    `┃ ${desc}\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 🤖 Powered by ${config.BOT_NAME}\n` +
                    `┗━━━━━━━━━━━━━━━━━━━━━━━`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: WelcomeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "remove" && config.WELCOME === "true") {
                const GoodbyeText =
                    `┏━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 😔 Goodbye @${userName}\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 🕒 Time: ${timestamp}\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 👥 Members Left: ${groupMembersCount}\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 🤖 ${config.BOT_NAME} says bye!\n` +
                    `┗━━━━━━━━━━━━━━━━━━━━━━━`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: GoodbyeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "demote" && config.ADMIN_EVENTS === "true") {
                const demoter = update.author.split("@")[0];
                const DemoteText =
                    `┏━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 📉 Admin Event\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 👤 @${demoter} demoted @${userName}\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 🕒 ${timestamp}\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 📛 Group: ${metadata.subject}\n` +
                    `┗━━━━━━━━━━━━━━━━━━━━━━━`;

                await conn.sendMessage(update.id, {
                    text: DemoteText,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });

            } else if (update.action === "promote" && config.ADMIN_EVENTS === "true") {
                const promoter = update.author.split("@")[0];
                const PromoteText =
                    `┏━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 📈 Admin Event\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 👤 @${promoter} promoted @${userName}\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 🕒 ${timestamp}\n` +
                    `┣━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `┃ 📛 Group: ${metadata.subject}\n` +
                    `┗━━━━━━━━━━━━━━━━━━━━━━━`;

                await conn.sendMessage(update.id, {
                    text: PromoteText,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });
            }
        }
    } catch (err) {
        console.error('Group event error:', err);
    }
};

module.exports = GroupEvents;
