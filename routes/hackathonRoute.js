const express = require('express')
const router = express.Router();
const puppeteer = require('puppeteer');

router.get("/", (req, res) => {
    var devfolio = [];
    var devpost = [];
    var hackerEarth = [];
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // await page.goto('https://devfolio.co/hackathons');

        // devfolio = await page.evaluate(() => Array.from(document.querySelectorAll('.jcKWGN')).map((hack) => ({
        //     name: hack.querySelector('.kwhLPe').innerText.trim(),
        //     date: hack.querySelector('.esEXVk').innerText.trim(),
        //     organizer: "Devfolio",
        //     link: hack.querySelector('.hcmcER').href
        // })));


        // await page.goto('https://devpost.com/hackathons?status[]=upcoming&status[]=open');

        // devpost = await page.evaluate(() => Array.from(document.querySelectorAll('.hackathon-tile')).map((hack) => ({
        //     name: hack.querySelector('h3').innerText.trim(),
        //     date: hack.querySelector('.submission-period').innerText.trim(),
        //     participants: hack.querySelector('.participants.mr-4.mb-3').innerText.trim(),
        //     organizer: hack.querySelector('.label.round.host-label').innerText.trim(),
        //     topics: hack.querySelector('.label.theme-label.mr-2.mb-2').innerText.trim(),
        //     link: hack.querySelector('.tile-anchor').href
        // })));

        await page.goto('https://www.hackerearth.com/challenges/hackathon/');

        hackerEarth = await page.evaluate(() => Array.from(document.querySelectorAll('.upcoming')).map((hack) => ({
            name: hack.querySelector('.challenge-name').innerText.trim(),
            Date: hack.querySelector('.date').innerText.trim(),
            participants: hack.querySelector('.registrations').innerText.trim(),
            organizer: hack.querySelector('.company-details').innerText.trim(),
            link: hack.querySelector('.challenge-card-link').href
        })));


        await browser.close();

        const HackList = devfolio.concat(devpost, hackerEarth);
        res.send(HackList);
    })();

})

module.exports = router;