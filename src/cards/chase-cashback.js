const request = require("request");
const jsdom = require("jsdom");
const utils = require("./utils");
const { JSDOM } = jsdom;

const CASHBACK_CAL_URL = "https://creditcards.chase.com/freedom-credit-cards/calendar";
const CASHBACK_FAQS = "https://creditcards.chase.com/freedom-credit-cards/faq";
const FAQ_CATEGORY_SECTION = '#row2 .row-sub-section';

class Chase_CashBack_Cal {

    getCalendar(callback) {
        request(CASHBACK_CAL_URL, (err, resp, body) => {
            if (err) console.error('getCalendar: ', err);

            const dom = new JSDOM(body);
            const d = dom.window.document;

            let tiles = d.querySelectorAll('.calendar .tile');
            let calendar = this.makeDictionaryCalendar(tiles);
            this.getChaseCashBackFaqs((faqs) => {
                let result = this.mergeCalAndFaqs(calendar, faqs);
                return callback(result);
            });
        });
    }

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
                        info: faq.info
                    });
                    break;
                }
            }
        }
        return result;
    }

    // Get a list of category faqs in a data structure
    // {title, info}
    getChaseCashBackFaqs(callback) {
        request(CASHBACK_FAQS, (err, resp, body) => {
            if (err) console.error('getChaseCashBackFaqs: ', err);

            const dom = new JSDOM(body);
            const d = dom.window.document;

            let categories = [];
            let rows = d.querySelectorAll(FAQ_CATEGORY_SECTION);
            for (let row of rows) {
                let title = utils.sanitizeNodes(row.querySelector('h3'));
                if (title.includes('category')) {
                    categories.push({
                        title,
                        info: utils.sanitizeNodes(row.querySelector('.inner'))
                    });
                }
            }
            return callback(categories);
        });
    }

    // Makes a list of dictionaries based on each quarter which will include all the categories
    makeDictionaryCalendar(calendar) {
        let result = [];
        for (let tile of calendar) {
            let quarter = utils.sanitizeNodes(tile.querySelector('.top'));
            let categories = utils.sanitizeNodes(tile.querySelectorAll('.middle h2'));
            categories.map(c => result.push({quarter: utils.getQuarterFromMonths(quarter), category: c}));
        }
        return result;
    }


}

module.exports = Chase_CashBack_Cal;
