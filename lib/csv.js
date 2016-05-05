var regex = require( './regex.js' );

/**
 * Convert a string of text into an array of strings. Tests to determine if the
 * `text` parameter will produce an array - if it doesn't check that the line
 * being passed in doesn't have apostrophes, eg. Ryan's Code,1... if so convert
 * those CSV entries to: "Ryan's Code","1"...
 * @source http://stackoverflow.com/a/8497474 (date: 20160325 2106)
 * @param {string} row - csv line in file
 * @returns {string[][]} - 2-dimensional array
 */
function CSVtoArray( row ) {
	if ( !regex.csvRegexCheck( row ) ) throw new Error( "invalid row: " + row );
	var re_value = regex.csvRegexValue();
	// Initialize array to receive values.
	var a = [];
	row.replace(re_value, // "Walk" the string using replace with callback.
		function(m0, m1, m2, m3) {
			// Remove backslash from \' in single quoted values.
			/* istanbul ignore else */
			if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
			// Remove backslash from \" in double quoted values.
			else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
			else if (m3 !== undefined) a.push(m3);
			return ''; // Return empty string.
		});
	// Handle special case of empty last value.
	if (/,\s*$/.test(row)) a.push('');
	return a;
}

/**
 * Convert an array into JSON. The assumption here is that the first row in the
 * array will be the keys for the returned JSON object. 
 * Will also convert numeric values to numbers, else everything else will be a string.
 * @param {string[][]} array2d - two dimensional array of rows, with first row being the header
 * @returns {Object[]}
 * @throws Abnormal row-cell length. Needs to be according to the number of headers in the csv file.
 */
function ArraytoJSON( array2d ) {
	var json = [];
	for ( var row = 1; row < array2d.length; row += 1 ) {
		var obj = {};
		if ( array2d[row].length === array2d[0].length ) {
			for (var headCol = 0; headCol < array2d[0].length; headCol += 1) {
				var el = array2d[row][headCol];
				var val = !isNaN(el) ? +el : el;
				obj[array2d[0][headCol]] = el;
			}
			json.push(obj);
		} else {
			throw new Error( "Abnormal row length does not match header length" );
		}
	}
	return json;
}

/**
 * Converts a CSV file into JSON. Splits on `\n` therefore CSV entries with new line
 * characters will not work with this process.
 * @param {string} inputFile - location of file (may need to prefix with __dirname)
 * @returns {Object[]}
 */
function CSVtoJSON( inputFile ) {
	const fs = require('fs');
	const file = fs.readFileSync( inputFile, 'utf8' );
	const lines = file.split( '\n' );
	const result = lines.reduce( function( prev, el ) {
		prev.push( CSVtoArray( el ) );
		return prev;
	}, [] );
	return ArraytoJSON( result );
}

module.exports = {
	CSVtoJSON : CSVtoJSON,
	CSVtoArray : CSVtoArray,
	ArraytoJSON : ArraytoJSON
};