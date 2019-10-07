const rp = require('request-promise');
const cheerio = require('cheerio');
const utils = require('./utils');

const CASHBACK_CAL_URL = 'https://creditcards.chase.com/freedom-credit-cards/calendar';
const CASHBACK_FAQS = 'https://creditcards.chase.com/freedom-credit-cards/faq';
const FAQ_CATEGORY_SECTION = '#row2 .row-sub-section';

/* A class to get Chase's 5% cash back information */
class ChaseCashBackCal {

    /**
     * Creates an array of category dictionaries with associated quarters of cashback and faq terms.
     * @public
     * @return {Object[]} result Array of dictionaries with `quarter`, `category`, and `terms` properties
     */
    async getCalendar() {
        let calendar = await this.getCategories();
        let terms = await this.getTermsAndConditions();

        this.mergeCalAndTerms(calendar, terms);

        return calendar;
    }

    /**
     * Creates an array of merged values from calendar of cash back and faq info.
     * @param {Object[]} calendar Array of objects, {quarterName: string, quarter: int, category: string[]}
     * @param {Object[]} terms Array of objects, {name: string, terms: string}
     * @return {Object[]} result Array of merged values from Calendar and Terms
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
            console.log('categories: ', categories);
        }
        return calendar
    }

    /**
     * Get a list of category faqs in a data structure
     * @public
     * @return {Object[]} categories Array of dictionaries with `title` and `terms` properties
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
     * Makes a list of dictionaries based on each quarter which will include all the categories
     * @private
     * @return {Object[]} result Array of dictionaries with `quarter` and `category` properties
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
