"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeGoogle = void 0;
const scrapeGoogle = (page, search) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.setViewportSize({ width: 1920, height: 1080 });
    yield page.goto('https://www.google.com/');
    yield page.fill('textarea', search);
    yield page.keyboard.press('Enter');
    yield page.waitForLoadState('domcontentloaded');
    yield page.getByText("News").first().click();
    yield page.waitForLoadState('networkidle');
    yield page.getByText("Tools").first().click();
    yield page.waitForLoadState('domcontentloaded');
    yield page.getByText("Sorted by relevance").first().click();
    yield page.getByText("Sorted by date").click();
    //await page.getByText("Recent").first().click()
    //await page.getByText("Past hour").click()
    yield page.waitForLoadState('networkidle');
    //const headlines = await page.getByRole("heading").allTextContents()
    const headlines = yield page.$$eval(`div#search div[role="heading"]`, (elements) => elements.map((element) => {
        var _a, _b, _c, _d, _e;
        const parent = element.parentElement;
        const url = (_b = (_a = parent === null || parent === void 0 ? void 0 : parent.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.getAttribute("href");
        const title = element.textContent;
        const publisher = (_c = parent === null || parent === void 0 ? void 0 : parent.firstChild) === null || _c === void 0 ? void 0 : _c.textContent;
        const description = (_d = parent === null || parent === void 0 ? void 0 : parent.children[2]) === null || _d === void 0 ? void 0 : _d.textContent;
        const publishedAgo = (_e = parent === null || parent === void 0 ? void 0 : parent.children[4]) === null || _e === void 0 ? void 0 : _e.textContent;
        const scrapedAtMS = Date.now();
        return { url, title, publisher, description, publishedAgo, scrapedAtMS, };
    }));
    yield page.close();
    return headlines;
});
exports.scrapeGoogle = scrapeGoogle;
//# sourceMappingURL=scrapeGoogle.js.map