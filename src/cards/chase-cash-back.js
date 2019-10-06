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
     * @return {Object[]} result Array of dictionaries with `quarter`, `category`, and `terms` properties
     */
    async getCal() {
        let calendar = await this.getCalendar();
        let terms = await this.getChaseCashBackFaqs();

        this.mergeCalAndFaqs(calendar, terms);

        return calendar;
    }

    /**
     * Creates an array of category dictionaries with associated quarters of cash back and faq info.
     * @param {Object[]} cal This will callback to the called function with the return value
     * @param {Object[]} faqs This will callback to the called function with the return value
     * @return {Object[]} result Array of dictionaries with `quarter`, `category`, and `info` properties
     */
    mergeCalAndFaqs(calendar, terms) {

        for (let quarter of calendar) {

            let categories = [];
            for (let cat of quarter.category) {
                let catName = cat.toLowerCase().replace(/[^a-z\s]+/i, '');

                for (let term of terms) {
                    if (term.name.includes(catName)) {
                        categories.push({
                            name: catName,
                            term: term.terms
                        })
                    }
                }

            }
            quarter['categories'] = categories;
        }

        return calendar
    }

    /**
     * Get a list of category faqs in a data structure
     * @public
     * @param {function} callback This will callback to the called function with the return value
     * @return {Object[]} categories Array of dictionaries with `title` and `terms` properties
     */
    async getChaseCashBackFaqs() {
        let options = {
            uri: CASHBACK_FAQS,
            transform: (body) => {
                return cheerio.load(body);
            }
        };

        return await rp(options).then(($) => {
            let categories = [];

            let rows = $('.row-sub-title');
            rows.each(function(i, elem) {
                let row = $(this).text().trim().toLowerCase();

                if (row.includes('category')) {
                    let data = $(this).data('target');
                    let terms = $(data).text().trim();

                    categories.push({
                        name: row,
                        terms
                    })
                }
            });

            return categories;
        }).catch();
    }

    /**
     * Makes a list of dictionaries based on each quarter which will include all the categories
     * @private
     * @param {NodeList} tiles NodeList of tiles (class name of calendar objs for each quarter)
     * @return {Object[]} result Array of dictionaries with `quarter` and `category` properties
     */
    async getCalendar() {
        let options = {
            uri: CASHBACK_CAL_URL,
            transform: (body) => {
                return cheerio.load(body);
            }
        };

        return await rp(options)
        .then(($) => {
            let tiles = $('.calendar .tile');
            let cal = [];
            tiles.each(function(i, elem) {
                let quarterName = ($(this).children('.top').text().trim());
                let categories = $(this).find('.middle h2').map(function() {return $(this).text()}).get();

                cal.push({
                    quarterName,
                    quarter: utils.getQuarterFromMonths(quarterName),
                    category: categories
                });
            });
            return cal;
        })
        .catch((err) => {
            // Crawling failed...
        });
    }

}

module.exports = ChaseCashBackCal;
