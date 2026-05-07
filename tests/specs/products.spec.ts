import { test } from '../fixtures'

test.describe('Products', () => {
  test('should display products page', async ({ productsPage }) => {
    await productsPage.open()
    await productsPage.expectProductsVisible()
  })

  test('should search for a product', async ({ productsPage }) => {
    await productsPage.searchProduct('dress')
    await productsPage.expectSearchResultsVisible()
  })

  test('should view product detail', async ({ productsPage, productDetailPage }) => {
    await productsPage.open()
    const href = await productsPage.getFirstProductHref()
    await productDetailPage.openFromHref(href)
    await productDetailPage.expectProductDetailVisible()
  })
})
