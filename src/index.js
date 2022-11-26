const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const fs = require("fs");
require('dotenv').config();

const port = new SerialPort({
  path: process.env.PORT,
  baudRate: parseInt(process.env.BAUDRATE),
})  

const parser = port.pipe(new ReadlineParser({ delimiter: '\u200b' }))
parser.on('data', (data) => {
    let currentdate = new Date(); 
    let datetime = "Time: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    // console.log(datetime);
    // console.log(data);
    fs.appendFile("./data/results.txt", datetime + data + '\n', (err) => {
        if (err) console.error(err);
        return;
    });
});