const rp = require('request-promise');
const cheerio = require('cheerio');

const CHASE_ALL_CARDS = 'https://creditcards.chase.com/all-credit-cards';
const CHASE_DOMAIN = "https://creditcards.chase.com";

class AllChaseCards {

    async getBody() {
        let $ = await this.requestBody(CHASE_ALL_CARDS);
        let titles = $(".card-art");
        titles.each(function() {
            let title = ($(this).find('.name-link').text().trim());
            console.log('title: ', title);

            let artLink = ($(this).find('.art-link img').attr('src'));
            console.log('artLink: ', artLink);
        });
    }

    /**
     * Makes a get request to a web page from the url passed
     * @private
     * @param {string} url The URL to scrape data from the web page
     * @return {Object} $ The body of web page
     */
    async requestBody(url) {
        let options = {
            uri: url,
            transform: (body) => {
                return cheerio.load(body);
            }
        };

        return await rp(options).catch((err) => {
            console.error(`Error: ${err}, when connecting to ${url}.`)
        });
    }

}

module.exports = AllChaseCards;
