import { test, expect } from '@playwright/test';

test('Open Alert', async ({page}) => {
    await page.goto('/tests/alerts/index.html');

    let alertMessage = '';

    page.on('dialog', async(dialog) => {
        expect(dialog.type()).toBe('alert');
        alertMessage = dialog.message();
        await dialog.accept();
    })
    await page.getByRole('button', { name: 'Show Alert' }).click();
    expect(alertMessage).toBe('This is a simple alert.');
});

test('Confirm Alert', async ({page}) => {
    await page.goto('/tests/alerts/index.html');

    let alertMessage = '';

    page.on('dialog', async(dialog) => {
        alertMessage = dialog.message();
        await dialog.dismiss();
    })
    await page.getByRole('button', { name: 'Show Confirm-Alert' }).click();
    expect(alertMessage).toBe('You clicked Cancel.');
});

test('Handling POP-UPs', async ({page}) => {

    await page.goto('/tests/alerts/index.html');

    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('button', { name: 'Open Pop-up' }).click(),
    ]);

    await popup.waitForLoadState();
    await popup.close();
});

