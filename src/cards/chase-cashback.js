const request = require("request");
const jsdom = require("jsdom");
const utils = require("./utils");
const { JSDOM } = jsdom;

const CASHBACK_CAL_URL = "https://creditcards.chase.com/freedom-credit-cards/calendar";

class Chase_CashBack_Cal {

    getCalendar(callback) {
        request(CASHBACK_CAL_URL, (err, resp, body) => {
            if (err) console.log(err);

            const dom = new JSDOM(body);
            const d = dom.window.document;

            let tiles = d.querySelectorAll('.calendar .tile');
            let calendar = this.makeDictionaryCalendar(tiles);
            return callback(calendar);
        });
    }

    makeDictionaryCalendar(calendar) {
        let result = [];
        for (let tile of calendar) {
            let quarter = utils.sanitizeNodes(tile.querySelector('.top'));
            let categories = utils.sanitizeNodes(tile.querySelectorAll('.middle h2'));
            result.push({quarter, categories});
        }
        return result;
    }
}

module.exports = Chase_CashBack_Cal;
