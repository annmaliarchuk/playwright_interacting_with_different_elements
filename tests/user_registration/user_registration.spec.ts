import { test, expect } from '@playwright/test';

const testData = {
    firstName: 'First',
    lastName: 'Last',
    address: 'test@test.com',
    number: '1234567'
}

test.describe('User registration tests', () => {
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:52330/tests/user_registration/index.html');
});

    test('Register with valid data', async ({ page }) => {
        await page.getByLabel('First Name:').fill(testData.firstName);
        await page.getByLabel('Last Name:').fill(testData.lastName);
        await page.getByLabel('Address:').fill(testData.address);
        await page.getByLabel('Number:').fill(testData.number);

        await page.getByRole('button', { name: 'Register' }).click();

        // Wait for the results section to be visible
        const userData = page.locator('#userData');
        await expect(userData).toBeVisible();

        // Assert the displayed values in the spans
        await expect(page.locator('#displayFirstName')).toHaveText(testData.firstName);
        await expect(page.locator('#displayLastName')).toHaveText(testData.lastName);
        await expect(page.locator('#displayAddress')).toHaveText(testData.address);
        await expect(page.locator('#displayNumber')).toHaveText(testData.number);
    });

    test('register with some empty fields', async ({ page }) => {
        await page.getByLabel('First Name:').fill(testData.firstName);
        await page.getByLabel('Last Name:').fill(testData.lastName);
     
        await page.getByRole('button', { name: 'Register' }).click();

        // Wait for the results section to be visible
        const userData = page.locator('#userData');
        await expect(userData).not.toBeVisible();
        // Assert error message
        const error = page.locator('#error');
        await expect(error).toBeVisible();
        await expect(error).toHaveText('Please fill in all fields.');
    });

    test('register with all empty fields', async ({ page }) => {
        await page.getByRole('button', { name: 'Register' }).click();

        // Wait for the results section to be visible
        const userData = page.locator('#userData');
        await expect(userData).not.toBeVisible();
        // Assert error message
        const error = page.locator('#error');
        await expect(error).toBeVisible();
        await expect(error).toHaveText('Please fill in all fields.');
    });
})
    