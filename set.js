const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0RRZlVjMTg3dnJJOS9jVTF4dStmTTlaMDlzTnk4cHNNLzNNdjZZaGxVOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWhBSVl0UldxZmxVOVVmR1J4MTNkZXNsRmJzdjB3SGZYTllTV1Q5K1VTST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlSUcyeWx0dmxjT2lZY2FIRFpZY3hScVpsN2lUOU5rekUxQStWSWJHTUZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhZkZiTnB6Q2dhUmN5SndhZmM5ZHpZVEozMlpPZ0JnczBuT2JOVVJvZkZnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhFTjZHZWZtWFNSRjMwc0w4M1pLYTQ4Zy9Cenh5cSswaWxtbk5aSHBVRms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iitlall1Q295STlUaHoxbitZTnRWNTBPdDc1SG5zcURQNGFaWnB6NHByQjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0xZTUJLS1dtOC9FRVN1RmRCcTRmMmVBNjByT1ZQSENTNHIzcFhwMExGOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQzR0UlF4K3hjNC9qVnVCcTVVKzd5NkpxTUlaTFZPdVJ2ODBhYng1VkdqQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5ET1BRbGUvVi9OSjN4L2FjZlQ2NkI4RGxoWjBFYnVzc3Z1Ri9lYmI1Y1hrUUlWUHdoaHByRFdRNzQwTW9QNzdudFZHZmllb01tbGxaMGlWdGt5S2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MCwiYWR2U2VjcmV0S2V5IjoiQXg4Uk1VRXM5WGN6ZWRRZHVia21KYzVHbmwwVnJoemRHRDZPZnhCbWdDND0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiNzduMTd2clRSWlNGTU8wOTlXaGtQdyIsInBob25lSWQiOiJmZTFkODhjMS0wMmNkLTQ3ZjQtODBkYS1mNmU4NDYyNmVlODYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRExjcTgyNkR3WFFyWVNvMGJFMk9VbXFjSXBzPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlQ1MWt1dDl3SFFIQmtjdXNCbi9VbjQ1YXVkdz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiI2NThBV1IyVyIsIm1lIjp7ImlkIjoiMjU0NzEzMTQ1NjE4OjEwQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJSG1sKzRIRU55Qi83OEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJON0xUbGJTR2VEV0J5d2ZpQWxtVGlFUzAvRUhHcU0xS2owMEEyd1h2K2w0PSIsImFjY291bnRTaWduYXR1cmUiOiJObHh5WjdkaTZUdUx6YTh2VFlqcTAzMWhSRXk2OVRheHNnMlhLdTYzMEtDZ1BndVhZck0yOWtsM3FDZTViNEt2c3ZBT1M0SVJEZndJdTBxaXNSQ2lDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoialNMdnNIdnBvL2F1ZXVRTFNISFdLSk5LOEpTNlkxVkpSVDJwaVE0RE5DZmgyNUprczNQNmRFdnd5STFSTFdITFV4NEFsemsrNktUOUNzZDBwaGNQaGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MTMxNDU2MTg6MTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVGV5MDVXMGhuZzFnY3NINGdKWms0aEV0UHhCeHFqTlNvOU5BTnNGNy9wZSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NDgxNDMxNCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFIc0QifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ongeri💜",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254713145618",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
