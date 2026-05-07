import { test } from '../fixtures'

test.describe('User Authentication', () => {
  test('should navigate to login page', async ({ homePage, loginPage }) => {
    await homePage.open()
    await homePage.navigateToLogin()
    await loginPage.expectLoginPageVisible()
  })

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.open()
    await loginPage.login('invalid@test.com', 'wrongpassword')
    await loginPage.expectLoginError()
  })

  test('should display signup form', async ({ loginPage }) => {
    await loginPage.open()
    await loginPage.expectSignupFormVisible()
  })
})
