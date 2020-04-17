const AllChaseCards = require("../src/cards/chase");

async function main() {
    let cards = new AllChaseCards();
    console.log(await cards.getBody());
    // console.log(JSON.stringify(await cards.getBody(), null, 4));
}

main();