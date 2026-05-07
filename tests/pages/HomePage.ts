import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class HomePage extends BasePage {
  async open() {
    await this.goto()
  }

  async expectLoaded() {
    await expect(this.page).toHaveTitle(/Automation Exercise/)
    await expect(this.page.locator('img[alt="Website for automation practice"]')).toBeVisible()
  }

  async expectNavMenuVisible() {
    await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'Products' })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'Cart' })).toBeVisible()
    await expect(this.page.getByRole('link', { name: 'Signup / Login' })).toBeVisible()
  }

  async navigateToLogin() {
    await this.page.getByRole('link', { name: 'Signup / Login' }).click()
  }

  async navigateToCart() {
    await this.page.getByRole('link', { name: 'Cart' }).click()
  }
}
