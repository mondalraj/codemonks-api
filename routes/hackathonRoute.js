const express = require('express')
const router = express.Router();
const puppeteer = require('puppeteer');

router.get("/", (req, res) => {
    var devfolio = [];
    var devpost = [];
    var daretocompete = [];
    (async () => {
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.goto('https://devfolio.co/hackathons');

        devfolio = await page.evaluate(() => Array.from(document.querySelectorAll('.jcKWGN')).map((hack) => ({
            name: hack.querySelector('.kwhLPe').innerText.trim(),
            date: hack.querySelector('.esEXVk').innerText.trim(),
            organizer: "Devfolio",
            link: hack.querySelector('.hcmcER').href
        })));


        await page.goto('https://devpost.com/hackathons?status[]=upcoming&status[]=open');

        devpost = await page.evaluate(() => Array.from(document.querySelectorAll('.hackathon-tile')).map((hack) => ({
            name: hack.querySelector('h3').innerText.trim(),
            date: hack.querySelector('.submission-period').innerText.trim(),
            participants: hack.querySelector('.participants.mr-4.mb-3').innerText.trim(),
            organizer: hack.querySelector('.label.round.host-label').innerText.trim(),
            topics: hack.querySelector('.label.theme-label.mr-2.mb-2').innerText.trim(),
            link: hack.querySelector('.tile-anchor').href
        })));

        await page.waitFor(10000);

        await page.goto('https://dare2compete.com/hackathons?filters=,all,open,all&types=teamsize,payment,oppstatus,eligible');

        daretocompete = await page.evaluate(() => Array.from(document.querySelectorAll('.listing')).map((hack) => ({
            name: hack.querySelector('h2.double-wrap').innerText.trim(),
            date: hack.querySelector('strong').innerText.trim(),
            organizer: hack.querySelector('h3').innerText.trim(),
            link: "https://dare2compete.com/hackathons?filters=,all,open,all&types=teamsize,payment,oppstatus,eligible"
        })));

        await browser.close();

        const HackList = devfolio.concat(devpost, daretocompete);
        res.send(HackList);
    })();

})

module.exports = router;