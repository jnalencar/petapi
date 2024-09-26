import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function scrapeData() {
    let options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36');
    options.addArguments('--disable-blink-features=AutomationControlled');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    try {
        await driver.get('https://mobile.bet365.com/inplaydiaryapi/schedule?timezone=16&lid=33&zid=0');
        await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        await driver.sleep(1000);
        
        //debug
        let pageSource = await driver.getPageSource();
        console.log(pageSource);
        
        let data = pageSource.split('EV');
        let setArray = [];
        for (let x = 0; x < data.length; x++) {
            let go = data[x].indexOf('E-Sports', 'Ao-Vivo');
            if (go == 4) {
                let twixCL = data[x].indexOf('CL');
                let twixCI = data[x].indexOf('CI');
                let twixNA = data[x].indexOf('NA');
                let twixVI = data[x].indexOf('VI');
                let twixSM = data[x].indexOf('SM');
                let twixCN = data[x].indexOf('CN');
                let twixCB = data[x].indexOf('CB');
                let twixC1 = data[x].indexOf('C1');
                let twixC2 = data[x].indexOf('C2');
                let twixC3 = data[x].indexOf('C3');
                let twixT1 = data[x].indexOf('T1');
                let twixT2 = data[x].indexOf('T2');
                let twixT3 = data[x].indexOf('T3');
                let twixCR = data[x].indexOf('CR');

                let CL = data[x].substring(twixCL + 3, twixCI - 1);
                let CI = data[x].substring(twixCI + 3, twixNA - 1);
                let NA = data[x].substring(twixNA + 3, twixVI - 1);
                let SM = data[x].substring(twixSM + 3, twixCN - 1);
                let CB = data[x].substring(twixCB + 3, twixC1 - 1);
                let C1 = data[x].substring(twixC1 + 3, twixC2 - 1);
                let C2 = data[x].substring(twixC2 + 3, twixC3 - 1);
                let C3 = data[x].substring(twixC3 + 3, twixT1 - 1);
                let T1 = data[x].substring(twixT1 + 3, twixT2 - 1);
                let T2 = data[x].substring(twixT2 + 3, twixT3 - 1);
                let T3 = data[x].substring(twixT3 + 3, twixCR - 1);

               
                    let format = {
                        CL: CL,
                        CI: CI,
                        NA: NA,
                        SM: SM,
                        CB: CB,
                        C1: C1,
                        C2: C2,
                        C3: C3,
                        T1: T1,
                        T2: T2,
                        T3: T3,
                    };

                setArray.push(format);
                
            }
        }
        console.log(setArray);
    } finally {
        await driver.quit();
    }
}

scrapeData().catch(console.error);