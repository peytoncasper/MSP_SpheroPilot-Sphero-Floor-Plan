"use strict";

var sphero = require("sphero");
var orb = sphero("COM5");


var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
orb.connect(function () {
    stdin.on('data', function (key) {
        var degree = -1;
        switch (key) {
            case 'w':
                console.log("Foward");
                degree = 0;
                break;
            case 'a':
                console.log("Left");
                degree = 270;
                break;
            case 's':
                console.log("Backwards");
                degree = 180;
                break;
            case 'd':
                console.log("Right");
                degree = 90;
                break;
            case '\u0003':
                process.exit();
                break;
            default:
                break;
        }
        if (degree != -1) {
            orb.roll(10, degree);

        }
    });
});