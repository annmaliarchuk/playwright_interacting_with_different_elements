import { test } from '@playwright/test';
import { StudentPage, User } from './Page';

test.describe('Workshop 8 (Phase 3 - POM)', () => {
  test('Fill the form and display values', async ({ page }) => {
    const user: User = { firstName: 'Alice', age: 22, isStudent: true };

    const studentPage = new StudentPage(page);

    await studentPage.goto();
    await studentPage.fill(user);
    await studentPage.apply();
    await studentPage.expectDisplayed(user);
  });
});
