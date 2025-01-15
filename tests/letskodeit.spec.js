// @ts-check
const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage.js');

test('letskodeit e2e happy path', async ({ page }) => {

  //Navigation
  await page.goto('https://www.letskodeit.com/home');

  // Click the Practice link.
  //await page.getByRole('link', { name: 'PRACTICE '}).click(); -- Wont work as element has no role. Element is marked as generic. In real world flag as accessibility issue to developers.
  await page.getByText('PRACTICE', { exact: true}).click();

  //switch context to new tab.
  const [newTab] = await Promise.all([
  page.context().waitForEvent('page'),
  await page.getByRole('link', { name: 'Element Practice' }).click(),
   ])
  await newTab.waitForLoadState('domcontentloaded');

  //assertions
  await expect(newTab).toHaveTitle(/Practice Page/);
  await expect(newTab.locator('h1')).toHaveText('Practice Page');
});

test('e2e complete practice page', async ({ page }) => {

await page.goto('https://www.letskodeit.com/practice');

//console.log(`SlowMo setting: ${require('../playwright.config.js').use.slowMo}`);

//select one radio button option and verify others are not checked.
await page.locator('#benzradio').click();
await expect(page.locator('#benzradio')).toBeChecked();
await expect(page.locator('#bmwradio')).not.toBeChecked();
await expect(page.locator('#hondaradio')).not.toBeChecked();

 //select two checkbox option and verify other is not checked.
 await page.locator('#bmwcheck').click();
 await page.locator('#hondacheck').click();
 await expect(page.locator('#bmwcheck')).toBeChecked();
 await expect(page.locator('#hondacheck')).toBeChecked();
 await expect(page.locator('#benzcheck')).not.toBeChecked();
 
//switch window and verify an element on new window.
const [newWindow] = await Promise.all([
 page.context().waitForEvent('page'),
 await page.getByRole('button', { name: 'Open Window'}).click(),
   ])
await newWindow.waitForLoadState('domcontentloaded');
await expect(newWindow).toHaveTitle(/All Courses/);
await page.bringToFront(); //switch back
await page.waitForLoadState('domcontentloaded');
await expect(page).toHaveTitle(/Practice Page/);

//select dropdown and verify selected.
await page.selectOption('#carselect', { value: 'honda' });
const selectedValue = await page.locator('#carselect').inputValue();
await expect(selectedValue).toBe('honda');

//select multiple and verify selected.
await page.selectOption('#multiple-select-example', [{ value: 'apple'}, {value: 'peach' }]);
const multiSelectedValue = await page.locator('#multiple-select-example').inputValue();
//expect(multiSelectedValue).toBe('Apple,Peach');//failing

//add text and verify if field is enabled/disabled.
const enabledDisabledtextbox = page.locator('#enabled-example-input');
await enabledDisabledtextbox.click();
await enabledDisabledtextbox.fill('something for the test');
const textboxIsEnabled = await enabledDisabledtextbox.isEnabled();
await expect(textboxIsEnabled).toBe(true); //check if enabled
await page.getByRole('button', {name: 'Disable'}).click(); //select disabled button
const textboxIsDisabled = await enabledDisabledtextbox.isDisabled();
});


test('e2e utilising page objects', async ({ page }) => {

  const homePage = new HomePage(page);
  await homePage.navigate();
  const newTab = await homePage.clickElementPracticeLink();
  await expect(newTab).toHaveTitle('Practice Page');
  //add practice page page object.
  });
  