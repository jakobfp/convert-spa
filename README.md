# HTW CorDes

Single-Page-Application that

1. provides a tool to create simple presentations using the markdown language (designed for people who want to learn the basic syntax of markdown).
2. converts Latex, Word and OpenOffice-Writer Documents to PDF using the HTW Berlin corporate identity.

The application communicates with a [RestAPI](https://github.com/jakobfp/pandocwrapper-api) that gives an interface to a [Pandoc-Wrapper](https://github.com/jakobfp/pandocwrapper) written for this application.

It is not currently deployed anywhere.

## Userguide

Checkout the [userguide](docs/userguide/USERGUIDE.md)

## Development

Get the [PandocWrapper-API](https://github.com/jakobfp/pandocwrapper-api) & the [Pandoc-Wrapper](https://github.com/jakobfp/pandocwrapper). <br>
Follow the instructions in the REAMDE files to set up the RestAPI.

Use `$ npm install` to install node dependencies.

Use `$ npm start` to start this app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
