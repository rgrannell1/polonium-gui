
const constants = {
	timingPath: '/home/ryan/Code/polonium-gui/data/timing.json'
}

/*
	copyText :: string -> function -> undefined

	Copy a string to the clipboard. In this case, copy the new password
	after it is created.

	linux:
		xclip.
*/

const copyText = function (str, callback) {

	// NOTE:
	// passing callback to cprocess.exec doesn't execute the callback,
	// and if xclip is installed the command should always work.
	// copying is fast, so just run the callback as a standalone block, not
	// as an argument to exec. (for the moment)

	cprocess.exec('echo "' + str + '" | xclip -selection clipboard')
	callback()

}

/*
	button

	Methods for interacting with the user button.
*/

const button = {
	reactivate: function () {
		$('#get-password').addClass('active')
	},
	deactivate: function () {
		$('#get-password').removeClass('active')
	},
	setPrimary: function (message) {

		if (!message) {
			message = 'Get Password'
		}

		$('#get-password')
		.removeClass('btn-success btn-danger')
		.addClass('btn-primary')
		.text(message)

	},
	setFailure: function (message) {

		$('#get-password')
		.removeClass("btn-primary btn-danger")
		.addClass("btn-success")
		.text(message)

	},
	setSuccess: function (message) {

		$('#get-password')
		.removeClass("btn-primary btn-danger")
		.addClass("btn-success")
		.text(message)

	}
}

/*
	currentTime

	Get the current UNIX time in milliseconds.
*/

const currentTime = function () {
	return (new Date).getTime()
}

/*
	setCopyStatus

	Update the action button to let the user know the text was copied, either
	successfully or otherwise.

	Only clear the button when the app is focused.
*/

const setCopyStatus = function (err, stdout, stderr) {

	button.deactivate()

	err ? button.setFailure("Failed!"): button.setSuccess("Copied!")

	const pid = setInterval(function () {

		if (document.hasFocus()) {
			setTimeout(button.setPrimary, 1950)
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

/*
	processDerivedKey


*/

const processDerivedKey = function (derivedKey) {
	copyText(derivedKey, function () {
		setCopyStatus()
	})
}

/*
	triggerClick


*/


$("#get-password").click(function () {

	const startTime = currentTime()

	$('#salt', '#password').parent(".input-group").removeClass("has-error")
	$("#user-prompt").text('')

	button.reactivate()

	const err = checkFull(
		$('#salt').val(), $('#password').val())

	if (err) {

		$(err.input).parent(".input-group").addClass("has-error")
		$("#user-prompt").text(err.message)

	} else {

		button.setPrimary('Retrieving...')

		polonium({
			salt     : $("#salt"    ).val(),
			master   : $("#password").val(),

			// -- polonium default arguments.
			len      : 20,
			rounds   : 1000000
		},
		processDerivedKey)

	}
})


// toggleClass