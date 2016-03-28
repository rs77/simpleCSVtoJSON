/**
 * Checks a CSV row if it "valid".
 * @param row string
 * @returns {boolean}
 */
function csvRegexTest( row ) {
	var regex = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
	return regex.test( row );
}

/**
 * Returns a Regexp to use in obtaining the CSV values from a string.
 * Taken from http://stackoverflow.com/a/8497474 (date: 20160325 2106)
 */
function csvRegexValue() {
	return /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
}

module.exports = {
	csvRegexCheck : csvRegexTest,
	csvRegexValue : csvRegexValue
};