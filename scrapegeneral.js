import puppeteer from 'puppeteer';
const fs = require('fs');

async function scrapeLOLData() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36');
    
    console.log('Navigating to the URL...');
    await page.goto('https://www.bet365.com/#/AS/B151/', { waitUntil: 'networkidle2' });
    
    console.log('Waiting for the page to load...');
    await page.waitForTimeout(5000); // Adjust the timeout as needed

    console.log('Saving the page content...');
    const content = await page.content();
    fs.writeFileSync('page.html', content);

    await browser.close();

    console.log('Analyzing the saved HTML file...');
    const html = fs.readFileSync('page.html', 'utf8');
    const lolGames = [];

    const cheerio = require('cheerio');
    const $ = cheerio.load(html);

    $('.ff-MarketFixtureDetails').each((index, element) => {
        const title = $(element).find('.ffo-ParticipantFixtureTeamCSGO_TruncateName').text();
        if (title.includes('LOL')) {
            const teams = $(element).find('.ffo-ParticipantFixtureTeamCSGO_Name');
            const odds = $(element).find('.ff-ParticipantFixtureOdd_Odds');

            const game = {
                team1: $(teams[0]).text(),
                team2: $(teams[1]).text(),
                odd1: $(odds[0]).text(),
                odd2: $(odds[1]).text(),
            };

            lolGames.push(game);
        }
    });

    console.log('LOL Games:', lolGames);
    return lolGames;
}

module.exports = scrapeLOLData;