const { test, expect } = require('@playwright/test');
const {
  gotoApp,
  expectToast,
  fillEditor,
  createDocument,
  createBinaryAttachmentDocument,
  openDocumentFromTree,
  installExternalBackupStub
} = require('./helpers');

test('creates, edits and reopens a document without losing content', async ({ page }) => {
  await gotoApp(page);
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
  await gotoApp(page);
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

test('exports a sync payload base without mixing in local-only state', async ({ page }, testInfo) => {
  await gotoApp(page);

  await page.locator('.tab-btn[data-target="tab-folder"]').click();
  await page.locator('#folderName').fill('Regressio Sync Folder');
  await page.locator('#addFolderBtn').click();
  await expectToast(page, 'Carpeta creada');

  await page.locator('.tab-btn[data-target="tab-document"]').click();
  await createDocument(page, {
    title: 'Regressio Sync Document',
    content: 'Contingut per al payload base',
    tags: 'sync, base'
  });

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#downloadSyncPayloadBtn').click();
  await expectToast(page, 'Payload base de sync preparat');

  const payloadPath = testInfo.outputPath('sync-payload-base.json');
  const download = await downloadPromise;
  await download.saveAs(payloadPath);

  const payload = JSON.parse(require('fs').readFileSync(payloadPath, 'utf8'));
  expect(payload.schema).toBe('sutsumu-cloud-sync-payload');
  expect(payload.scope.workspaceMode).toBe('single-primary-workspace');
  expect(payload.contract.syncableCollections).toContain('documents');
  expect(payload.contract.localOnlyCollections).toContain('expandedFolders');
  expect(payload.snapshot.docs.map(item => item.title)).toEqual(expect.arrayContaining(['Regressio Sync Folder', 'Regressio Sync Document']));
  expect(Object.prototype.hasOwnProperty.call(payload.snapshot, 'expandedFolders')).toBe(false);
  expect(Object.prototype.hasOwnProperty.call(payload, 'recentDocs')).toBe(false);
});

test('builds local shadow revisions and exports an immutable shadow bundle', async ({ page }, testInfo) => {
  await gotoApp(page);

  const title = 'Regressio Shadow Sync';
  await createDocument(page, {
    title,
    content: 'Primera base shadow',
    tags: 'shadow, sync'
  });

  await page.locator('#forceShadowRevisionBtn').click();
  await expectToast(page, 'Revisió shadow preparada');

  await openDocumentFromTree(page, title);
  await fillEditor(page.locator('#editContent'), 'Segona base shadow');
  await page.locator('#editSaveBtn').click();
  await expectToast(page, 'Canvis desats correctament');

  await page.locator('#forceShadowRevisionBtn').click();
  await expectToast(page, 'Revisió shadow preparada');
  await expect(page.locator('#syncShadowQueueValue')).toContainText('2');

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#exportShadowBundleBtn').click();
  await expectToast(page, 'Bundle shadow exportat');
  const download = await downloadPromise;
  const bundlePath = testInfo.outputPath('shadow-sync-bundle.json');
  await download.saveAs(bundlePath);

  const bundle = JSON.parse(require('fs').readFileSync(bundlePath, 'utf8'));
  expect(bundle.schema).toBe('sutsumu-cloud-sync-shadow-bundle');
  expect(Array.isArray(bundle.revisions)).toBeTruthy();
  expect(bundle.revisions.length).toBeGreaterThanOrEqual(2);
  expect(bundle.revisions[0].payload.schema).toBe('sutsumu-cloud-sync-payload');
  expect(Object.prototype.hasOwnProperty.call(bundle.revisions[0].payload.snapshot, 'expandedFolders')).toBe(false);

  const revisionIds = new Set(bundle.revisions.map(entry => entry.revisionId));
  const chainedRevision = bundle.revisions.find(entry => entry.baseRevisionId && revisionIds.has(entry.baseRevisionId));
  expect(Boolean(chainedRevision)).toBeTruthy();
});

test('imports a remote shadow bundle and detects a remote head safely', async ({ page, browser }, testInfo) => {
  await gotoApp(page);

  await createDocument(page, {
    title: 'Regressio Remot Seguro',
    content: 'Head remot de prova',
    tags: 'remote, shadow'
  });

  await page.locator('#forceShadowRevisionBtn').click();
  await expectToast(page, 'Revisió shadow preparada');

  const exportPromise = page.waitForEvent('download');
  await page.locator('#exportShadowBundleBtn').click();
  await expectToast(page, 'Bundle shadow exportat');
  const exportDownload = await exportPromise;
  const bundlePath = testInfo.outputPath('remote-shadow-bundle.json');
  await exportDownload.saveAs(bundlePath);

  const remoteContext = await browser.newContext();
  const remotePage = await remoteContext.newPage();
  await gotoApp(remotePage);
  await remotePage.locator('#remoteShadowFileInput').setInputFiles(bundlePath);
  await expectToast(remotePage, 'Bundle remot importat');
  await expect(remotePage.locator('#syncRemoteBadge')).toContainText('Remot disponible');
  await expect(remotePage.locator('#syncRemoteStatusText')).toContainText('revisió remota disponible');
  await remoteContext.close();
});

test('connects a remote shadow URL and compares it safely', async ({ page, browser }, testInfo) => {
  await gotoApp(page);

  await createDocument(page, {
    title: 'Regressio URL Remota',
    content: 'Bundle remot via URL',
    tags: 'remote, url'
  });

  await page.locator('#forceShadowRevisionBtn').click();
  await expectToast(page, 'Revisió shadow preparada');

  const exportPromise = page.waitForEvent('download');
  await page.locator('#exportShadowBundleBtn').click();
  await expectToast(page, 'Bundle shadow exportat');
  const exportDownload = await exportPromise;
  const bundlePath = testInfo.outputPath('remote-shadow-url-bundle.json');
  await exportDownload.saveAs(bundlePath);
  const bundleBody = require('fs').readFileSync(bundlePath, 'utf8');

  const remoteContext = await browser.newContext();
  await remoteContext.route('https://shadow.example/sutsumu.json', route => route.fulfill({
    status: 200,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    },
    body: bundleBody
  }));
  const remotePage = await remoteContext.newPage();
  await gotoApp(remotePage);
  await remotePage.locator('#remoteShadowUrl').fill('https://shadow.example/sutsumu.json');
  await remotePage.locator('#connectRemoteShadowUrlBtn').click();
  await expectToast(remotePage, 'URL remota connectada');
  await expect(remotePage.locator('#syncRemoteBadge')).toContainText('Remot disponible');
  await expect(remotePage.locator('#syncRemoteSourceValue')).toContainText('https://shadow.example/sutsumu.json');
  await remoteContext.close();
});

test('connects a provider head endpoint and resolves the remote bundle safely', async ({ page, browser }, testInfo) => {
  await gotoApp(page);

  await createDocument(page, {
    title: 'Regressio Provider Head',
    content: 'Remote provider head endpoint',
    tags: 'provider, head'
  });

  await page.locator('#forceShadowRevisionBtn').click();
  await expectToast(page, 'Revisió shadow preparada');

  const exportPromise = page.waitForEvent('download');
  await page.locator('#exportShadowBundleBtn').click();
  await expectToast(page, 'Bundle shadow exportat');
  const exportDownload = await exportPromise;
  const bundlePath = testInfo.outputPath('provider-head-bundle.json');
  await exportDownload.saveAs(bundlePath);
  const bundleBody = require('fs').readFileSync(bundlePath, 'utf8');
  const bundle = JSON.parse(bundleBody);
  const latestRevision = bundle.revisions[0];

  const remoteContext = await browser.newContext();
  await remoteContext.route('https://provider.example/head.json', route => route.fulfill({
    status: 200,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    },
    body: JSON.stringify({
      schema: 'sutsumu-cloud-sync-provider-head',
      provider: 'generic-rest',
      workspaceId: latestRevision.workspaceId,
      workspaceName: latestRevision.workspaceName,
      headRevisionId: latestRevision.revisionId,
      payloadSignature: latestRevision.payloadSignature,
      bundleUrl: 'https://provider.example/bundle.json'
    })
  }));
  await remoteContext.route('https://provider.example/bundle.json', route => route.fulfill({
    status: 200,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    },
    body: bundleBody
  }));

  const remotePage = await remoteContext.newPage();
  await gotoApp(remotePage);
  await remotePage.locator('#remoteShadowMode').selectOption('provider-head-url');
  await remotePage.locator('#remoteShadowUrl').fill('https://provider.example/head.json');
  await remotePage.locator('#connectRemoteShadowUrlBtn').click();
  await expectToast(remotePage, 'URL remota connectada');
  await expect(remotePage.locator('#syncRemoteBadge')).toContainText('Remot disponible');
  await expect(remotePage.locator('#syncRemoteSourceValue')).toContainText('head:https://provider.example/head.json');
  await remoteContext.close();
});

