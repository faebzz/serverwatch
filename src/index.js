require('dotenv').config();
const Looper = require('./loop');

Looper.loop(process.env.INTERVAL, process.env.CPU_LIMIT, process.env.MEMORY_LIMIT, process.env.DISK_LIMIT)
