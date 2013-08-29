# Wibble

Version v0.1

Sniff out those project smells in your retrospective

Wibble is a simple tool to gather feedback from your team to generate insights for a Retrospective. It also has simple note taking so that you document your retrospective along with the insights.

## Background

Wibble v0.1 was developed at [Specialmoves](http://www.specialmoves.com) as an experiment in rapid development and also a way for our developers to have a play with Node.js. We were using Google Forms and [Confluence](https://www.atlassian.com/software/confluence/overview/team-collaboration-software) to collate the same feedback, but it was a slow and error prone process.

Designed and built over three days, Wibble v0.1 is the MVP for what could potentially be larger application. We hope that by open-sourcing the project other people might use the tool to help their retrospectives as well as contribute to add missing features.

## How To Run Wibble

* In your Terminal or Command Prompt, `cd` to the directory where Wibble lives on your computer
* Install the project's Node.js dependencies by running `npm install`
* Start your MongoDB process so Wibble has a database to work with
* And finally run `node app.js` to start the server (or use [nodemon](https://github.com/remy/nodemon) to avoid manual server restarts)

That should be everything! By default your Wibble server will have started at _http://localhost:3000_ - open this address in your web browser, and Wibble should be up and running!

**IMPORTANT:** Before you get started with creating retrospectives, click the "_DB Admin_" link in the header and populate the Database with the initial data required to get to work!

## Contact

If you have any questions, suggestions or feedback at all then get in touch with wibble@specialmoves.com
