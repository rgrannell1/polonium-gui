
const exec = require("child_process").exec

const copy = function (text) {

	exec("xclip " + text, function (err, stdout,stderr) {

	})







}

module.exports = copy
