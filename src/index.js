const CHASE_CASHBACK = require("./cards/chase-cashback");

class Cards {
    getChaseCashBackCal(callback) {
        let cal = new CHASE_CASHBACK();
        return cal.getCalendar(callback);
    }
}
let test = new Cards();

test.getChaseCashBackCal((body) => {
    console.log('body: ', body);
});

module.exports = Cards;
