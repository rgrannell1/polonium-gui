
const constants = {
	timingPath:    '/home/ryan/Code/polonium-gui/data/timing.json',
	butonResetMs : 1950,
	defaultRounds: 1000000,
	defaultLength: 20
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
	isActive: function () {
		return $('#get-password').hasClass('active')
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
	userSalt

	Methods for interacting with the user salt box.
*/

const userSalt = {
	val: function () {
		return $('#salt').val()
	},
	isEmpty: function () {
		return this.val().length === 0
	},
	setFailure: function () {
		$('#salt').parent('.input-group').addClass('has-error')
	},
	unsetFailure: function () {
		$('#salt').parent('.input-group').removeClass('has-error')
	}
}




/*
	userPassword

	Methods for interacting with the user password box.
*/

const userPassword = {
	val: function () {
		return $('#password').val()
	},
	isEmpty: function () {
		return this.val().length === 0
	},
	setFailure: function () {
		$('#password').parent('.input-group').addClass('has-error')
	},
	unsetFailure: function () {
		$('#password').parent('.input-group').removeClass('has-error')
	}
}

/*
	setCopyStatus :: Error -> undefined

	Update the action button to let the user know the text was copied, either
	successfully or otherwise.

	Only clear the button when the app is focused.
*/

const setCopyStatus = function (err) {

	// the button is no longer active, since copying is finished.
	button.deactivate()

	err ? button.setFailure("Failed!"): button.setSuccess("Copied!")

	// reset the button back to its starting state after a set amount
	// of time, and wait for the user to bring the app back into focus
	// before starting the timout.
	const pid = setInterval(function () {

		if (document.hasFocus()) {
			setTimeout(button.setPrimary, constants.butonResetMs)
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
	copyKey :: string -> undefined

	copyKey takes the key produced by polonium, copies it to the
	clipboard, and updates the button status to inform of this.
*/

const copyKey = function (derivedKey) {
	copyText(derivedKey, setCopyStatus)
}

$("#get-password").click(function () {

	// currently calling polonium; don't rerun till it's finished.
	if (button.isActive()) {
		return
	}

	// unset any user error prompts prior to error-checking again.
	userSalt    .unsetFailure()
	userPassword.unsetFailure()

	$("#user-prompt").text('')

	const err = checkFull(
		$('#salt')    .val(),
		$('#password').val())

	if (err) {

		$(err.input).parent(".input-group").addClass("has-error")
		$("#user-prompt").text(err.message)

	} else {

		// set the button to active.
		button.reactivate()
		button.setPrimary('Retrieving...')

		// asyncronously call polonium, copy the key
		// as a callback.
		polonium({
			salt  : $("#salt"    ).val(),
			master: $("#password").val(),

			// -- polonium default arguments.
			len   : constants.defaultLength,
			rounds: constants.defaultRounds
		},
		copyKey)

	}

})


// toggleClass