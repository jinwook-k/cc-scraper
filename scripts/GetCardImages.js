const axios = require('axios');
const fs = require('fs');
const path = require('path');
const utils = require('../src/cards/utils');
const chaseFuncs = require('../src/cards/chase');
const CHASE_DOMAIN = "https://creditcards.chase.com";


async function main() {
    let chase = new chaseFuncs();
    let cards = await chase.getBody();

    for (let card of cards) {
        downloadImage(card.name, card.link);
    }
}

async function downloadImage(title, imgPath) {
    title = utils.lettersOnly(title).toLowerCase();
    const url = `${CHASE_DOMAIN}${imgPath}`;
    const writePath = path.resolve(__dirname, '../images', `${title}.png`);
    const writer = fs.createWriteStream(writePath);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    })
}

main();