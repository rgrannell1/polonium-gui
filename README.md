
<img src="icon.png" width="100"/>
# Polonium (GUI) V0.2.0

<img src="example.png"> </img>

A node-webkit gui for [Polonium](https://github.com/rgrannell1/polonium), a stateless password manager.

### Requirements

* Ubuntu (tested on 14.10)
* xclip
* Node.js v0.11.13
* Node Webkit 0.8.6
* Bignum

### Installation

Polonium-GUI is not particularily easy to install on Ubuntu, as certain packages required by node-webkit are unavailable.

#### - Dependencies

To install node.js on Ubuntu use

```bash
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

### - Polonium GUI

To add a launcher icon

```bash
sudo cat ~/polonium-gui/launcher.txt >> ~/.local/share/applications/polonium.desktop
```

You may need to restart your session by hitting <kbd>Alt + F2</kbd> and entering 'r'.




### Licence

The MIT License

Copyright (c) 2014 Ryan Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### Versioning

Versioning complies with the Semantic Versioning 2.0.0 standard.

http://semver.org/
