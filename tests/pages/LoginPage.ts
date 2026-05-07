import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  async open() {
    await this.goto('/login')
  }

  async login(email: string, password: string) {
    await this.page.locator('[data-qa="login-email"]').fill(email)
    await this.page.locator('[data-qa="login-password"]').fill(password)
    await this.page.locator('[data-qa="login-button"]').click()
  }

  async expectLoginPageVisible() {
    await expect(this.page).toHaveURL(/login/)
    await expect(this.page.getByText('Login to your account')).toBeVisible()
  }

  async expectLoginError() {
    await expect(this.page.getByText('Your email or password is incorrect!')).toBeVisible()
  }

  async expectSignupFormVisible() {
    await expect(this.page.getByText('New User Signup!')).toBeVisible()
    await expect(this.page.getByPlaceholder('Name')).toBeVisible()
    await expect(this.page.getByPlaceholder('Email Address').nth(1)).toBeVisible()
  }
}