test('connects a Supabase-ready provider profile and keeps local auth after reload', async ({ page, browser }, testInfo) => {
  await gotoApp(page);

  await createDocument(page, {
    title: 'Regressio Supabase Head',
    content: 'Perfil local amb auth preparada per backend real',
    tags: 'supabase, provider'
  });

  await page.locator('#forceShadowRevisionBtn').click();
  await expectToast(page, 'Revisió shadow preparada');

  const exportPromise = page.waitForEvent('download');
  await page.locator('#exportShadowBundleBtn').click();
  await expectToast(page, 'Bundle shadow exportat');
  const exportDownload = await exportPromise;
  const bundlePath = testInfo.outputPath('provider-supabase-bundle.json');
  await exportDownload.saveAs(bundlePath);
  const bundleBody = require('fs').readFileSync(bundlePath, 'utf8');
  const bundle = JSON.parse(bundleBody);
  const latestRevision = bundle.revisions[0];

  const headRequests = [];
  const bundleRequests = [];
  const remoteContext = await browser.newContext();
  await remoteContext.route('https://supabase.example/head.json', route => {
    headRequests.push(route.request().headers());
    return route.fulfill({
      status: 200,
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*'
      },
      body: JSON.stringify({
        schema: 'sutsumu-cloud-sync-provider-head',
        provider: 'supabase-rest',
        workspaceId: latestRevision.workspaceId,
        workspaceName: latestRevision.workspaceName,
        headRevisionId: latestRevision.revisionId,
        payloadSignature: latestRevision.payloadSignature,
        bundleUrl: 'https://supabase.example/bundle.json'
      })
    });
  });
  await remoteContext.route('https://supabase.example/bundle.json', route => {
    bundleRequests.push(route.request().headers());
    return route.fulfill({
      status: 200,
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*'
      },
      body: bundleBody
    });
  });

  const remotePage = await remoteContext.newPage();
  await gotoApp(remotePage);
  await remotePage.locator('#remoteShadowMode').selectOption('provider-head-url');
  await remotePage.locator('#remoteProviderPreset').selectOption('supabase');
  await remotePage.locator('#remoteProviderPublicKey').fill('public-anon-key');
  await remotePage.locator('#remoteProviderSecret').fill('user-session-token');
  await remotePage.locator('#remoteProviderRememberSecret').check();
  await remotePage.locator('#remoteShadowUrl').fill('https://supabase.example/head.json');
  await remotePage.locator('#connectRemoteShadowUrlBtn').click();
  await expectToast(remotePage, 'URL remota connectada');
  await expect(remotePage.locator('#syncRemoteSourceValue')).toContainText('head:https://supabase.example/head.json');

  expect(headRequests[0].apikey).toBe('public-anon-key');
  expect(headRequests[0].authorization).toBe('Bearer user-session-token');
  expect(bundleRequests[0].apikey).toBe('public-anon-key');
  expect(bundleRequests[0].authorization).toBe('Bearer user-session-token');

  await remotePage.reload();
  await expect(remotePage.locator('#syncRemoteSourceValue')).toContainText('head:https://supabase.example/head.json');
  await expect(remotePage.locator('#syncRemoteBadge')).not.toContainText('Sense remot');
  expect(headRequests.length).toBeGreaterThanOrEqual(2);

  await remoteContext.close();
});

