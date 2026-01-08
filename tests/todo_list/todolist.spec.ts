import { test, expect } from '@playwright/test';


test('Add items to the todo list and complete some of them', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');
    const newTodo = page.getByRole('textbox', { name: 'What needs to be done?' });
    await newTodo.fill('John Doe');
    await newTodo.press('Enter');
    await newTodo.fill('JJ Doe');
    await newTodo.press('Enter');
    // Complete the first todo item
    const firstTodo = page.getByTestId('todo-item').nth(0);
    await firstTodo.getByRole('checkbox').check();
    // Leave second todo unchecked and assert the states
    const secondTodo = page.getByTestId('todo-item').nth(1);
    await expect(secondTodo).not.toHaveClass('completed');
    await expect(firstTodo).toHaveClass('completed');
});
