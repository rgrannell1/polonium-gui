#!/usr/bin/env sh

if [ ! -d ~/polonium-gui/node-webkit-v0.8.6-linux-x64 ]
then

	echo '-- polonium-gui: downloading node webkit.'

	wget -O ~/polonium-gui/webkit.tar.gz http://dl.node-webkit.org/v0.8.6/node-webkit-v0.8.6-linux-x64.tar.gz
	cd ~/polonium-gui/

	tar xvzf webkit.tar.gz

else

	echo '--polonium-gui: executing polonium-gui.'
	data_path=~/polonium-gui/test/data/load_times.txt

	# echo the start time to a file
	echo $(($(date +%s%N)/1000000)) >> $data_path
	echo "\n" >> $data_path

	# -- use nw to execute app.zip
	# -- this will write the final startup time to a file on load.
	~/polonium-gui/node-webkit-v0.8.6-linux-x64/nw ~/polonium-gui/app.zip

fi
