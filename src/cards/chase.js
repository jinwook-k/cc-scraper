const axios = require('axios');
const cheerio = require('cheerio');

const CHASE_ALL_CARDS = 'https://creditcards.chase.com/all-credit-cards';

class AllChaseCards {

    async getBody() {
        let $ = cheerio.load((await this.requestBody(CHASE_ALL_CARDS)).data);
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

        return cards;
    }

    /**
     * Makes a get request to a web page from the url passed
     * @private
     * @param {string} url The URL to scrape data from the web page
     * @return {Object} $ The body of web page
     */
    async requestBody(url) {
        return await axios.get(url).catch((err) => {
            console.error(`Error: ${err}, when connecting to ${url}.`)
        });
    }
}

module.exports = AllChaseCards;