test('connects a PostgREST-style Supabase head row safely', async ({ page, browser }, testInfo) => {
  await gotoApp(page);

  await createDocument(page, {
    title: 'Regressio Supabase PostgREST',
    content: 'Resposta row-style compatible amb backend real',
    tags: 'supabase, postgrest'
  });

  await page.locator('#forceShadowRevisionBtn').click();
  await expectToast(page, 'Revisió shadow preparada');

  const exportPromise = page.waitForEvent('download');
  await page.locator('#exportShadowBundleBtn').click();
  await expectToast(page, 'Bundle shadow exportat');
  const exportDownload = await exportPromise;
  const bundlePath = testInfo.outputPath('provider-postgrest-bundle.json');
  await exportDownload.saveAs(bundlePath);
  const bundleBody = require('fs').readFileSync(bundlePath, 'utf8');
  const bundle = JSON.parse(bundleBody);
  const latestRevision = bundle.revisions[0];

  const headRequests = [];
  const remoteContext = await browser.newContext();
  await remoteContext.route('https://postgrest.example/head', route => {
    headRequests.push(route.request().headers());
    return route.fulfill({
      status: 200,
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*'
      },
      body: JSON.stringify([{
        provider: 'supabase-rest',
        workspace_id: latestRevision.workspaceId,
        name: latestRevision.workspaceName,
        current_revision_id: latestRevision.revisionId,
        payload_signature: latestRevision.payloadSignature,
        bundle_url: 'https://postgrest.example/bundle.json'
      }])
    });
  });
  await remoteContext.route('https://postgrest.example/bundle.json', route => route.fulfill({
    status: 200,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    },
    body: bundleBody
  }));

  const remotePage = await remoteContext.newPage();
  await gotoApp(remotePage);
  await remotePage.locator('#remoteShadowMode').selectOption('provider-head-url');
  await remotePage.locator('#remoteProviderPreset').selectOption('supabase');
  await remotePage.locator('#remoteProviderPublicKey').fill('public-anon-key');
  await remotePage.locator('#remoteShadowUrl').fill('https://postgrest.example/head');
  await remotePage.locator('#connectRemoteShadowUrlBtn').click();
  await expectToast(remotePage, 'URL remota connectada');
  await expect(remotePage.locator('#syncRemoteBadge')).toContainText('Remot disponible');
  await expect(remotePage.locator('#syncRemoteSourceValue')).toContainText('head:https://postgrest.example/head');
  expect(headRequests[0].apikey).toBe('public-anon-key');
  expect(headRequests[0].authorization).toBe('Bearer public-anon-key');

  await remoteContext.close();
});

