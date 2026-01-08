import { test, expect } from '@playwright/test';

test('Open new window and navigate back', async ({context, page}) => {
    await page.goto('http://localhost:52330/tests/cookies/index.html');
    const pagePromise = context.waitForEvent('page');
    await page.getByRole('button', { name: 'Open New Window' }).click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    console.log(await newPage.title());
    await expect(newPage.getByRole('heading', {name: 'Welcome to the New Page'})).toBeVisible();
});

test('Add Cookie', async ({page}) => {
    await page.goto('http://localhost:52330/tests/cookies/index.html');
    await page.getByRole('button', { name: 'Set Cookie' }).click();
    const cookies = await page.context().cookies('http://localhost:52330/tests/cookies/index.html');
    const sessionCookie = cookies.find(cookies => cookies.name === 'session');
    console.log('sessionCookie', sessionCookie);
    expect(sessionCookie).toBeDefined();
});

test('Delete Cookie', async ({page}) => {
    await page.goto('http://localhost:52330/tests/cookies/index.html');
    await page.getByRole('button', { name: 'Set Cookie' }).click();
    const cookies = await page.context().cookies('http://localhost:52330/tests/cookies/index.html');
    const sessionCookie = cookies.find(cookies => cookies.name === 'session');
    console.log('sessionCookie', sessionCookie);
    
    await page.getByRole('button', { name: 'Delete Cookie' }).click();
    const deletedCookies = await page.context().cookies('http://localhost:52330/tests/cookies/index.html');
    const deletedSessionCookie = deletedCookies.find(cookies => cookies.name === 'session');
    console.log('sessionCookie', deletedSessionCookie);
    expect(deletedSessionCookie).toBeUndefined();
});