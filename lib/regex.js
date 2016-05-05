/**
 * Tests if CSV line is a valid string.
 * @source http://stackoverflow.com/a/8497474 (date accessed: 20160325 2106)
 * @param {string} row - csv line
 * @returns {boolean}
 */
function csvRegexTest( row ) {
	var regex = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
	return regex.test( row );
}

/**
 * Regular Expression to obatin CSV values from a string.
 * @source http://stackoverflow.com/a/8497474 (date accessed: 20160325 2106)
 * @returns {RegExp}
 */
function csvRegexValue() {
	return /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
}

module.exports = {
	csvRegexCheck : csvRegexTest,
	csvRegexValue : csvRegexValue
};