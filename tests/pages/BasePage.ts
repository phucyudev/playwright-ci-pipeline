import { Page } from '@playwright/test'

export class BasePage {
  readonly page: Page
  protected readonly baseUrl = 'https://automationexercise.com'

  constructor(page: Page) {
    this.page = page
  }

  async goto(path = '') {
    await this.page.goto(`${this.baseUrl}${path}`)
  }
}
