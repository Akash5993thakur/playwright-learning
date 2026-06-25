import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Swag Labs');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL('/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });


  test('should show error with wrong password', async ({ page }) => {
    await page.goto('/');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Username and password do not match');
  });


  test('should show error when fields are empty', async ({ page }) => {
    await page.goto('/');
    await page.click('#login-button');

    const error = page.locator('[data-test="error"]');
    await expect(error).toContainText('Username is required');
  });

});