const rp = require('request-promise');
const cheerio = require('cheerio');
const utils = require('./utils');

const CASHBACK_CAL_URL = 'https://creditcards.chase.com/freedom-credit-cards/calendar';
const CASHBACK_FAQS = 'https://creditcards.chase.com/freedom-credit-cards/faq';
const FAQ_CATEGORY_SECTION = '#row2 .row-sub-section';

/* A class to get Chase's 5% cash back information */
class ChaseCashBackCal {

    /**
     * Gets all the information of the chase 5% calendar
     * @public
     * @return {Object[]} calendar An array of each quarter with categories/terms of conditions
     */
    async getCalendar() {
        let calendar = await this.getCategories();
        let terms = await this.getTermsAndConditions();

        this.mergeCalAndTerms(calendar, terms);

        return calendar;
    }

    /**
     * Helper Method: merges faq terms and quarter details using the category as the key
     * @private
     * @param {Object[]} calendar Array of quarter objects, [{quarterName: string, quarter: int, category: string[]}]
     * @param {Object[]} terms Array of term objects, [{name: string, terms: string}]
     * @return {Object[]} calender Mutated calendar array of merged values from Calendar and Terms
     */
    mergeCalAndTerms(calendar, terms) {
        for (let quarter of calendar) {
            let categories = [];
            for (let categoryName of quarter.categoryNames) {
                for (let term of terms) {
                    if (term.title.includes(categoryName)) {
                        categories.push({
                            name: utils.toTitleCase(categoryName),
                            term: term.term
                        });
                        break;
                    }
                }
            }
            quarter['categories'] = categories;
        }
        return calendar
    }

    /**
     * Get a list of terms and condition faqs objects
     * @private
     * @return {Object[]} categories Array of terms and condition faqs
     */
    async getTermsAndConditions() {
        let $ = await this.requestBody(CASHBACK_FAQS);
        let terms = [];
        let rows = $('.row-sub-title');

        rows.each(function() {
            let row = $(this).text().trim().toLowerCase();

            if (row.includes('category')) {
                let rowId = $(this).data('target');
                let term = $(rowId).text().trim();

                terms.push({
                    title: row,
                    term
                })
            }
        });

        return terms;
    }

    /**
     * Get a list of categories
     * @private
     * @return {Object[]} cal Array of categories to represent a calendar
     */
    async getCategories() {
        let $ = await this.requestBody(CASHBACK_CAL_URL);
        let tiles = $('.calendar .tile');
        let cal = [];

        tiles.each(function() {
            let quarterName = ($(this).children('.top').text().trim());
            let categoryNames = $(this).find('.middle h2').map(function() {
                return utils.lettersOnly($(this).text());
            }).get();

            cal.push({
                quarterName,
                quarter: utils.getQuarterFromMonths(quarterName),
                categoryNames
            });
        });
        return cal;
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
            transform: (body) => {
                return cheerio.load(body);
            }
        };

        return await rp(options).catch((err) => {
            console.error(`Error: ${err}, when connecting to ${url}.`)
        });
    }
}

module.exports = ChaseCashBackCal;
