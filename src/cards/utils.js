class Utils {

    // Trims off excess whitespace within the texts of each node
    static sanitizeNodes(nodes) {
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
    };

    static removeNumsInStr(str) {
        return str.replace(/\d/g, '');
    }

    static getQuarterFromMonths(dateRange) {
        dateRange = dateRange.toLowerCase();
        if (dateRange.includes("jan") || dateRange.includes("mar")) {
            return 1;
        }
        else if (dateRange.includes("apr") || dateRange.includes("jun")) {
            return 2;
        }
        else if (dateRange.includes("jul") || dateRange.includes("sep")) {
            return 3;
        }
        else if (dateRange.includes("oct") || dateRange.includes("dec")) {
            return 4;
        }
    }

    static toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}

module.exports = Utils;
