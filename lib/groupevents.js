// Give Me Credit If Using This File Give Me Credit On Your Channel ✅

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
                ppUrl = await conn.profilePictureUrl(num, 'image'); // TUMIA PICHA YA MTUMIAJI
            } catch {
                ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
            }

            const BOX_HEADER = `╭══🧊⌨︎ ${config.BOT_NAME} ⌨︎🧊*\n` +
                               `*┃\n`;
            const BOX_FOOTER = `*┃\n*╰════════════════⊷`;

            if (update.action === "add" && config.WELCOME === "true") {
                const WelcomeText =
                    `${BOX_HEADER}` +
                    `*┃ 👋 Welcome @${userName} to *${metadata.subject}*\n` +
                    `*┃ 🧑 Member no: ${groupMembersCount}\n` +
                    `*┃ 🕒 Joined: ${timestamp}\n` +
                    `*┃ 📜 Description:\n` +
                    `*┃ ${desc}\n` +
                    `*┃ 🤖 Powered by ${config.BOT_NAME}\n` +
                    `${BOX_FOOTER}`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: WelcomeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "remove" && config.WELCOME === "true") {
                const GoodbyeText =
                    `${BOX_HEADER}` +
                    `*┃ 😔 Goodbye @${userName}\n` +
                    `*┃ 🕒 Time: ${timestamp}\n` +
                    `*┃ 👥 Members left: ${groupMembersCount}\n` +
                    `*┃ 🤖 ${config.BOT_NAME} says bye!\n` +
                    `${BOX_FOOTER}`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: GoodbyeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "demote" && config.ADMIN_EVENTS === "true") {
                const demoter = update.author.split("@")[0];
                const DemoteText =
                    `${BOX_HEADER}` +
                    `*┃ 📉 Admin Event\n` +
                    `*┃ @${demoter} demoted @${userName}\n` +
                    `*┃ 🕒 ${timestamp}\n` +
                    `*┃ Group: ${metadata.subject}\n` +
                    `${BOX_FOOTER}`;

                await conn.sendMessage(update.id, {
                    text: DemoteText,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });

            } else if (update.action === "promote" && config.ADMIN_EVENTS === "true") {
                const promoter = update.author.split("@")[0];
                const PromoteText =
                    `${BOX_HEADER}` +
                    `*┃ 📈 Admin Event\n` +
                    `*┃ @${promoter} promoted @${userName}\n` +
                    `*┃ 🕒 ${timestamp}\n` +
                    `*┃ Group: ${metadata.subject}\n` +
                    `${BOX_FOOTER}`;

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
