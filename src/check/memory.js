var osu = require('node-os-utils');
var mem = osu.mem;
const check = async () => {
    return 100 - (await mem.info()).freeMemPercentage;
};
module.exports.check = () => check();