const CHASE_CASHBACK = require("./cards/chase-cashback");

class Cards {
    getChaseCashBackCal(callback) {
        let cal = new CHASE_CASHBACK();
        return cal.getCalendar(callback);
    }
}

module.exports = Cards;
