const CHASE_CASHBACK = require("./cards/chase-cash-back");
const DISCOVER_CASHBACK = require("./cards/discover-cash-back");


module.exports.getDiscoverCashBackCal = async () => {
    let cal = new DISCOVER_CASHBACK();
    return cal.getCalendar();
};

module.exports.getChaseCashBackCal = async () => {
    let rpCal = new CHASE_CASHBACK();
    return await rpCal.getCalendar();
};

async function testFunction() {
    let rpCal = new CHASE_CASHBACK();
    return await rpCal.getCalendar();
}

testFunction().then((data) => {
    console.log('data: ', data);
}).catch((err) => {
    console.log('err: ', err);
});

