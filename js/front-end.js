
const constants = {
	timingPath: '/home/ryan/Code/polonium-gui/data/timing.json'
}

/*
	toClipboard :: string -> function -> undefined

	Copy a string to the clipboard. In this case, copy the new password
	after it is created.

	linux:
		xclip.
*/

const toClipboard = function (str, callback) {

	// NOTE:
	// passing callback to cprocess.exec doesn't execute the callback,
	// and if xclip is installed the command should always work.
	// copying is fast, so just run the callback as a standalone block, not
	// as an argument to exec. (for the moment)

	cprocess.exec('echo "' + str + '" | xclip -selection clipboard')
	callback()

}

const button = {
	reactivate: function () {
		$('#get-password').addClass('active')
	},
	deactivate: function () {
		$('#get-password').removeClass('active')
	},
	setPrimary: function () {

		$('#get-password')
		.removeClass('btn-success btn-danger')
		.addClass('btn-primary')
		.text('Get Password')

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
	setButton

	Update the action button to let the user know the text was copied, either
	successfully or otherwise.

	Only clear the button when the app is focused.
*/

const setButton = function (err, stdout, stderr) {

		$('#get-password')
		$('#get-password')


	if (err) {
		button.setFailure("Failed!")
	} else {
		button.setSuccess("Copied!")
	}

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
					timings.push(endTime - startTime)
					writeTimings(timings)
				})

			})

		}
	})

}






