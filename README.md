# Wibble

Version v0.1

Sniff out those project smells in your retrospective

Wibble is a simple tool to gather feedback from your team to generate insights for a Retrospective. It also has simple note taking so that you document your retrospective along with the insights.

## Background

Wibble v0.1 was developed at [Specialmoves](http://www.specialmoves.com) as an experiment in rapid development and also a way for our developers to have a play with Node.js. We were using Google Forms and [Confluence](https://www.atlassian.com/software/confluence/overview/team-collaboration-software) to collate the same feedback, but it was a slow and error prone process.

Designed and built over three days, Wibble v0.1 is the MVP for what could potentially be larger application. We hope that by open-sourcing the project other people might use the tool to help their retrospectives as well as contribute to add missing features.

The [Specialmoves Blog](http://blog.specialmoves.com/geeks/wibble-a-simple-retrospective-tool/) has a more detailed history and list of features.

## Dependencies

* Wibble is built on NodeJS which can be downloaded from _http://nodejs.org/_.
* You will also need to install MongoDB which can be downloaded from _http://www.mongodb.org/_.

## How To Run Wibble

1. In your Terminal or Command Prompt, go to the directory where Wibble lives on your computer.
2. Install the project's Node.js dependencies by running `npm install`.
3. [Start your MongoDB process] (http://docs.mongodb.org/manual/tutorial/getting-started/) so Wibble has a database to work with.
4. Run `node app.js` to start the server (or use [nodemon](https://github.com/remy/nodemon) to avoid manual server restarts).
5. Open _http://localhost:3000_ in your web browser, and Wibble should be up and running! (Note "3000" is the default port, your Node configuration may change this).
6. Before you get started with creating retrospectives, click the "_DB Admin_" link in the header and populate the Database with the initial data required to get to work.
7. Get Wibbling!

## Contact

If you have any questions, suggestions or feedback then get in touch with wibble@specialmoves.com or tweet us as [@specialmvoes](http://www.twitter.com/specialmoves)
