var regex = require( './regex.js' );

/**
 * Special thanks to http://stackoverflow.com/a/8497474 (date: 20160325 2106)
 * Convert a string of text into an array of strings. Tests to determine if the
 * `text` parameter will produce an array - if it doesn't check that the line
 * being passed in doesn't have apostrophes, eg. Ryan's Code,1... if so convert
 * those CSV entries to: "Ryan's Code","1"...
 * @param row string
 * @returns {Array}
 */
function CSVtoArray( row ) {
	if ( !regex.csvRegexCheck( row ) ) throw new Error( "invalid row: " + row );
	var re_value = regex.csvRegexValue();
	// Initialize array to receive values.
	var a = [];
	row.replace(re_value, // "Walk" the string using replace with callback.
		function(m0, m1, m2, m3) {
			// Remove backslash from \' in single quoted values.
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
 * array are the keys for the JSON object. Will also convert numeric values to
 * numbers, else everything else will be a string.
 * @param array
 * @returns {Array}
 */
function ArraytoJSON( array ) {
	var json = [];
	for ( var row = 1; row < array.length; row += 1 ) {
		var obj = {};
		if ( array[row].length === array[0].length ) {
			for (var headCol = 0; headCol < array[0].length; headCol += 1) {
				var el = array[row][headCol];
				var val = !isNaN(el) ? +el : el;
				obj[array[0][headCol]] = el;
			}
			json.push(obj);
		} else {
			throw new Error( "Abnormal row length, should only have " + array[0].length + " cells, has: " + array[row] );
		}
	}
	return json;
}

/**
 * Converts a CSV file into JSON. Splits on `\n` therefore CSV entries with new line
 * characters will not work with this process.
 * @param inputFile
 * @returns {Array}
 * @constructor
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