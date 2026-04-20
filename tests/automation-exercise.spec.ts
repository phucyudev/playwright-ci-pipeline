import { test, expect } from '@playwright/test'

const BASE_URL = 'https://automationexercise.com'

// =========================================
// TEST SUITE 1: Home Page
// =========================================
test.describe('Home Page', () => {
    test('should load homepage successfully', async ({ page }) => {
        await page.goto(BASE_URL)
        await expect(page).toHaveTitle(/Automation Exercise/)
        await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible()
    })

    test('should display navigation menu', async ({ page }) => {
        await page.goto(BASE_URL)
        await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Products' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Cart' })).toBeVisible()
        await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible()
    })
})

// =========================================
// TEST SUITE 2: User Authentication
// =========================================
test.describe('User Authentication', () => {
    test('should navigate to login page', async ({ page }) => {
        await page.goto(BASE_URL)
        await page.getByRole('link', { name: 'Signup / Login' }).click()
        await expect(page).toHaveURL(/login/)
        await expect(page.getByText('Login to your account')).toBeVisible()
    })

    test('should show error with invalid credentials', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`)
        await page.locator('[data-qa="login-email"]').fill('invalid@test.com')
        await page.locator('[data-qa="login-password"]').fill('wrongpassword')
        await page.locator('[data-qa="login-button"]').click()
        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible()
    })

    test('should display signup form', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`)
        await expect(page.getByText('New User Signup!')).toBeVisible()
        await expect(page.getByPlaceholder('Name')).toBeVisible()
        await expect(page.getByPlaceholder('Email Address').nth(1)).toBeVisible()
    })
})

// =========================================
// TEST SUITE 3: Products
// =========================================
test.describe('Products', () => {
    test('should display products page', async ({ page }) => {
        await page.goto(`${BASE_URL}/products`)
        await expect(page.getByText('All Products')).toBeVisible()
        const products = page.locator('.product-image-wrapper')
        await expect(products.first()).toBeVisible()
    })

    test('should search for a product', async ({ page }) => {
        await page.goto(`${BASE_URL}/products`)
        await page.locator('#search_product').fill('dress')
        await page.locator('#submit_search').click()
        await expect(page.getByText('Searched Products')).toBeVisible()
        const results = page.locator('.product-image-wrapper')
        expect(await results.count()).toBeGreaterThan(0)
    })

    test('should view product detail', async ({ page }) => {
        await page.goto(`${BASE_URL}/products`)
        // Navigate directly via href to avoid google_vignette overlay intercepting the click
        const productHref = await page.locator('.choose a').first().getAttribute('href')
        await page.goto(`${BASE_URL}${productHref}`)
        await expect(page).toHaveURL(/product_details/)
        await expect(page.locator('.product-information h2')).toBeVisible()
        await expect(page.locator('.product-information span span')).toBeVisible()
    })
})

// =========================================
// TEST SUITE 4: Cart
// =========================================
test.describe('Cart', () => {
    test('should add product to cart', async ({ page }) => {
        await page.goto(`${BASE_URL}/products`)
        await page.locator('.product-image-wrapper').first().hover()
        await page.locator('.add-to-cart').first().click()
        await page.getByRole('button', { name: 'Continue Shopping' }).click()
        await page.getByRole('link', { name: 'Cart' }).click()
        await expect(page).toHaveURL(/cart/)
        const cartItems = page.locator('#cart_info_table tbody tr')
        expect(await cartItems.count()).toBeGreaterThan(0)
    })

    test('should display empty cart message', async ({ page }) => {
        await page.goto(`${BASE_URL}/view_cart`)
        const cartItems = page.locator('#cart_info_table tbody tr')
        const count = await cartItems.count()
        if (count === 0) {
            await expect(page.getByText('Cart is empty!')).toBeVisible()
        }
    })
})

// =========================================
// TEST SUITE 5: Contact Us
// =========================================
test.describe('Contact Us', () => {
    test('should display contact form', async ({ page }) => {
        await page.goto(`${BASE_URL}/contact_us`)
        await expect(page.getByText('Get In Touch')).toBeVisible()
        await expect(page.locator('[data-qa="name"]')).toBeVisible()
        await expect(page.locator('[data-qa="email"]')).toBeVisible()
        await expect(page.locator('[data-qa="subject"]')).toBeVisible()
    })
})