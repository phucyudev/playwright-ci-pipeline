import { test } from '../fixtures'

test.describe('Contact Us', () => {
  test('should display contact form', async ({ contactPage }) => {
    await contactPage.open()
    await contactPage.expectContactFormVisible()
  })
})
