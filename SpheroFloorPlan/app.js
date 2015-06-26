"use strict";

var sphero = require("sphero");
var orb = sphero("/dev/rfcomm0");
var fs = require('fs');

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');


var degree = -1;


orb.connect(function () {
    orb.streamOdometer();
    
    orb.on("odometer", function(data)
        {
            console.log(data);
            fs.appendFile("data.txt", data.xOdometer.value[0] + ", " + data.yOdometer.value[0]+ "\n", function(err){});
        });
    
    
    stdin.on('data', Input);
});

function Input(key)
{
        switch (key) {
            case 'w':
                degree = 0;
                break;
            case 'a':
                degree = 270;
                break;
            case 's':
                degree = 180;
                break;
            case 'd':
                degree = 90;
                break;
            case '\u0003':
                process.exit();
                break;
            default:
                break;
        }
        if (degree != -1) {
            orb.roll(15, degree);

        }
}