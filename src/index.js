const CHASE_CASHBACK = require("./cards/chase-cashback");
const DISCOVER_CASHBACK = require("./cards/discover-cashback");


module.exports.getChaseCashBackCal = (callback) => {
    let cal = new CHASE_CASHBACK();
    return cal.getCalendar(callback);
};

module.exports.getDiscoverCashBackCal = (callback) => {
    let cal = new DISCOVER_CASHBACK();
    return cal.getCalendar(callback);
};
