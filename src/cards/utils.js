class Utils {
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
}

module.exports = Utils;
