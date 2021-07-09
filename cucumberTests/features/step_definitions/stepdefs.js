const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key, until, } = require('selenium-webdriver');
const { expect } = require('chai');

require('chromedriver');

const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false});
const driver = new Builder().withCapabilities(capabilities).build();

Given('user open To Do app', async function () {
    await driver.get('https://todomvc.com/examples/react/#/');
    await driver.wait(until.elementIsVisible(await driver.findElement(By.css('[class="todoapp"]'))), 5000, 'Fail to open app')
  });

When('user add To Do {string}', async function (value) {
    let input = await driver.findElement(By.css('[class="new-todo"]'))
    await driver.wait(until.elementIsVisible(input));
    await input.sendKeys(value, Key.ENTER);
    await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath(`//div[@class='view']/label[text() = '${value}']`))));
  });

Then('To Do {string} is added', async function (value) {
    expect(await (await driver.findElement(By.xpath(`//div[@class='view']/label[text() = '${value}']`))).isDisplayed())
      .to.be.true;
  });

When('delete icon next to {string} was clicked', async function (value) {
  await (await driver.findElement(By.xpath(`//label[text() = '${value}']//ancestor::li`))).click();
  await (await driver.findElement(By.xpath(`//label[text() = '${value}']/following-sibling::button`))).click();
});

Then('To Do {string} is deleted', async function (value) {
  let length = (await driver.findElements(By.xpath(`//label[text() = '${value}']/following-sibling::button`))).length
  expect(length).to.eq(0, `To DO item ${value} was not deleted`);
});

When('check {string} item', async function (value) {
  await (await driver.findElement(By.xpath(`//label[text() = '${value}']/preceding-sibling::input[@class="toggle"]`))).click();
});

Then('item {string} become checked', async function (value) {
  expect(await (await driver.findElement(By.xpath(`//label[text() = '${value}']//ancestor::li[@class="completed"]`))).isDisplayed())
      .to.be.true;
});

  AfterAll('end', async function(){
    await driver.quit();
});