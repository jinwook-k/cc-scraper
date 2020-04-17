const rp = require('request-promise');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const utils = require('./utils');

const CHASE_ALL_CARDS = 'https://creditcards.chase.com/all-credit-cards';
const CHASE_DOMAIN = "https://creditcards.chase.com";

class AllChaseCards {

    async getBody() {
        let $ = cheerio.load((await this.requestBody(CHASE_ALL_CARDS)).data);
        // console.log($(".card-art"));
        // let $ = cheerio.load(await this.requestBody(CHASE_ALL_CARDS));
        let titles = $(".card-art");
        let cardLink, title;
        let cards = [];
        titles.each(function () {
            title = ($(this).find('.name-link').text().trim());
            cardLink = ($(this).find('.art-link img').attr('src'));

            cards.push({
                name: title,
                link: cardLink
            })
        });

        for (let card of cards) {
            this.downloadImage(card.name, card.link);
        }
    }

    async downloadImage(title, imgPath) {
        title = utils.lettersOnly(title).toLowerCase();
        const url = `${CHASE_DOMAIN}${imgPath}`;
        const writePath = path.resolve(__dirname, 'images', `${title}.png`);
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

    /**
     * Makes a get request to a web page from the url passed
     * @private
     * @param {string} url The URL to scrape data from the web page
     * @return {Object} $ The body of web page
     */
    async requestBody(url) {
        let options = {
            method: "get",
            url: url
        };

        // return await axios.get(url);
        return await axios.get(url).catch((err) => {
            console.error(`Error: ${err}, when connecting to ${url}.`)
        });
    }

}

module.exports = AllChaseCards;
