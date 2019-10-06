const CHASE_CASHBACK = require("./cards/chase-cash-back");
const DISCOVER_CASHBACK = require("./cards/discover-cash-back");


module.exports.getDiscoverCashBackCal = (callback) => {
    let cal = new DISCOVER_CASHBACK();
    return cal.getCalendar(callback);
};

module.exports.getChaseCashBackCal = async () => {
    let rpCal = new CHASE_CASHBACK();
    return await rpCal.getCal();
};

async function testFunction() {
    let rpCal = new CHASE_CASHBACK();
    return await rpCal.getCal();
}

testFunction().then((data) => {
    console.log('data: ', data);
}).catch((err) => {
    console.log('err: ', err);
});

