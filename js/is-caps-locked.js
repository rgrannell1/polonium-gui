
/*
	isCapsLocked

	A bad first approximation.
*/

const isCapsLocked = function (event) {

	const charCode = String.fromCharCode(event.which)

	return charCode.toLowerCase() !== charCode
}

module.exports = isCapsLocked
