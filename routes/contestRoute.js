const express = require('express')
const router = express.Router();
const puppeteer = require('puppeteer');

router.get("/", (req, res) => {
    // var codechef = [];
    (async () => {
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.goto('https://www.codechef.com/contests/?itm_medium=navmenu&itm_campaign=allcontests_head');

        const codechef = await page.evaluate(() => Array.from(document.querySelectorAll('#future-contests-data > tr')).map((hack) => ({
            name: hack.querySelector('td:nth-child(2)').innerText.trim(),
            organizer: "Codechef",
            date: hack.querySelector('td:nth-child(3)').innerText.trim(),
            duration: hack.querySelector('td:nth-child(4)').innerText.trim(),
            link: hack.querySelector('td:nth-child(2) > a').href
        })));

        await page.waitFor(10000);
        await browser.close();
        // const contestList = codechef.concat(prepbytes);
        res.send(codechef);
    })();

})

module.exports = router;