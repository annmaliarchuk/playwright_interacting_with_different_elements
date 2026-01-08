import { expect, Locator, Page } from '@playwright/test';

export type User = {
  firstName: string;
  age: number;
  isStudent: boolean;
};

export class StudentPage {
  readonly page: Page;

  readonly firstName: Locator;
  readonly age: Locator;
  readonly student: Locator;
  readonly applyButton: Locator;

  readonly displayFirstName: Locator;
  readonly displayAge: Locator;
  readonly displayIsStudent: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.getByLabel('First Name:');
    this.age = page.getByLabel('Age:');

    this.student = page.getByRole('checkbox', { name: 'Student:' });

    this.applyButton = page.getByRole('button', { name: 'Apply' });

    this.displayFirstName = page.locator('#displayFirstName');
    this.displayAge = page.locator('#displayAge');
    this.displayIsStudent = page.locator('#displayIsStudent');
  }

  async goto() {
    await this.page.goto('/tests/pom_fill_form/index.html');
  }

  async fill(user: User) {
    await this.firstName.fill(user.firstName);
    await this.age.fill(String(user.age));

    if (user.isStudent) {
      await this.student.check();
    } else {
      await this.student.uncheck();
    }
  }

  async apply() {
    await this.applyButton.click();
  }

  async expectDisplayed(user: User) {
    await expect(this.displayFirstName).toHaveText(user.firstName);
    await expect(this.displayAge).toHaveText(String(user.age));
    await expect(this.displayIsStudent).toHaveText(user.isStudent ? 'Yes' : 'No');
  }
}