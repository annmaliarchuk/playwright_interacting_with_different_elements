import { test, expect } from '@playwright/test';


test('Advanced Interactions', async ({ page }) => {
    await page.goto('/tests/advanced_iteractions/index.html');
    // Hover Action
    const hoverOverMe = page.locator('#hover-me');
    await hoverOverMe.hover();
    await expect(hoverOverMe).toContainText('Text Changed!');
    // Right Click Action
    const rightClick = page.getByRole('button', { name: 'Right-Click Me' });
    await rightClick.click({button: 'right'});
    await expect(page.getByText('Context Menu Appears!')).toBeVisible();
    // Double Click Action
    const doubleClick = page.getByRole('button', { name: 'Double-Click Me' });
    await doubleClick.dblclick();
    await expect(page.locator('img')).toHaveCount(1);

});

test('Drag and Drop', async ({page}) => {
    await page.goto('/tests/advanced_iteractions/index.html');
    await page.dragAndDrop('.drag-source', '.drop-target');
    await expect(page.locator('.drop-target')).toHaveText('Success');
    
});

test('Handling Iframes', async ({page}) => {
    await page.goto('/tests/advanced_iteractions/index.html');
    const iframeElement = page.frame('iframeName');
    const inputSelector = '#iframe-input';
    if(iframeElement) {
        await iframeElement.fill(inputSelector, 'Hello Playwright');
        await expect(iframeElement.locator(inputSelector)).toHaveValue('Hello Playwright');
    } else {
        console.error('iframe is not available');
    };
});