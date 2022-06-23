const Page = require('./tw-page')

 class SetupWizard extends Page {
    /**
     * define selectors using getter methods
     */
     
    get inputEmail(){ return $('input[placeholder="Your email"]')}
    get inputFile() { return $('//input[@type="file"]')}
    get divIncorrectEmailAlert(){ return $('div=Please enter a valid email address.')}
    
    get buttonGetStarted(){ return $('button=Get Started')}
    get buttonNext(){ return $('button=Next')}
    get h4GreatConfirmation(){ return $('h4=Great!')}
    get buttonScan(){ return $('button=Scan')}
    get divScanLicenceText(){ return $('div=Scan barcode on the back of license.')}
    get buttonUpload(){ return $('button=Upload')}
    get buttonSave(){ return $('button=Save')}


    // async verifyEmailInputIsGreat(){
    //     await this.h4GreatConfirmation.waitForExist({timeout: 20000})
    //     await this.h4GreatConfirmation.waitForDisplayed({ timeout: 10000 })
    //     expect(this.h4GreatConfirmation).toExist()
    // }

    // async verifyScanLicenseReady(){
    //     await this.divScanLicenceText.waitForExist({ timeout: 10000 })
    //     await this.buttonUpload.waitForExist({ timeout: 10000 })
    // }

}

module.exports = new SetupWizard()