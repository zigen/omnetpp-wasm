#!/usr/bin/env node
const fs = require("fs");
process.chdir(__dirname);
const header = `
Module = {
    arguments: ${JSON.stringify(process.argv.splice(2))},
};
`;
const src = fs.readFileSync("./@APPNAME@.js", { encoding: "utf8" });
eval(header + src.substr(0,src.indexOf(";arguments_")))