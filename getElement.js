const { po } = require('@cucumber-e2e/po2');
const memory = require('@cucumber-e2e/memory2');

module.exports = async function (alias) {
    return po.getElement(memory.getValue(alias));
}
