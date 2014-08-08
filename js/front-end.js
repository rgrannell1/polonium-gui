
const constants = {
	timingPath: './data/timing.json'
}

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
	.removeClass('btn-success btn-danger active')
	.addClass('btn-primary')
	.text('Get Password')

}

/*
	setButton

	Update the action button to let the user know the text was copied, either
	successfully or otherwise.

	Only clear the button when the app is focused.
*/

const setButton = function (err, stdout, stderr) {

	if (err) {
		$('#get-password').removeClass("btn-primary").addClass("btn-danger").text("Failed!")
	} else {
		$('#get-password').removeClass("btn-primary").addClass("btn-success").text("Copied!")
	}

	const pid = setInterval(function () {

		if (document.hasFocus()) {
			setTimeout(resetButton, 1950)
			clearInterval(pid)
		}

	}, 50)

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

const writeTimings = function (timings) {

	fs.writeFile(constants.timingPath, JSON.stringify(timings), function (err) {

		if (err) {
			throw err
		}

	})
}

fs.readFile(constants.timingPath, function (err, contents) {

	const timings = JSON.parse(contents.toString())

	triggerClick(timings)
})

const triggerClick = function (timings) {

	$("#get-password").click(function () {

		const startTime = (new Date).getTime()

		$('#salt', '#password').parent(".input-group").removeClass("has-error")
		$("#user-prompt").text('')

		$('#get-password').addClass('active')

		const err = checkFull(
			$('#salt').val(), $('#password').val())

		if (err) {

			$(err.input).parent(".input-group").addClass("has-error")
			$("#user-prompt").text(err.message)

		} else {

			polonium({
				salt     : $("#salt"    ).val(),
				master   : $("#password").val(),

				len      : 20,
				rounds   : 1000000
			}, function (key) {

				toClipboard(key, function () {

					setButton()

					const endTime = (new Date).getTime()
					const elapsed = endTime - startTime

					timings.push(elapsed)
					writeTimings(timings)
				})

			})

		}
	})

}






