import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class CartPage extends BasePage {
  async open() {
    await this.goto('/view_cart')
  }

  async expectCartUrl() {
    await expect(this.page).toHaveURL(/cart/)
  }

  async getItemCount(): Promise<number> {
    return this.page.locator('#cart_info_table tbody tr').count()
  }

  async expectItemsInCart() {
    expect(await this.getItemCount()).toBeGreaterThan(0)
  }

  async expectEmptyCart() {
    const count = await this.getItemCount()
    if (count === 0) {
      await expect(this.page.getByText('Cart is empty!')).toBeVisible()
    }
  }
}
