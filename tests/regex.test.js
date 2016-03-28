var regex = require( '../lib/regex.js' );
var assert = require( 'assert' );


describe( "Valid CSV rows", function() {
	var validRows = [
		"1,2,3,4,5" 				// normal capture without double quotes
		,",,,," 					// empty cells
		,""							// empty rows
		,'"there\'s","it\'s"'		// escaped apostrophes provided cell is wrapped in double quotes
		,"Span\nMultiple\nLines,\n"	// multiple new line breaks in cell
		,"//g,"						// double forward slashes fine
	];
	it( "should be valid rows", function() {
		validRows.forEach( function( el ) {
			assert( regex.csvRegexCheck( el ) === true );	
		});
	});  
	var invalidRows = [
		'",'						// unclosed double quote in cell
		,'""",'						// unclosed (odd number) of double quotes in cell
		,"it\'s,not,working"		// if escaping an apostrophe need to wrap the cell in double quotes
		,"\\backslashes,"			// doesn't like double backslashes
	];
	it( "should be INvalid rows", function() {
		invalidRows.forEach( function( el ) {
			assert( regex.csvRegexCheck( el ) === false );
		});
	});
});