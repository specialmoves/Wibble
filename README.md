# Wibble

Version v0.1

Sniff out those project smells in your retrospective

Wibble is a simple tool to gather feedback from your team to generate insights for a Retrospective. It also has simple note taking so that you document your retrospective along with the insights.

## Background

Wibble v0.1 was developed at [Specialmoves](http://www.specialmoves.com) as an experiment in rapid development and also a way for our developers to have a play with Node.js. We were using Google Forms and [Confluence](https://www.atlassian.com/software/confluence/overview/team-collaboration-software) to collate the same feedback, but it was a slow and error prone process.

Designed and built over three days, Wibble v0.1 is the MVP for what could potentially be larger application. We hope that by open-sourcing the project other people might use the tool to help their retrospectives as well as contribute to add missing features.

## How To Run Wibble

* You'll need [Node.js](nodejs.org) and [MongoDB](http://www.mongodb.org/) installed on your machine
* In the project directory run `npm install` this will install any packages needed by the project
* Make sure you start your Mongo process before trying to run the server
* `node app.js` will start the project (or use [nodemon](https://github.com/remy/nodemon) to avoid manual server restarts)
* On first run, click "DB Admin" in the top right to populate the Database for the first retrospective. If you don't do this, you won't be able to create your first retrospective.

## Contact

If you have any questions, suggestions or feedback at all then get in touch with sunil@specialmoves.com
