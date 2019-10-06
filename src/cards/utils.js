class Utils {

    /**
     * Removes any numbers within a string
     * @public
     * @param {string} str A string with numbers usually in it
     * @return {string} str A string without the numbers
     */
    static lettersOnly(str) {
        return str.toLowerCase().replace(/[^a-z\s]+/i, '');
    }

    /**
     * Converts a string of dateRange into it's quarterly numeric value
     * @public
     * @param {string} dateRange A string that is within a 3 month range
     *  i.e. "January - March"
     * @return {number} a number representing the numeric value of the quarterly month range
     */
    static getQuarterFromMonths(dateRange) {
        dateRange = dateRange.toLowerCase();
        if (dateRange.includes('jan') || dateRange.includes('mar')) {
            return 1;
        } else if (dateRange.includes('apr') || dateRange.includes('jun')) {
            return 2;
        } else if (dateRange.includes('jul') || dateRange.includes('sep')) {
            return 3;
        } else if (dateRange.includes('oct') || dateRange.includes('dec')) {
            return 4;
        }
    }

    /**
     * Turns the first letter of each word into a capital letter
     * @public
     * @param {string} str A string of word/words
     * @return {string} str A string with capital first letters for each word
     */
    static toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

}

module.exports = Utils;
