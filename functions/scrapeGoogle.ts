import { Page } from 'playwright';

export const scrapeGoogle = async (page: Page, search: string) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://www.google.com/');
    await page.fill('textarea', search)
    await page.keyboard.press('Enter');
    await page.waitForLoadState('domcontentloaded');
    await page.getByText("News").first().click()
    await page.waitForLoadState('networkidle');
    await page.getByText("Tools").first().click()
    await page.waitForLoadState('domcontentloaded');
    await page.getByText("Sorted by relevance").first().click()
    await page.getByText("Sorted by date").click()
    //await page.getByText("Recent").first().click()
    //await page.getByText("Past hour").click()
    await page.waitForLoadState('networkidle');
    //const headlines = await page.getByRole("heading").allTextContents()
    const headlines = await page.$$eval(`div#search div[role="heading"]`, (elements) => elements.map((element) => {
        const parent = element.parentElement
        const url = parent?.parentElement?.parentElement?.getAttribute("href")
        const title = element.textContent
        const publisher = parent?.firstChild?.textContent
        const description = parent?.children[2]?.textContent
        const publishedAgo = parent?.children[4]?.textContent
        const scrapedAtMS = Date.now()

        return { url, title, publisher, description, publishedAgo, scrapedAtMS, }
    }));
    await page.close();

    return headlines;
}