test('builds a Supabase REST head query from project settings safely', async ({ page, browser }, testInfo) => {
  await gotoApp(page);

  await createDocument(page, {
    title: 'Regressio Supabase Builder',
    content: 'Construccio automatica de query head',
    tags: 'supabase, builder'
  });

  await page.locator('#forceShadowRevisionBtn').click();
  await expectToast(page, 'Revisió shadow preparada');

  const exportPromise = page.waitForEvent('download');
  await page.locator('#exportShadowBundleBtn').click();
  await expectToast(page, 'Bundle shadow exportat');
  const exportDownload = await exportPromise;
  const bundlePath = testInfo.outputPath('provider-supabase-builder-bundle.json');
  await exportDownload.saveAs(bundlePath);
  const bundleBody = require('fs').readFileSync(bundlePath, 'utf8');
  const bundle = JSON.parse(bundleBody);
  const latestRevision = bundle.revisions[0];

  let capturedUrl = '';
  let capturedHeaders = null;
  const remoteContext = await browser.newContext();
  await remoteContext.route('https://builder.supabase.co/rest/v1/sutsumu_workspace_heads*', route => {
    capturedUrl = route.request().url();
    capturedHeaders = route.request().headers();
    return route.fulfill({
      status: 200,
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*'
      },
      body: JSON.stringify([{
        provider: 'supabase-rest',
        local_workspace_id: latestRevision.workspaceId,
        name: latestRevision.workspaceName,
        current_revision_id: latestRevision.revisionId,
        payload_signature: latestRevision.payloadSignature,
        bundle_url: 'https://builder.supabase.co/storage/v1/object/public/sync/bundle.json'
      }])
    });
  });
  await remoteContext.route('https://builder.supabase.co/storage/v1/object/public/sync/bundle.json', route => route.fulfill({
    status: 200,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    },
    body: bundleBody
  }));

  const remotePage = await remoteContext.newPage();
  await gotoApp(remotePage);
  await remotePage.locator('#remoteShadowMode').selectOption('provider-head-url');
  await remotePage.locator('#remoteProviderPreset').selectOption('supabase');
  await remotePage.locator('#remoteProviderPublicKey').fill('public-anon-key');
  await remotePage.locator('#remoteProviderBaseUrl').fill('https://builder.supabase.co');
  await remotePage.locator('#remoteProviderWorkspaceId').fill(latestRevision.workspaceId);
  await remotePage.locator('#remoteShadowUrl').fill('');
  await remotePage.locator('#connectRemoteShadowUrlBtn').click();
  await expectToast(remotePage, 'URL remota connectada');
  await expect(remotePage.locator('#syncRemoteBadge')).toContainText('Remot disponible');

  const builtUrl = new URL(capturedUrl);
  expect(builtUrl.pathname).toBe('/rest/v1/sutsumu_workspace_heads');
  expect(builtUrl.searchParams.get('local_workspace_id')).toBe(`eq.${latestRevision.workspaceId}`);
  expect(builtUrl.searchParams.get('limit')).toBe('1');
  expect(builtUrl.searchParams.get('select')).toContain('local_workspace_id');
  expect(capturedHeaders.apikey).toBe('public-anon-key');
  expect(capturedHeaders.authorization).toBe('Bearer public-anon-key');

  await remoteContext.close();
});

