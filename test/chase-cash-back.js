const chaseCal = require("../src/cards/chase-cash-back");

async function main() {
    let cal = new chaseCal();
    console.log(JSON.stringify(await cal.getCalendar(), null, 4));
}

main();