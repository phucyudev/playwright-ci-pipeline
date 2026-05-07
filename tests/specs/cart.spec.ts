import { test } from '../fixtures'

test.describe('Cart', () => {
  test('should add product to cart', async ({ productsPage, cartPage, page }) => {
    await productsPage.open()
    await productsPage.addFirstProductToCart()
    await page.getByRole('button', { name: 'Continue Shopping' }).click()
    await page.getByRole('link', { name: 'Cart' }).click()
    await cartPage.expectCartUrl()
    await cartPage.expectItemsInCart()
  })

  test('should display empty cart message', async ({ cartPage }) => {
    await cartPage.open()
    await cartPage.expectEmptyCart()
  })
})
