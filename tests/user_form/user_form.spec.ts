import { test, expect, Page } from '@playwright/test'; 

test.describe('Workshop 7 - User form', () => {

    type User = {
        firstName: string;
        age: number;
        isStudent: boolean;
    };

    const user: User = {
        firstName: 'Alice',
        age: 22,
        isStudent: true
    }; 
    
    const createPage = (page: Page) => {
        const firstName = page.getByLabel('First Name:');
        const age = page.getByLabel('Age:');
        const student = page.getByLabel('Student:');

        const displayFirstName = page.locator('#displayFirstName');
        const displayAge = page.locator('#displayAge');
        const displayIsStudent = page.locator('#displayIsStudent');

        return {
            firstName: firstName,
            age: age,
            student: student,
            displayFirstName: displayFirstName,
            displayAge: displayAge,
            displayIsStudent: displayIsStudent
        };
    };

    test.beforeEach(async ({ page }) => {
        await page.goto('/tests/user_form/index.html');
    });

    

    test('Type Def and Interfaces', async ({ page }) => {
        const form = createPage(page);

        await form.firstName.fill(user.firstName);
        await form.age.fill(user.age.toString());
        await form.student.check();

        await page.getByRole('button', { name: 'Apply' }).click();

        // Wait for the results section to be visible
        const displaySection = page.locator('.display-section');
        await expect(displaySection).toBeVisible();

        // Assert the displayed values in the spans
        await expect(page.locator('#displayFirstName')).toHaveText(user.firstName);
        await expect(page.locator('#displayAge')).toHaveText(user.age.toString());
        await expect(page.locator('#displayIsStudent')).toHaveText(user.isStudent  ? 'Yes' : 'No');
    });

});