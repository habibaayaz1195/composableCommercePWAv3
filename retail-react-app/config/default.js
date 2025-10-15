/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root
 * or https://opensource.org/licenses/BSD-3-Clause
 */

// ✅ Load .env only on the server side
if (typeof process !== 'undefined' && process?.versions?.node) {
    require('dotenv').config()
}

// ✅ Fallback-safe access to process.env
const getEnv = (key, fallback = '') =>
    typeof process !== 'undefined' && process?.env ? process.env[key] || fallback : fallback

const sites = require('./sites.js')

const SITE_URL = getEnv('SITE_URL', 'https://localhost:3000')

module.exports = {
    app: {
        url: {
            locale: 'none'
        },

        defaultSite: 'RefArch',
        sites,
        SITE_URL,

        commerceAPI: {
            proxyPath: '/mobify/proxy/api',
            parameters: {
                clientId: getEnv('REACT_APP_PWA_CLIENT_ID'),
                organizationId: getEnv('REACT_APP_ORGANIZATION_ID'),
                shortCode: getEnv('REACT_APP_SHORTCODE'),
                siteId: getEnv('REACT_APP_DEFAULT_SITE')
            }
        },

        einsteinAPI: {
            host: 'https://api.cquotient.com',
            einsteinId: '',
            siteId: '',
            isProduction: false
        }
    },

    externals: [],
    pageNotFoundURL: '/page-not-found',
    ssrEnabled: true,

    ssrOnly: ['ssr.js', 'ssr.js.map', 'node_modules/**/*.*'],

    ssrShared: [
        'static/ico/favicon.ico',
        'static/robots.txt',
        '**/*.js',
        '**/*.js.map',
        '**/*.json'
    ],

    ssrParameters: {
        ssrFunctionNodeVersion: '18.x',
        proxyConfigs: [
            {
                host: 'kv7kzm78.api.commercecloud.salesforce.com',
                path: 'api'
            },
            {
                host: 'zzkc-006.dx.commercecloud.salesforce.com',
                path: 'ocapi'
            }
        ]
    }
}
