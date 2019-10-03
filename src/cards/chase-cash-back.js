const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');
const utils = require('./utils');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const CASHBACK_CAL_URL = 'https://creditcards.chase.com/freedom-credit-cards/calendar';
const CASHBACK_FAQS = 'https://creditcards.chase.com/freedom-credit-cards/faq';
const FAQ_CATEGORY_SECTION = '#row2 .row-sub-section';

/* A class to get Chase's 5% cash back information */
class ChaseCashBackCal {

    /**
     * Creates an array of category dictionaries with associated quarters of cashback and faq terms.
     * @public
     * @param {function} callback This will callback to the called function with the return value
     * @return {Object[]} result Array of dictionaries with `quarter`, `category`, and `terms` properties
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
                let result = this.mergeCalAndFaqs(calendar, faqs);
                return callback(null, result);
            });
        });
    }

    /**
     *
     * @public
     */
    async getPromiseCalendar() {
        let options = {
            uri: CASHBACK_CAL_URL,
            transform: (body) => {
                return cheerio.load(body);
            }
        };

        return await rp(options)
            .then(($) => {
                let tiles = $('.calendar .tile').text();
                let calendar = this.makeDictionaryCalendar(tiles);
                console.log('trimmed: ', calendar);
                return calendar;
            })
            .catch((err) => {
                // Crawling failed...
        });
    }

    /**
     * Creates an array of category dictionaries with associated quarters of cash back and faq info.
     * @param {Object[]} cal This will callback to the called function with the return value
     * @param {Object[]} faqs This will callback to the called function with the return value
     * @return {Object[]} result Array of dictionaries with `quarter`, `category`, and `info` properties
     */
    mergeCalAndFaqs(cal, faqs) {
        let result = [];
        for (let calEle of cal) {
            let sanitizedCatName = calEle.category.toLowerCase().replace(/\d/g, '');

            for (let faq of faqs) {
                let sanitizedTitleName = faq.title.toLowerCase();

                if (sanitizedTitleName.includes(sanitizedCatName)) {
                    result.push({
                        quarter: calEle.quarter,
                        category: utils.toTitleCase(sanitizedCatName),
                        terms: faq.terms,
                    });
                    break;
                }
            }
        }
        return result;
    }

    /**
     * Get a list of category faqs in a data structure
     * @private
     * @param {function} callback This will callback to the called function with the return value
     * @return {Object[]} categories Array of dictionaries with `title` and `terms` properties
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
                        terms: utils.sanitizeNodes(row.querySelector('.inner')),
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
                    category: c,
                }),
            );
        }
        return result;
    }

}

module.exports = ChaseCashBackCal;
