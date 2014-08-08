
/*
	toClipboard :: string -> function -> undefined

	Copy a string to the clipboard. In this case, copy the new password
	after it is created.

	linux:
		xclip.
*/

const toClipboard = function (str, callback) {

	if (!is.string(str)) {
		throw 'toClipboard: str must be a string; actual class was ' + is.what(str)
	}
	if (!is.function(callback)) {
		throw 'toClipboard: callback must be a function; actual class was ' + is.what(callback)
	}

	// NOTE:
	// passing callback to cprocess.exec doesn't execute the callback,
	// and if xclip is installed the command should always work.
	// copying is fast, so just run the callback as a standalone block, not
	// as an argument to exec. (for the moment)

	cprocess.exec('echo "' + str + '" | xclip -selection clipboard')
	callback()

}

/*
	resetButton

	set the big action button back to its original state.d
*/

const resetButton = function () {

	$('#get-password')
	.removeClass('btn-success btn-danger')
	.addClass('btn-primary')
	.text('Get Password')

}

/*
	setButton

	Update the action button to let the user know the text was copied, either
	successfully or otherwise.
*/

const setButton = function (err, stdout, stderr) {

	if (err) {
		$('#get-password').removeClass("btn-primary").addClass("btn-danger").text("Failed!")
	} else {
		$('#get-password').removeClass("btn-primary").addClass("btn-success").text("Copied!")
	}

	setTimeout(resetButton, 2000)
}

/*
	checkFull

	return an object with a message and field name
	if either the password or salf field is empty.
*/

const checkFull = function (salt, password) {

	if (salt.length === 0) {
		return {
			message: "You can't leave this empty.",
			input  : "#salt"
		}
	}

	if (password.length === 0) {
		return {
			message: "You can't leave this empty.",
			input  : "#password"
		}
	}

}










$("#get-password").click(function () {

	$('#salt', '#password').parent(".input-group").removeClass("has-error")
	$("#user-prompt").text('')

	const err = checkFull(
		$('#salt'    ).val(),
		$('#password').val()
	)

	if (err) {

		$(err.input).parent(".input-group").addClass("has-error")
		$("#user-prompt").text(err.message)

	} else {

		setTimeout(function () {

			polonium({
				salt     : $("#salt"    ).val(),
				master   : $("#password").val(),

				len      : 20,
				rounds   : 1000000
			}, function (key) {

				toClipboard(key, setButton)

			})

		}, 50)

	}
})