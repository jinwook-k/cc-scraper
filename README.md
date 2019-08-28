# cc-scraper v?
The [cc-scraper](https://github.com/JinwookKim/cc-scraper) library is used as an npm module or [Node.js](https://nodejs.org/en/) module.


## installation
Using npm:
```javascript
npm i -s cc-scraper
```

In Node.js:
```javascript
// Load the cc-scraper library
const cards = require('cc-scraper');

// Get Chase's 5% Cash Back Calendar information
cards.getChaseCashBackCal((error, result) => {
    console.log('chase_result = ', result);
});

// Get Discover's 5% Cash Back Calendar information
cards.getDiscoverCashBackCal((error, result) => {
    console.log('discover_result = ', result);
});
```

Output (something similar to):
```javascript
chase_result = [ { quarter: 1,
    category: 'Gas Stations',
    terms:
     'Merchants in the Gas Stations category sell automotive gasoline that can be paid for either at the pump or inside the station, and may or may not sell other goods or services at their location. Please note that some merchants that do not specialize in selling automotive gasoline are not included in this category, for example, truck stops, boat marinas, oil and propane distributors, and home heating companies.' },
  ...
  { quarter: 3,
    category: 'Gas Stations',
    terms:
     'Merchants in the Gas Stations category sell automotive gasoline that can be paid for either at the pump or inside the station, and may or may not sell other goods or services at their location. Please note that some merchants that do not specialize in selling automotive gasoline are not included in this category, for example, truck stops, boat marinas, oil and propane distributors, and home heating companies.' },
  { quarter: 3,
    category: 'Select Streaming Services',
    terms:
     'Merchants in the Select Streaming Services category specialize in delivering music and video content over the internet.  Only subscriptions paid for or purchases made with the following select merchants will qualify for this offer: Netflix, Hulu, Sling, Vudu, FuboTV, Apple Music, SiriusXM, Pandora, Spotify.' } ]
     
discover_result = [ { quarter: 1,
                      category: 'Grocery Stores',
                      terms:
                       '<span>For Discover it<sup>&reg;</sup> and Discover<sup>&reg;</sup> More<sup>&reg;</sup> cardmembers only: Activate to earn 5% <i>Cashback Bonus</i> at stand-alone <span class=\'text-bold\'>Grocery Stores</span> from 1/1/19 &#40;or the date on which you activate 5%, whichever is later&#41; through 3/31/19, on up to $1,500 in purchases. Grocery purchases made at convenience stores, gas stations, warehouse clubs, discount stores, and supercenters (or at grocery stores associated with supercenters or discount stores) are not eligible. Purchases made at Walmart and Target are not eligible for 5% <i>Cashback Bonus</i>. Certain digital wallet transactions qualify for 5%, for more information see <a href=\'https://www.discover.com/credit-cards/digital-wallets/?vcmpgn=discover_digitalwallets\'>Discover.com/digitalwallets</a>. Purchases made using tap-and-pay, mobile or wireless card readers, virtual wallets or similar technology will not be eligible if the technology does not provide sufficient transaction details for rewards qualification. Rewards are added to your Cashback Bonus account within two billing periods. See Cashback Bonus Program Terms and Conditions for more information about your rewards.</span>' },
                    ...
                    { quarter: 4,
                      category: 'Amazon.com, Target and Walmart.com',
                      terms:
                       '<span>For Discover it<sup>&reg;</sup> and Discover<sup>&reg;</sup> More<sup>&reg;</sup> cardmembers only: Activate to earn 5% <i>Cashback Bonus</i> at <span class=\'text-bold\'>Amazon.com, Target, and Walmart.com</span> from 10/1/19 &#40;or the date on which you activate 5%, whichever is later&#41; through 12/31/19 on up to $1,500 in purchases. <span class=\'text-bold\'>Amazon.com</span> purchases include those made through the Amazon.com checkout, including digital downloads, Amazon.com gift cards, Amazon Fresh orders, Amazon Local Deals and Amazon Prime subscriptions and items sold by third party merchants through Amazon.com\'s marketplace. <span class=\'text-bold\'>Target</span> purchases include any purchase made online at Target.com, through the Target app, or in-store at Target. Individual merchants and stand-alone stores within physical Target locations or on Target.com may not be eligible in this category. <span class=\'text-bold\'>Walmart.com</span> purchases include those made at Walmart.com and when shopping through the Walmart app &#40;including Grocery Pick Up and Instore Pick Up&#41;. Purchases made in store at Walmart Stores, Walmart Supercenters, Neighborhood Markets and Walmart Pay are excluded from this promotion. Individual merchants and stand-alone stores within physical Walmart locations may not be eligible in this category. Certain digital wallet transactions qualify for 5%, for more information see <a href=\'https://www.discover.com/credit-cards/digital-wallets/?vcmpgn=discover_digitalwallets\'>Discover.com/digitalwallets</a>. Purchases made using tap-and-pay, mobile or wireless card readers, virtual wallets or similar technology will not be eligible if the technology does not provide sufficient transaction details for rewards qualification. Rewards are added to your Cashback Bonus account within two billing periods. See Cashback Bonus Program Terms and Conditions for more information about your rewards. Listed merchants are in no way sponsoring or affiliated with this program. Amazon, the Amazon.com logo and the smile logo are trademarks of Amazon or its Affiliates. Target and the Bullseye Design are registered trademarks of Target Brands, Inc.</span>' } ]
```
Quarter 1: January - March  
Quarter 2: April - June  
Quarter 3: July - September  
Quarter 4: October - December

There will be occasions where some quarters are missing. For example, in the output above is missing `quarter 4`. That is because on their website calendar, they haven't finalized quarter 4 categories that will attribute to the 5% cash back (at the time of this writing). Therefore, my code will neglect that quarter.   
