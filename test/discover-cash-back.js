const discoverCal = require("../src/cards/discover-cash-back");

async function main() {
    let cal = new discoverCal();
    console.log(JSON.stringify(await cal.getCalendar(), null, 4));
}

main();