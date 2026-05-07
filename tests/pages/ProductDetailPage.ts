import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class ProductDetailPage extends BasePage {
  async openFromHref(href: string) {
    await this.goto(href)
  }

  async expectProductDetailVisible() {
    await expect(this.page).toHaveURL(/product_details/)
    await expect(this.page.locator('.product-information h2')).toBeVisible()
    await expect(this.page.locator('.product-information span span')).toBeVisible()
  }
}
