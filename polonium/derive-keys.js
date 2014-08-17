#!/usr/bin/env node

const crypto = require("crypto")
const log    = console.log
const bignum = require("bignum")

//console.log(require('node-bignumber'))

const convertToCharset = function (str, charset) {
	/*
	string x [string] -> string
	map a base10 string onto another character set.
	*/

	if (toString.call(str) !== '[object String]') {
		log(TypeError('str must be a string.').toString())
		process.exit(1)
	}

	if (toString.call(charset) !== '[object String]') {
		log(TypeError('charset must be a string.').toString())
		process.exit(1)
	}

	if (charset.length < 1) {
		log(RangeError('charset must have at least one character.').toString())
		process.exit(1)
	}

	var digits = []

	num     = bignum(str, 16)
	charset = charset.split('')

	while (num.gt(0)) {

		var ith = num.mod(charset.length).toNumber()
		digits  = digits.concat([ charset[ith] ])
		num     = num.div(charset.length)

	}

	return digits.join('')
}

convertToBase62 = function (str) {
	/*
	string -> string
	convert a base10 string to an alphanumeric string.
	*/

	const alphanumbers =
		'0123456789' + 'ABCDEFGHIJKLMNOPQRSTUVWXYX' + 'abcdefghijklmnopqrstuvwxyx'

	return convertToCharset(str, alphanumbers)
}





const deriveKeys = function (args) {
	/*
	{master: string, salt: string, round: number, len: number} -> string

	generate the output password.
	*/

	/*
	log(62) / log(2) ~ 6 bits per base62-digit.

	six x len is never an underestimation of the number of bits needed, sometimes
	an overestimation.
	*/

	const bits     = 6 * args.len
	const callback = args.callback

	// -- the length 'bits' gives the nubmer of bits.
	crypto.pbkdf2(
		args.master,
		args.salt,
		args.rounds,
		bits,
		function (err, key) {

			converted =
				convertToBase62(key.toString('hex'))
				.slice(0, args.len)

			if (args.len !== converted.length) {
				callback(RangeError('base62-conversion failed; the output string had incorrect length.'), '')
			}

			callback(null, converted)
		}
	)

}




module.exports = deriveKeys
