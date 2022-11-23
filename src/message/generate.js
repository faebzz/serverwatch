const os = require("os");
const hostname = os.hostname();
const cpu = (usage, limit) => {
    return {
        subject: `CPU Limit exceeded on ${hostname}`,
        body: `Hello\n\nYour usage limit for CPU of ${limit}% on computer ${hostname} has been exceeded. Your current usage is about ${usage}%.\n\nBest\nserverwatch on ${hostname}`
    }
}
const memory = (usage, limit) => {
    return {
        subject: `Memory Limit exceeded on ${hostname}`,
        body: `Hello\n\nYour usage limit for Memory of ${limit}% on computer ${hostname} has been exceeded. Your current usage is about ${usage}%.\n\nBest\nserverwatch on ${hostname}`
    }
}
const disk = (usage, limit) => {
    return {
        subject: `CPU Limit exceeded on ${hostname}`,
        body: `Hello\n\nYour usage limit for Diskspaxe of ${limit}% on computer ${hostname} has been exceeded. Your current usage is about ${usage}%.\n\nBest\nserverwatch on ${hostname}`
    }
}

module.exports = {
    cpu: (usage, limit) => cpu(usage, limit),
    memory: (usage, limit) => memory(usage, limit),
    disk: (usage, limit) => disk(usage, limit),
}