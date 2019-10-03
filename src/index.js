const CHASE_CASHBACK = require("./cards/chase-cash-back");
const DISCOVER_CASHBACK = require("./cards/discover-cash-back");


module.exports.getChaseCashBackCal = (callback) => {
    let cal = new CHASE_CASHBACK();
    return cal.getCalendar(callback);
};

module.exports.getDiscoverCashBackCal = (callback) => {
    let cal = new DISCOVER_CASHBACK();
    return cal.getCalendar(callback);
};

module.exports.getPromiseCalendar= async () => {
    let rpCal = new CHASE_CASHBACK();
    return await rpCal.getPromiseCalendar();
};

async function testFunction() {
    let rpCal = new CHASE_CASHBACK();
    return await rpCal.getPromiseCalendar();
}

testFunction().then((data) => {
    console.log('data: ', data);
}).catch((err) => {
    console.log('err: ', err);
});

