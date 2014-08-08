#!/usr/bin/env node

const deriveKeys  = require("./derive-keys.js")
const entropyOf   = require("./entropy-of.js")
const log         = console.log







const main = function (args, callback) {
	/*
	The main function. Takes arguments from the command line.
	*/

	// -- check that each value has non-zero length.
	;["salt", "master", "len", "rounds"].map(function (prop) {

		if (args[prop].len === 0) {
			log(RangeError("the argument matching '" + prop + "' cannot be length-zero.").toString())
			process.exit(1)
		}
	})

	// -- test that numeric arguments are non-NaN and positive.
	;["len", "rounds"].map(function (prop) {

		const num = parseInt(args[prop], 10)

		if (num !== num) {
			log(TypeError("the argument matching '" + prop + "' must be coercible to integer.").toString())
			process.exit(1)
		}
		if (!(num > 0)) {
			log(RangeError("the argument matching '" + prop + "' must be a positive number.").toString())
			process.exit(1)
		}

		if (Math.round(num) !== num) {
			log(RangeError("the argument matching '" + prop + "' must be a round number.").toString())
			process.exit(1)
		}

	})

	// -- ensure that length is larger than one
	if (args.len <= 1) {
		log(RangeError("the argument matching 'len' must larger than one.".red).toString())
		process.exit(1)
	}

	deriveKeys({
		rounds: parseInt(args.rounds, 10),
		len :   parseInt(args.len, 10),

		salt :  args.salt,
		master: args.master,

		callback: callback
	})
}






module.exports = {
	main: main
}
