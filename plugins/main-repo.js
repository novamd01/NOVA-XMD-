const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch GitHub repository information",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/novaxmd/NOVA-XMD';

    try {
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const repoData = await response.json();

        // Style 1 - 5: Different formatting styles
        const style1 = `
╭━━━「 ${config.BOT_NAME} REPO 」━━━➤
│ 📦 Name: ${repoData.name}
│ 👤 Owner: ${repoData.owner.login}
│ ⭐ Stars: ${repoData.stargazers_count}
│ 🍴 Forks: ${repoData.forks_count}
│ 🌐 URL: ${repoData.html_url}
│ 📝 Desc: ${repoData.description || 'None'}
╰━━━━━━━━━━━━━━━━━━━━━━━➤
🔗 ${config.DESCRIPTION}`

        const style2 = `
┏━━━━━ ⍟ ${config.BOT_NAME} GitHub Repo ⍟ ━━━━━┓
┃ 🔖 Name : ${repoData.name}
┃ 👑 Owner : ${repoData.owner.login}
┃ 🌟 Stars : ${repoData.stargazers_count}
┃ 🍽️ Forks : ${repoData.forks_count}
┃ 🔗 Link : ${repoData.html_url}
┃ 📜 Desc : ${repoData.description || 'None'}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
✨ ${config.DESCRIPTION}`

        const style3 = `
━━━━━━━━━━━━━━━━━━━━
🔰 *${config.BOT_NAME} GitHub Info*
━━━━━━━━━━━━━━━━━━━━
🔹 *Name:* ${repoData.name}
🔹 *Owner:* ${repoData.owner.login}
🔹 *Stars:* ${repoData.stargazers_count}
🔹 *Forks:* ${repoData.forks_count}
🔹 *Link:* ${repoData.html_url}
🔹 *Desc:* ${repoData.description || 'None'}
━━━━━━━━━━━━━━━━━━━━
🔸 ${config.DESCRIPTION}
        `

        const style4 = `
> ${config.BOT_NAME} :: Repository Info
----------------------------------------
[ Name  ] => ${repoData.name}
[ Owner ] => ${repoData.owner.login}
[ Stars ] => ${repoData.stargazers_count}
[ Forks ] => ${repoData.forks_count}
[ Link  ] => ${repoData.html_url}
[ Desc  ] => ${repoData.description || 'None'}
----------------------------------------
${config.DESCRIPTION}
        `

        const style5 = `
📦 *${config.BOT_NAME} REPO DETAILS* 📦
━━━━━━━━━━━━━━━━━━━━
🔰 *NAME:* ${repoData.name}
👤 *OWNER:* ${repoData.owner.login}
⭐ *STARS:* ${repoData.stargazers_count}
🍴 *FORKS:* ${repoData.forks_count}
🌐 *URL:* ${repoData.html_url}
📝 *DESC:* ${repoData.description || 'None'}
━━━━━━━━━━━━━━━━━━━━
📌 ${config.DESCRIPTION}
        `

        const styles = [style1, style2, style3, style4, style5];
        const selectedStyle = styles[Math.floor(Math.random() * styles.length)];

        // Random image from /scs folder (local)
        const scsFolder = path.join(__dirname, "../scs");
        const images = fs.readdirSync(scsFolder).filter(f => /^menu\d+\.jpg$/i.test(f));
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const imageBuffer = fs.readFileSync(path.join(scsFolder, randomImage));

        await conn.sendMessage(from, {
            image: imageBuffer,
            caption: selectedStyle.trim(),
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363382023564830@newsletter',
                    newsletterName: config.OWNER_NAME || '𝗡𝗢𝗩𝗔-𝗫𝗠𝗗',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Repo command error:", error);
        reply(`❌ Error: ${error.message}`);
    }
});
