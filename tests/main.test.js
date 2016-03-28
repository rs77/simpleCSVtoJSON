var assert = require( 'assert' );
var convert = require( '../index.js' );
var fs = require('fs');

var validCSVFileLoc = __dirname + '/csv/1.csv';
var invalidCSVFileLoc = __dirname + '/csv/invalid.csv';
var validCSVFile = fs.readFileSync( validCSVFileLoc, 'utf8' );
var validCSVRows = validCSVFile.split( '\n' );

function checkFile( fileLoc ) {
	return fs.accessSync( fileLoc ) === undefined;
}

describe( "Input CSV File", function() {
	it( "should be a file", function() {
		assert( checkFile( validCSVFileLoc ) === true );
	});
});
 
describe( "JSON result", function() {
	var result = convert.CSVtoJSON( validCSVFileLoc );
	it( "should be an array", function() {
		assert(Array.isArray(result));
	});
	it( "should be an array with rows-1 elements", function() {
		assert( result.length === validCSVRows.length - 1 );
	});
	it( "should have it's keys === first row in CSV file", function() {
		var firstRow = validCSVRows[0]; // get first line from CSV file
		var propertyNames = convert.CSVtoArray( firstRow ); // get first row into an array
		propertyNames.forEach( function( el ) {
			result.forEach( function( j ) {
				assert( j.hasOwnProperty( el ) === true );
			});
		});
	});
});