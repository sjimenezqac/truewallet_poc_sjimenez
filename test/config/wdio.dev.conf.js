const merge = require('deepmerge')
const wdioConf = require('./wdio.conf')

require('dotenv').config()
const env = process.env

exports.config = merge(wdioConf.config,

    {
        baseUrl:'https://wallet.pilot.truage.dev',
        capabilities: [
            {  
                browserName: 'chrome',
                'goog:chromeOptions': {
                    args: ['--incognito',
                        '--disable-web-security',
                        '--use-fake-device-for-media-stream',
                        'use-fake-ui-for-media-stream'],
                },
                acceptInsecureCerts: true
            }

        ]
    },
    {clone:true}
    //
)
