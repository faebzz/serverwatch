const osu = require('node-os-utils')
const cpu = osu.cpu
const check = async () => {
 return await cpu.usage();
};
module.exports.check = () => check();