const osu = require('node-os-utils')
var drive = osu.drive;
const check = async () => {
 return (await drive.used()).usedPercentage;
};
module.exports.check = () => check();