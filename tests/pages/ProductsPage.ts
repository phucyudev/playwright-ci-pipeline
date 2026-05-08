import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class ProductsPage extends BasePage {
  async open() {
    await this.goto('/products')
  }

  async expectProductsVisible() {
    await expect(this.page.getByText('All Products')).toBeVisible()
    await expect(this.page.locator('.product-image-wrapper').first()).toBeVisible()
  }

  async searchProduct(query: string) {
    await this.goto('/products')
    await this.page.locator('#search_product').fill(query)
    await this.page.locator('#submit_search').click()
  }

  async expectSearchResultsVisible() {
    await expect(this.page.getByText('Searched Products')).toBeVisible()
    expect(await this.page.locator('.product-image-wrapper').count()).toBeGreaterThan(0)
  }

  async getFirstProductHref(): Promise<string> {
    return await this.page.locator('.choose a').first().getAttribute('href') ?? ''
  }

  async addFirstProductToCart() {
    await this.page.locator('.product-image-wrapper').first().hover()
    await this.page.locator('.add-to-cart').first().click({ force: true })
  }
}
