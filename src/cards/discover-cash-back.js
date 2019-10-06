const rp = require('request-promise');
const utils = require('./utils');

const DISCOVER_CAL_URL = 'https://www.discover.com/credit-cards/cashback-bonus/data/offers.json';

/* A class to get Discovers's 5% cash back information */
class DiscoverCashBackCal {

    /**
     * Creates an array of category dictionaries with associated quarters of cash back and faq info.
     * @public
     * @return {Object[]} result Array of dictionaries with `quarter`, `category`, and `info` properties
     */
    async getCalendar() {
        let categories = await this.requestBody(DISCOVER_CAL_URL);
        let quarters = categories.quarters;

        return this.filterQuarters(quarters);
    }

    /**
     * Creates an array of category dictionaries with associated quarters of cash back and faq info.
     * @public
     * @param {Object[]} quarters Array of objects that hold info about each quarter, terms, and metadata
     * @return {Object[]} result Array of dictionaries with `quarter`, `category`, and `terms` properties
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

    async requestBody(url) {
        let options = {
            uri: DISCOVER_CAL_URL,
            json: true // Automatically parses the JSON string in the response
        };

        return await rp(options).catch((err) => {
            console.error(`Error: ${err}, when connecting to ${url}.`)
        });
    }
}

module.exports = DiscoverCashBackCal;
