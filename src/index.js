const CHASE_CASHBACK = require("./cards/chase-cashback");
const DISCOVER_CASHBACK = require("./cards/discover-cashback");

let test = new DISCOVER_CASHBACK();
test.getCalendar((err, result) => {
    console.log('result: ', result);
});

let cal = new CHASE_CASHBACK();
cal.getCalendar((err, result) => {
    // console.log('result: ', result);
});

module.exports.getChaseCashBackCal = (callback) => {
    let cal = new CHASE_CASHBACK();
    return cal.getCalendar(callback);
};
