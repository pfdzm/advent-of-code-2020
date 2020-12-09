"use strict";
var fs = require("fs");
var path = require("path");
function readInput(fileName) {
    return fs.readFileSync(path.join(__dirname, fileName)).toString();
}
function traverse(slope, input, trees) {
    if (trees === void 0) { trees = 0; }
    var lines = input.split("\n");
    var x = slope[0], y = slope[1];
    if (!lines[y]) {
        return trees;
    }
    if (lines[y][x % lines.length] === "#") {
        trees++;
    }
    input = lines.slice(y).join("\n");
    return traverse([x, y], input, trees);
}
console.log(traverse([3, 1], readInput("example.txt")));
