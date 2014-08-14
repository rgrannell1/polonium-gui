
Polonium-GUI v0.2.0
------------------------------------------------------------------------------
Date: 2014-8-15

ENHANCEMENTS:

* Added a script that can run polonium-gui from the app launcher, and the desktop script
required for this.

BUG-FIXES:

* Errors created by polonium are now flagged by a red button.

* Fixed a race condition where clicking immediately after text is copied would
reset the text to 'Get Password' while awaiting new results. Closes #2

* Fixed a bug in which an error produced by polonium was allowed to fail unhandled,
closing #3.







Polonium-GUI v0.2.0
------------------------------------------------------------------------------
Date: 2014-8-9

ENHANCEMENTS:

* The main button now changes colour and message upon invokation,
and a spinner appears when hovering over the button.

BUG-FIXES:

* Polonium now runs asyncronously when called by the GUI; previously
the UI would freeze while polonium generated a password.

* Pressing the button multiple times no longer triggers polonium
multiple times.







Polonium-GUI v0.1.0
------------------------------------------------------------------------------
Date: 2014-8-7
