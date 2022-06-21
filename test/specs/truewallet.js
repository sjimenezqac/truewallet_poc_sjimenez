const WizardPage = require('../pageobjects/tw-setup-wizard.page')
// const Page = require('../pageobjects/tw-page.page')
const path = require('path');
const { getGenericEmailAddress, getDateStringCustom }=require('../common/utility')
// const wdioConfig = require('../config/')

describe.skip('MY TEST', ()=>{

    it('Test test', async () => {
        console.log('Service:')
        console.log(browser)

        // console.log(browser)
        // envVar = process.env
        console.log('executinng only test');
        await WizardPage.open()
        WizardPage.pause(5)

        // browser.url('https://google.com')
    })
})

describe('Wallet Test Suite', () => {    
        let testDate
        let testEmail

        beforeEach('Setting up test', async () => {
            testDate = getDateStringCustom()
            console.log('testString', testDate);
            testEmail = getGenericEmailAddress(testDate)
            console.log('testEmail', testEmail);
            await WizardPage.open()
        })

        afterEach('Wrapping up test', async => {
            WizardPage.getScreenShot(testDate)
            WizardPage.pause(5)
            // console.log('Nothing to do here');
        })

        it.skip('Test case1: Happy path', async () => {

            await WizardPage.clickButton('Get Started')

            await WizardPage.verifyElementAndText('h4', "Let's create your TruAge™ ID")
            WizardPage.inputEmail.setValue(testEmail)
            await WizardPage.clickButton('Next') 

            await WizardPage.verifyElementAndText('h4', 'Great!')
            await WizardPage.clickButton('Next') 
            await WizardPage.clickButton('Scan') 

            await WizardPage.verifyElementAndText('div','Scan barcode on the back of license.')
            await WizardPage.uploadFile(WizardPage.inputFile, '/test/assets/license.png')
            await WizardPage.verifyElementAndText('h4', 'Looks good!')
            await WizardPage.clickButton('Next') 

            await WizardPage.verifyElementAndText('p', "This photo will be used to verify it's you. Make sure to take a clear photo of your face.")
            await WizardPage.uploadFile(WizardPage.inputFile, '/test/assets/photo.png')
            await WizardPage.verifyElementAndText('h4', 'Looks good!')
            await WizardPage.clickButton('Next') 

            await WizardPage.verifyElementAndText('h4','Your TruAge™ ID')
            await WizardPage.clickButton('Next') 

            await WizardPage.verifyElementAndText('h4','Save your TruAge™ ID')
            await WizardPage.clickButton('Save') 
            
            await WizardPage.verifyElementAndText('h4','Welcome to TruAge™')
            await WizardPage.clickButton('Show ID')
            await WizardPage.verifyElementAndText('button', 'Regenerate QR')
            console.log('Wizard complete!');
        })

        it('Test case2: Incorrect email',async () => {
            await WizardPage.clickButton('Get Started')
            await WizardPage.inputEmail.setValue('test2.com')
            WizardPage.inputEmail.setValue('Tab')
            await expect(await WizardPage.divIncorrectEmailAlert).toBeDisplayed()

        })

})
