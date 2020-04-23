const CHASE_CASHBACK = require("./cards/chase-cash-back");
const DISCOVER_CASHBACK = require("./cards/discover-cash-back");
const ALL_CHASE_CARDS = require("./cards/chase");

module.exports.getDiscoverCashBackCal = async () => {
    let discover = new DISCOVER_CASHBACK();
    return discover.getCalendar();
};

module.exports.getChaseCashBackCal = async () => {
    let chase = new CHASE_CASHBACK();
    return chase.getCalendar();
};

module.exports.getAllChaseCards = async () => {
    let allChaseCards = new ALL_CHASE_CARDS();
    return allChaseCards.getCards();
}
