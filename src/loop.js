const disk = require('./check/disk');
const cpu = require('./check/cpu');
const memory = require('./check/memory');
const mail = require('./message/email');
const message = require('./message/generate');
const slack = require('./message/slack');
const twilioSms = require('./message/twilio_sms');
var cpuCount = 0;
var ramCount = 0;
var diskCount = 0;

const loop = async (interval, cpu_limit, mem_limit, disk_limit) => {
    const cpuUsage = await cpu.check();
    const memUsage = await memory.check();
    const diskUsage = await disk.check();
    const diskLimitReached = diskUsage >  disk_limit;
    const cpuLimitReached = cpuUsage > cpu_limit;
    const ramLimitReached = memUsage > mem_limit;
    if(ramLimitReached) ramCount++;
    if(cpuLimitReached) cpuCount++;
    if(diskLimitReached) diskCount++;
    if(cpuCount > 10) {
        const cpuMessage = message.cpu(cpuUsage, cpu_limit);
        if(process.env.SMTP_SERVER != '') {
           await mail.send(cpuMessage.body, cpuMessage.subject);
        }
        cpuCount = 0;
    }
    if(ramCount >  10) {
        console.log('Memory usage reached');
        const ramMessage = message.memory(memUsage, mem_limit);
        if(process.env.SMTP_SERVER != '') {
            await mail.send(ramMessage.body, ramMessage.subject);
        }
        ramCount = 0;
    }
    if(diskCount >  10) {
        const diskMessage = message.disk(diskUsage, disk_limit);
        if(process.env.SMTP_SERVER != '') {
            await mail.send(diskMessage.body, diskMessage.subject);
        }
        diskCount = 0;
    }
    setTimeout(function() { loop(interval, cpu_limit, mem_limit, disk_limit); }, interval ?? 10000)
};
module.exports.loop = (interval, cpu_limit, mem_limit, disk_limit) => loop(interval, cpu_limit, mem_limit, disk_limit);