const rp = require('request-promise');
const utils = require('./utils');

const DISCOVER_CAL_URL = 'https://www.discover.com/credit-cards/cashback-bonus/data/offers.json';

/* A class to get Discovers's 5% cash back information */
class DiscoverCashBackCal {

    /**
     * Gets all the information of the discover 5% calendar
     * @public
     * @return {Object[]} an array of each quarter with categories/terms of conditions
     */
    async getCalendar() {
        let categories = await this.requestBody(DISCOVER_CAL_URL);
        let quarters = categories.quarters;

        return this.filterQuarters(quarters);
    }

    /**
     * Helper Method: filters each quarter object to get the keys needed
     * @private
     * @param {Object[]} quarters Array of quarters and the metadata
     * @return {Object[]} calendar Array quarters with filtered keys
     */
    filterQuarters(quarters) {
        let thisYear = (new Date()).getFullYear();
        let calendar = [];
        for (let quarter of quarters) {
            let date = quarter['quarterLabelStartDate'];

            if (date.includes(thisYear)) {
                let title = quarter['title'];
                let terms = quarter['programTerms'];

                calendar.push({
                    quarter: utils.getQuarterFromMonths(date),
                    category: title,
                    terms,
                })
            }
        }
        return calendar;
    }

    /**
     * Makes a get request to a web page from the url passed
     * @private
     * @param {string} url The URL to scrape data from the web page
     * @return {Object} $ The body of web page
     */
    async requestBody(url) {
        let options = {
            uri: url,
            json: true
        };

        return await rp(options).catch((err) => {
            console.error(`Error: ${err}, when connecting to ${url}.`)
        });
    }
}

module.exports = DiscoverCashBackCal;
