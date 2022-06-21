const path = require('path');
const { REMOTE_SERVICES } = require('../config/configConstants')
module.exports = class Page {

    open (path) {
        browser.deleteCookies()
        return browser.url('/')
        // return browser.url(`https://wallet.pilot.truage.dev`)
        // return browser.url(`https://onboard.pilot.truage.dev/onboard?transactionId=z19sy4DHVTEGfGJtukY7Ss1G9-z1A79iVAuHXW5iH5ZUsh34Pjy`)

        // PreScan page: https://onboard.pilot.truage.dev/onboard?transactionId=z19sy4DHVTEGfGJtukY7Ss1G9-z1A79iVAuHXW5iH5ZUsh34Pjy
    }

    async clickButton(buttonText){
        const button = $(`button=${buttonText}`)
        await button.waitForExist({ timeout: 10000 })
        await button.waitForEnabled({ timeout: 10000 })
        await button.waitForClickable({ timeout: 10000 })
        button.click()
    }

    // sendTab(){
    //     browser.setValue('Tab')
    // }

    getTitle(){
        return browser.getTitle()
    }

    getUrl(){
        return browser.getUrl()
    }

   async pause(secs){
        return await browser.pause(secs*1000)
    }

    async verifyElementAndText(elementTag, text){
        const element = await $(`${elementTag}=${text}`)
        await element.waitForExist({timeout: 50000})
        await element.waitForDisplayed({ timeout: 10000 })
        expect(element).toExist()
    }

   async uploadFileRemote(element, fileFromProjectDir){
        const inputElement = await element
        await this.displayHiddenElement(inputElement)
        const filePath = path.join(__dirname, `../..${fileFromProjectDir}`);
        const uploadFile = await browser.uploadFile(filePath)
        await inputElement.setValue(uploadFile)
    }

    async uploadFile(element, fileFromProjectDir){
        let file
        const inputElement = await element
        await this.displayHiddenElement(inputElement)
        const filePath = path.join(__dirname, `../..${fileFromProjectDir}`);
        if (browser.config.services.every(service => REMOTE_SERVICES.includes(service))){ // remote service
            console.log('uploading REMOTE');
            file = await browser.uploadFile(filePath)
        }else{
            console.log('uploading LOCAL');
            file = filePath
        }
        await inputElement.setValue(file)
    }

    async displayHiddenElement(element){
        browser.execute(
            // assign style to elem in the browser
            (el) => el.style.display = 'block',
            // pass in element so we don't need to query it again in the browser
            element
        );
        await element.waitForDisplayed({ timeout: 50000 });
    }

    getScreenShot(name){
        browser.saveScreenshot(`./test/results/photos/screenshot${name}.png`);
    }
}

