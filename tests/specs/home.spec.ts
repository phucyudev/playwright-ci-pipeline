import { test } from '../fixtures'

test.describe('Home Page', () => {
  test('should load homepage successfully', async ({ homePage }) => {
    await homePage.open()
    await homePage.expectLoaded()
  })

  test('should display navigation menu', async ({ homePage }) => {
    await homePage.open()
    await homePage.expectNavMenuVisible()
  })
})
