const { test, expect } = require('@playwright/test');
const {
  gotoApp,
  expectToast,
  fillEditor,
  createDocument,
  openDocumentFromTree
} = require('./helpers');

test.beforeEach(async ({ page }) => {
  await gotoApp(page);
});

test('creates, edits and reopens a document without losing content', async ({ page }) => {
  const title = 'Regressio Document Principal';
  const initialContent = 'Text inicial de prova';
  const updatedContent = 'Text actualitzat de prova per validar la persistencia';

  await createDocument(page, {
    title,
    content: initialContent,
    tags: 'urgent, client'
  });

  await openDocumentFromTree(page, title);
  await fillEditor(page.locator('#editContent'), updatedContent);
  await page.locator('#editSaveBtn').click();
  await expectToast(page, 'Canvis desats correctament');

  await openDocumentFromTree(page, title);
  await expect(page.locator('#editContent')).toContainText(updatedContent);
});

test('supports tags, quick filters and command palette navigation', async ({ page }) => {
  const targetTitle = 'Regressio Etiquetes';
  const otherTitle = 'Regressio Secundari';

  await createDocument(page, {
    title: targetTitle,
    content: 'Document amb etiqueta i accessos rapids',
    tags: 'urgent, sprint'
  });
  await createDocument(page, {
    title: otherTitle,
    content: 'Document de control',
    tags: 'arxiu'
  });

  const targetRow = page.locator('#list li').filter({ hasText: targetTitle }).first();
  await targetRow.locator('.item-pin-btn').click();
  await targetRow.locator('.item-flag-btn').click();

  await page.locator('[data-type-filter="favorite"]').click();
  await expect(page.locator('#list li').filter({ hasText: targetTitle })).toHaveCount(1);
  await expect(page.locator('#list li').filter({ hasText: otherTitle })).toHaveCount(0);

  await page.locator('#tagFilterList .tag-filter-chip', { hasText: '#urgent' }).click();
  await expect(page.locator('#listFilterBar')).toContainText('Etiqueta: #urgent');
  await expect(page.locator('#list li').filter({ hasText: targetTitle })).toHaveCount(1);

  await page.locator('#listFilterBar [data-clear-filter="all"]').click();
  await page.locator('#openCommandPaletteBtn').click();
  await page.locator('#commandPaletteInput').fill(targetTitle);
  const paletteEntry = page.locator('#commandPaletteList .command-palette-item').filter({ hasText: targetTitle }).first();
  await expect(paletteEntry).toBeVisible();
  await paletteEntry.click();
  await expect(page.locator('#editName')).toHaveValue(targetTitle);
});

test('exports and reopens a portable workspace', async ({ page, browser }, testInfo) => {
  const title = 'Regressio Workspace';
  await createDocument(page, {
    title,
    content: 'Contingut del workspace portable',
    tags: 'workspace'
  });

  const workspacePath = testInfo.outputPath('workspace-portable.json');
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#saveWorkspaceBtn').click();
  const download = await downloadPromise;
  await download.saveAs(workspacePath);

  const freshContext = await browser.newContext();
  const freshPage = await freshContext.newPage();
  await gotoApp(freshPage);
  await freshPage.locator('#workspaceFileInput').setInputFiles(workspacePath);
  await expectToast(freshPage, 'Workspace obert');
  await expect(freshPage.locator('#list li').filter({ hasText: title }).first()).toBeVisible();
  await freshContext.close();
});

test('exports data and restores it through JSON import', async ({ page, browser }, testInfo) => {
  const title = 'Regressio Export Import';
  const content = 'Aquest document ha de sobreviure a exportacio i importacio';
  await createDocument(page, {
    title,
    content,
    tags: 'backup'
  });

  const backupPath = testInfo.outputPath('backup-complet.json');
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#exportBtn').click();
  const download = await downloadPromise;
  await download.saveAs(backupPath);

  const freshContext = await browser.newContext();
  const freshPage = await freshContext.newPage();
  await gotoApp(freshPage);
  await freshPage.locator('#importFile').setInputFiles(backupPath);
  await expect(freshPage.locator('#confirmOkBtn')).toBeVisible();
  await freshPage.locator('#confirmOkBtn').click();
  await expectToast(freshPage, 'Còpia restaurada correctament.');
  await expect(freshPage.locator('#list li').filter({ hasText: title }).first()).toBeVisible();
  await openDocumentFromTree(freshPage, title);
  await expect(freshPage.locator('#editContent')).toContainText(content);
  await freshContext.close();
});

test('creates and lists a manual internal backup', async ({ page }) => {
  await createDocument(page, {
    title: 'Regressio Backup Intern',
    content: 'Dades per al backup intern',
    tags: 'backup, intern'
  });

  await page.locator('#backupNowBtn').click();
  await expectToast(page, 'Backup intern complet desat correctament.');

  await page.locator('#backupHistoryBtn').click();
  await expect(page.locator('#backupHistoryModal')).toBeVisible();
  await expect(page.locator('#backupHistoryList .versions-item-btn').first()).toBeVisible();
  await expect(page.locator('#backupPreviewStats')).toContainText('Documents');
});


test('restores a previous document version from history', async ({ page }) => {
  const title = 'Regressio Versions';
  const v1 = 'Primera versio del document';
  const v2 = 'Segona versio recuperable';
  const v3 = 'Tercera versio temporal';

  await createDocument(page, {
    title,
    content: v1,
    tags: 'versions'
  });

  await openDocumentFromTree(page, title);
  await fillEditor(page.locator('#editContent'), v2);
  await page.locator('#editSaveBtn').click();
  await expectToast(page, 'Canvis desats correctament');

  await openDocumentFromTree(page, title);
  await fillEditor(page.locator('#editContent'), v3);
  await page.locator('#editSaveBtn').click();
  await expectToast(page, 'Canvis desats correctament');

  await openDocumentFromTree(page, title);
  await page.locator('#editHistoryBtn').click();
  await expect(page.locator('#versionsModal')).toBeVisible();
  await expect(page.locator('#versionsList .versions-item-btn').first()).toBeVisible();
  await expect(page.locator('#versionPreviewContent')).toContainText(v2);
  await page.locator('#restoreVersionBtn').click();
  await expect(page.locator('#versionsModal')).toHaveClass(/hidden/);
  await expect(page.locator('#editContent')).toContainText(v2);
  await page.locator('#editSaveBtn').click();
  await expectToast(page, 'Canvis desats correctament');

  await openDocumentFromTree(page, title);
  await expect(page.locator('#editContent')).toContainText(v2);
});

test('moves a document to trash and restores it', async ({ page }) => {
  const title = 'Regressio Paperera';

  await createDocument(page, {
    title,
    content: 'Document per provar la paperera',
    tags: 'trash'
  });

  const row = page.locator('#list li').filter({ hasText: title }).first();
  await row.locator('button', { hasText: 'Eliminar' }).click();
  await expect(page.locator('#confirmOkBtn')).toBeVisible();
  await page.locator('#confirmOkBtn').click();
  await expectToast(page, 'Document mogut a la paperera');

  await page.locator('#trashBtn').click();
  const trashRow = page.locator('#list li').filter({ hasText: title }).first();
  await expect(trashRow).toBeVisible();
  await trashRow.locator('button', { hasText: 'Restaurar' }).click();
  await expectToast(page, 'Material restaurat correctament');

  await page.locator('#exitTrashBtn').click();
  await expect(page.locator('#list li').filter({ hasText: title }).first()).toBeVisible();
});
