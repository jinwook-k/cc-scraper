const CHASE_CASHBACK = require("./cards/chase-cash-back");
const DISCOVER_CASHBACK = require("./cards/discover-cash-back");

module.exports.getDiscoverCashBackCal = async () => {
    let discover = new DISCOVER_CASHBACK();
    return discover.getCalendar();
};

module.exports.getChaseCashBackCal = async () => {
    let chase = new CHASE_CASHBACK();
    return chase.getCalendar();
};
