#!/usr/bin/env sh

$dir="~/polonium-gui"

if [ ! -d "$dir" ]
then
	wget "http://dl.node-webkit.org/v0.8.6/node-webkit-v0.8.6-linux-x64.tar.gz" -P $dir
	tar xvzf "node-webkit-v0.8.6-linux-x64.tar.gz"
else
	echo hi
fi
