const { expect } = require('@playwright/test');

async function gotoApp(page) {
  await page.goto('/index.html');
  await expect(page).toHaveTitle(/Sutsumu/i);
  await expect(page.locator('h1')).toHaveText('Sutsumu');
}

async function expectToast(page, text) {
  await expect(page.locator('#toastContainer')).toContainText(text);
}

async function fillEditor(locator, text) {
  await locator.click();
  await locator.fill('');
  await locator.fill(text);
}

async function createDocument(page, { title, content = '', tags = '', category = '' }) {
  await page.locator('#docName').fill(title);
  await fillEditor(page.locator('#docContent'), content);
  if (category) {
    await page.locator('#docCategory').selectOption({ label: category });
  }
  if (tags) {
    await page.locator('#docTags').fill(tags);
  }
  await page.locator('#addDocBtn').click();
  await expectToast(page, 'Document afegit');
  await expect(page.locator('#list li').filter({ hasText: title }).first()).toBeVisible();
}

async function openDocumentFromTree(page, title) {
  await page.locator('#list li').filter({ hasText: title }).first().locator('.item-title').click();
  await expect(page.locator('#editSaveBtn')).toBeVisible();
  await expect(page.locator('#editName')).toHaveValue(title);
}

module.exports = {
  gotoApp,
  expectToast,
  fillEditor,
  createDocument,
  openDocumentFromTree
};
