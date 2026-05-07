import { test as base } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { ProductsPage } from '../pages/ProductsPage'
import { ProductDetailPage } from '../pages/ProductDetailPage'
import { CartPage } from '../pages/CartPage'
import { ContactPage } from '../pages/ContactPage'

type Fixtures = {
  homePage: HomePage
  loginPage: LoginPage
  productsPage: ProductsPage
  productDetailPage: ProductDetailPage
  cartPage: CartPage
  contactPage: ContactPage
}

export const test = base.extend<Fixtures>({
  homePage:          async ({ page }, use) => use(new HomePage(page)),
  loginPage:         async ({ page }, use) => use(new LoginPage(page)),
  productsPage:      async ({ page }, use) => use(new ProductsPage(page)),
  productDetailPage: async ({ page }, use) => use(new ProductDetailPage(page)),
  cartPage:          async ({ page }, use) => use(new CartPage(page)),
  contactPage:       async ({ page }, use) => use(new ContactPage(page)),
})

export { expect } from '@playwright/test'
