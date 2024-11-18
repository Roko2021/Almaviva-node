const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const winston = require('winston');

// إعداد التسجيل
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console()
    ]
});

async function example() {
    let options = new chrome.Options();
    options.addArguments('headless'); // تشغيل المتصفح في الخلفية
    options.addArguments('disable-gpu'); // تحسين الأداء عند تشغيل وضع headless

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        logger.info('Opening URL...');
        await driver.get('https://egyiam.almaviva-visa.it/realms/oauth2-visaSystem-realm-pkce/protocol/openid-connect/auth?response_type=code&client_id=aa-visasys-public&state=TH5GbUgzLmNaR1NheXJMcjFoTzRaRlFVTG9RMjN6OWxhS0tqTFhFTjFmTHNQ&redirect_uri=https%3A%2F%2Fegy.almaviva-visa.it%2F&scope=openid%20profile%20email&code_challenge=sU-td4HERtuuDlCOzxxcpa2zZUdqPSIPQD0fkMxO03g&code_challenge_method=S256&nonce=TH5GbUgzLmNaR1NheXJMcjFoTzRaRlFVTG9RMjN6OWxhS0tqTFhFTjFmTHNQ');

        logger.info('Waiting for username field...');
        await driver.wait(until.elementLocated(By.id('username')), 10000);

        logger.info('Entering username...');
        await driver.findElement(By.id('username')).sendKeys('Arabishala9@gmail.com');

        logger.info('Entering password...');
        await driver.findElement(By.id('password')).sendKeys('@Avatar123a', Key.RETURN);

        logger.info('Waiting for page load...');
        await driver.sleep(2000);

        logger.info('Navigating to appointment page...');
        await driver.get('https://egy.almaviva-visa.it/appointment');
        await driver.sleep(2000);

        logger.info('Finding mat-select elements...');
        let matSelectElements = await driver.wait(
            until.elementsLocated(By.tagName('mat-select')),
            10000
        );
        logger.info('Number of mat-select elements: ' + matSelectElements.length);

        logger.info('Clicking on the first mat-select element...');
        await matSelectElements[0].click();
        await driver.sleep(2000);

        logger.info('Finding mat-option elements...');
        let matOptionElements = await driver.findElements(By.tagName('mat-option'));
        logger.info('Number of mat-option elements: ' + matOptionElements.length);

        const textToSelect = 'Cairo';

        logger.info('Selecting option: ' + textToSelect);
        for (let option of matOptionElements) {
            let optionText = await option.getText();
            logger.info(optionText);
            if (optionText === textToSelect) {
                await option.click();
                break;
            }
        }
        await driver.sleep(2000);

        // متابعة العمليات الأخرى بنفس الطريقة
        // ...

    } catch (error) {
        logger.error('An error occurred: ' + error.message);
    } finally {
        // await driver.quit();
    }
}

example();