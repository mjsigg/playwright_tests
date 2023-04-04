const playwright = require("playwright");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

async function main () {
    const browser = await playwright.webkit.launch ({
        headless: false,
    });

    const page = await browser.newPage();
    await page.goto("https://google.com");
    const text = await page.locator("a").allInnerTexts();

    // Convert the text to an array of objects with a single 'text' property
    const data = text.map(t => ({text: t}));

    // Write the data to a CSV file
    const csvWriter = createCsvWriter({
        path: "text.csv",
        header: [
            {id: "text", title: "Text"},
            {id: "anotherText", title: "AnotherText"},
        ]
    });
    await csvWriter.writeRecords(data);

    await page.waitForTimeout(5000);
    await browser.close();
}

main();
