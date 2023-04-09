const playwright = require("playwright");


async function main () {
    const browser = await playwright.webkit.launch ({
        headless: false,
    });

    const page = await browser.newPage();
    await page.goto("https://googlemaps.com");

    const searchBar = await page.locator("#searchboxinput");
    searchBar.fill("hello")

}

main();