test('writes an automatic external backup and keeps the last good copy if the app becomes empty', async ({ page }) => {
  await installExternalBackupStub(page);
  await gotoApp(page);

  await createDocument(page, {
    title: 'Regressio Backup Extern',
    content: 'Contingut que ha d acabar fora del navegador',
    tags: 'external, backup'
  });

  await page.locator('#connectExternalBackupBtn').click();
  await expectToast(page, 'Còpia externa desada');
  await expect(page.locator('#externalBackupStatusText')).toContainText('Backup extern actiu');

  const firstBackup = await page.evaluate(() => window.__sutsumuExternalBackupLastWrite);
  expect(firstBackup).toContain('Regressio Backup Extern');

  await page.evaluate(async () => {
    const deleteDb = (name) => new Promise(resolve => {
      const request = indexedDB.deleteDatabase(name);
      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(true);
      request.onblocked = () => resolve(true);
    });
    await deleteDb('BentoApp');
    localStorage.removeItem('bento_simple_docs');
    localStorage.removeItem('bento_expanded_folders');
  });

  await page.reload();
  await expect(page.locator('#confirmTitle')).toContainText('Recuperar la còpia local de supervivència?');
  await page.locator('#confirmCancelBtn').click();
  await expect(page.locator('#externalBackupStatusText')).toContainText('Backup extern recordat');

  const writes = await page.evaluate(() => window.__sutsumuExternalBackupWrites.length);
  expect(writes).toBe(1);
});

test('recovers a lightweight attachment from the local survival mirror', async ({ page }) => {
  await gotoApp(page);

  const title = await createBinaryAttachmentDocument(page, {
    title: 'Regressio Adjunt Lleuger',
    fileName: 'mirall.bin',
    buffer: Buffer.from('adjunt lleuger protegit')
  });

  await expect(page.locator('#attachmentHealthText')).toContainText('còpia de supervivència local');

  await page.evaluate(async () => {
    const deleteDb = (name) => new Promise(resolve => {
      const request = indexedDB.deleteDatabase(name);
      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(true);
      request.onblocked = () => resolve(true);
    });
    await deleteDb('BentoApp');
    localStorage.removeItem('bento_simple_docs');
    localStorage.removeItem('bento_expanded_folders');
  });

  await page.reload();
  await expect(page.locator('#confirmTitle')).toContainText('Recuperar la còpia local de supervivència?');
  await page.locator('#confirmOkBtn').click();
  await expectToast(page, 'Còpia local recuperada correctament.');

  await openDocumentFromTree(page, title);
  await expect(page.locator('#mediaPreviewGroup')).toContainText('Descarregar Fitxer');
  await expect(page.locator('#mediaPreviewGroup')).not.toContainText('Fitxer no recuperable');
});

test('exports and reopens a portable workspace', async ({ page, browser }, testInfo) => {
  await gotoApp(page);
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
  await gotoApp(page);
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
  await gotoApp(page);
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
  await gotoApp(page);
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
  await gotoApp(page);
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


test('recovers documents from the survival mirror if IndexedDB is lost', async ({ page }) => {
  await gotoApp(page);
  const title = 'Regressio Supervivencia';
  await createDocument(page, {
    title,
    content: 'Document protegit pel mirall local',
    tags: 'survival'
  });

  const hasMirror = await page.evaluate(() => Boolean(localStorage.getItem('sutsumu_survival_light_backup_history_v1')));
  expect(hasMirror).toBeTruthy();

  await page.evaluate(async () => {
    const deleteDb = (name) => new Promise(resolve => {
      const request = indexedDB.deleteDatabase(name);
      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(true);
      request.onblocked = () => resolve(true);
    });
    await deleteDb('BentoApp');
    localStorage.removeItem('bento_simple_docs');
    localStorage.removeItem('bento_expanded_folders');
  });

  await page.reload();
  await expect(page.locator('#confirmTitle')).toContainText('Recuperar la còpia local de supervivència?');
  await page.locator('#confirmOkBtn').click();
  await expectToast(page, 'Còpia local recuperada correctament.');
  await expect(page.locator('#list li').filter({ hasText: title }).first()).toBeVisible();

  await page.goto('/recovery.html');
  await expect(page.locator('#survivalSummary')).toContainText('Còpia trobada');
  await expect(page.locator('#downloadSurvivalBtn')).toBeEnabled();
});
