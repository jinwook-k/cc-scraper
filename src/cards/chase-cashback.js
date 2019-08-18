const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function getChaseCashbackCal() {
    request("https://creditcards.chase.com/freedom-credit-cards/calendar", function(err, resp, body) {
        if (err) console.log(err);

        const dom = new JSDOM(body);
        const d = dom.window.document;

        let tiles = d.querySelectorAll('.calendar .tile');
        let calendar = makeDictionaryCalendar(tiles);
    });
}

function makeDictionaryCalendar(calendar) {
    let result = [];
    for (let tile of calendar) {
        let quarter = sanitizeNodes(tile.querySelector('.top'));
        let categories = sanitizeNodes(tile.querySelectorAll('.middle h2'));
        result.push({quarter, categories});
    }
    return result;
}

function sanitizeNodes(nodes) {
    if (nodes.length > 0) {
        let result = [];
        for (let node of nodes) {
            result.push(node.textContent.trim());
        }
        return result;
    }
    else {
        return nodes.textContent.trim();
    }
}

getChaseCashbackCal();
