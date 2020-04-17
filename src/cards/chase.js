const axios = require('axios');
const cheerio = require('cheerio');

const CHASE_ALL_CARDS = 'https://creditcards.chase.com/all-credit-cards';
const CHASE_DOMAIN = "https://creditcards.chase.com";

class AllChaseCards {

    async getBody() {
        let $ = cheerio.load((await this.requestBody(CHASE_ALL_CARDS)).data);
        let titles = $(".card-art");
        let cards = [];
        titles.each(function () {
            let title = $(this).find('.name-link').text().trim();
            let cardLink = $(this).find('.art-link img').attr('src');
            let learnMorePath = $(this).find("a[data-lh-name=LearnMore]").attr('href');
            console.log('learnMore: ', learnMorePath);

            cards.push({
                name: title,
                link: `${CHASE_DOMAIN}${cardLink}`,
                learnMore: `${CHASE_DOMAIN}${learnMorePath}`
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
