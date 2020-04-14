class Utils {

    /**
     * Removes any numbers and special characters within a string
     * @public
     * @param {string} str A string with numbers usually in it
     * @return {string} str A string with only letters
     */
    static lettersOnly(str) {
        return str.toLowerCase().replace(/[^a-z\s]+/i, '');
    }

    /**
     * Converts a string of dateRange into it's quarterly numeric value
     * @public
     * @param {string} dateRange A string that is within a 3 month range
     *  i.e. "January - March"
     * @return {{num: number, range: string}} a number representing the numeric value of the quarterly month range
     */
    static getQuarterFromMonths(dateRange) {
        dateRange = dateRange.toLowerCase();
        if (dateRange.includes('jan') || dateRange.includes('mar')) {
            return {
                num: 1,
                monthRange: [1,2,3],
                range: 'Jan - Mar'
            };
        } else if (dateRange.includes('apr') || dateRange.includes('jun')) {
            return {
                num: 2,
                monthRange: [4,5,6],
                range: 'Apr - Jun'
            };
        } else if (dateRange.includes('jul') || dateRange.includes('sep')) {
            return {
                num: 3,
                monthRange: [7,8,9],
                range: 'Jul - Sep'
            };
        } else if (dateRange.includes('oct') || dateRange.includes('dec')) {
            return {
                num: 4,
                monthRange: [10,11,12],
                range: 'Oct - Dec'
            };
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
