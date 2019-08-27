const CHASE_CASHBACK = require("./cards/chase-cashback");


module.exports.getChaseCashBackCal = (callback) => {
    let cal = new CHASE_CASHBACK();
    return cal.getCalendar(callback);
};
