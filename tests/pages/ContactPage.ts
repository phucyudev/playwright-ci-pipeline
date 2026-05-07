import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class ContactPage extends BasePage {
  async open() {
    await this.goto('/contact_us')
  }

  async expectContactFormVisible() {
    await expect(this.page.getByText('Get In Touch')).toBeVisible()
    await expect(this.page.locator('[data-qa="name"]')).toBeVisible()
    await expect(this.page.locator('[data-qa="email"]')).toBeVisible()
    await expect(this.page.locator('[data-qa="subject"]')).toBeVisible()
  }
}
