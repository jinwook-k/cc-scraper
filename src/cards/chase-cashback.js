const request = require('request');
const utils = require('./utils');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const CASHBACK_CAL_URL = 'https://creditcards.chase.com/freedom-credit-cards/calendar';
const CASHBACK_FAQS = 'https://creditcards.chase.com/freedom-credit-cards/faq';
const FAQ_CATEGORY_SECTION = '#row2 .row-sub-section';

/* A class to get Chase's 5% cashback information */
class Chase_CashBack_Cal {

    /**
     * Creates an array of category dictionaries with associated quarters of cashback and faq info.
     * @public
     * @param {function} callback This will callback to the called function with the return value
     * @return {Object[]} result Array of dictionaries with `quarter`, `category`, and `info` properties
     */
    getCalendar(callback) {
        request(CASHBACK_CAL_URL, (err, resp, body) => {
            if (err) {
                console.error('getCalendar: ', err);
                return callback(err);
            }

            const dom = new JSDOM(body);
            const d = dom.window.document;

            let tiles = d.querySelectorAll('.calendar .tile');
            let calendar = this.makeDictionaryCalendar(tiles);
            this.getChaseCashBackFaqs((error, faqs) => {
                if (error) {
                    console.error('getChaseCashBackFaqs: ', error);
                    return callback(error);
                }
                let result = utils.mergeCalAndFaqs(calendar, faqs);
                return callback(null, result);
            });
        });
    }

    /**
     * Get a list of category faqs in a data structure
     * @private
     * @param {function} callback This will callback to the called function with the return value
     * @return {Object[]} categories Array of dictionaries with `title` and `info` properties
     */
    getChaseCashBackFaqs(callback) {
        request(CASHBACK_FAQS, (err, resp, body) => {
            if (err) {
                console.error('getChaseCashBackFaqs: ', err);
                return callback(err);
            }

            const dom = new JSDOM(body);
            const d = dom.window.document;

            let categories = [];
            let rows = d.querySelectorAll(FAQ_CATEGORY_SECTION);
            for (let row of rows) {
                let title = utils.sanitizeNodes(row.querySelector('h3'));
                if (title.includes('category')) {
                    categories.push({
                        title,
                        info: utils.sanitizeNodes(row.querySelector('.inner')),
                    });
                }
            }
            return callback(null, categories);
        });
    }

    /**
     * Makes a list of dictionaries based on each quarter which will include all the categories
     * @private
     * @param {NodeList} tiles NodeList of tiles (class name of calendar objs for each quarter)
     * @return {Object[]} result Array of dictionaries with `quarter` and `category` properties
     */
    makeDictionaryCalendar(tiles) {
        let result = [];
        for (let tile of tiles) {
            let quarter = utils.sanitizeNodes(tile.querySelector('.top'));
            let categories = utils.sanitizeNodes(tile.querySelectorAll('.middle h2'));
            categories.map(
                c => result.push({
                    quarter: utils.getQuarterFromMonths(quarter),
                    category: c
                })
            );
        }
        return result;
    }

}

module.exports = Chase_CashBack_Cal;
