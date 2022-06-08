const { Before, After, When } = require('@cucumber/cucumber');
const { remote } = require('webdriverio');
const memory = require('@cucumber-e2e/memory2');
const { po } = require('@cucumber-e2e/po2');
const getElement = require('./getElement');

Before(async function () {
    global.browser = await remote(config.browser);
    po.init(browser, { timeout: 10000 });
    po.register(config.pageObject);
});

After(async function() {
    await browser.deleteSession();
});

When(/open '(.+)' url/, async function(url) {
    const parsedUrl = memory.getValue(url);
    await browser.url(parsedUrl);
});

When(/type '(.*?)' to '(.+)'/, async function (value, alias) {
    const parsedValue = memory.getValue(value);
    const element = await getElement(alias);
    await element.waitForDisplayed();
    await element.addValue(parsedValue);
});

When(/^click '(.+?)'$/, async function(alias) {
    const element = await getElement(alias);
    await element.waitForDisplayed();
    await element.click();
});

When(/^clear '(.+?)'$/, async function(alias) {
    const element = await getElement(alias);
    await element.waitForDisplayed();
    await element.clearValue();
});
