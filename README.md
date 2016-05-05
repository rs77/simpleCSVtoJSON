# Simple Synchronous CSV to JSON converter.

Runs synchronous code that generates a `JSON` array from a `csv` file input. Just wanted a simple solution for converting CSV to JSON.

## Installation

    npm install simple-csv-to-json

## Use

Place a `csv` file into a folder within your working directory.

eg. location of file: `/csv/csvfile.csv`

    header1,header2,header3
    testRow1,2,3.02
    testRow2,11,45.01

Then in your javascript file, pass the location through to the `CSVtoJSON` function:

eg. location of file: `index.js`

    var convert = require('simple-csv-to-json');
    var file = __dirname + '/csv/csvfile.csv';
    var result = convert.CSVtoJSON( file );

    console.log( result );

Output from the `console` would be:

    [{
        header1 : "testRow1",
        header2 : 2,
        header3 : 3.02
    },{
        header1 : "testRow2",
        header2 : 11,
        header3 : 45.01
    }]

## TODO

+ Function to call code asynchronously.
