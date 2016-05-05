var assert = require( 'chai' ).assert;
var convert = require( '../index.js' );
var fs = require('fs');

var validCSVFileLoc = __dirname + '/csv/1.csv';
var invalidCSVFileLoc = __dirname + '/csv/invalid.csv';
var validCSVFile = fs.readFileSync( validCSVFileLoc, 'utf8' );
var validCSVRows = validCSVFile.split( '\n' );
var brokenColumnsFileLocation = __dirname + '/csv/brokenColumns.csv';
var brokenRowsFileLocation = __dirname + '/csv/brokenRows.csv';

function checkFile( fileLoc ) {
	return fs.accessSync( fileLoc ) === undefined;
}

describe( "Input CSV File", function() {
	it( "should be a file", function() {
		assert.equal( checkFile( validCSVFileLoc ), true, 'checks file is valid for testing' );
	});
});
 
describe( "JSON result", function() {
	var result = convert.CSVtoJSON( validCSVFileLoc );
	it( "should be an array", function() {
		assert.isArray( result, 'checks if `result` is an array');
	});
	it( "should be an array with rows-1 elements", function() {
		assert.lengthOf( result, validCSVRows.length - 1, 'checks length of array' );
	});
	it( "should have JSON keys labelled as first row in CSV file", function() {
		var firstRow = validCSVRows[0]; // get first line from CSV file
		var propertyNames = convert.CSVtoArray( firstRow ); // get first row into an array
		propertyNames.forEach( function( el ) {
			result.forEach( function( j ) {
				assert.equal( j.hasOwnProperty( el ), true, 'checks JSON properties to match csv header');
			});
		});
	});
	it( "should be a broken csv file", function() {
		assert.throws( function() { 
			convert.CSVtoJSON( brokenColumnsFileLocation ) 
		}, Error, 'Abnormal row length does not match header length', 'check error being thrown' );
	});
	it( "should have a broken row", function() {
		assert.throws( function() {
			convert.CSVtoJSON( brokenRowsFileLocation )
		}, Error );
	});
});