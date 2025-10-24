/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

'use strict'

import path from 'path'
import {getRuntime} from '@salesforce/pwa-kit-runtime/ssr/server/express'
import {defaultPwaKitSecurityHeaders} from '@salesforce/pwa-kit-runtime/utils/middleware'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'
import helmet from 'helmet'

const bodyParser = require('body-parser')
const express = require('express')

const STRIPE_SECRET_KEY = "sk_test_51SCmKoAfz7mr8QpOe4cLDti6plGyYFu33SsiPqQ52v7AuifkvKBCqmo5umjY0WkOxDI8KYUUJvt1Peb7Mb5oLngm00O1QWg0tn";
const stripe = require('stripe')(STRIPE_SECRET_KEY);

const STRIPE_WEBHOOK_SECRET =  'whsec_ixIs6EdFKCApCDd9OFxFMwvYcjGYYhn6'


//Admin APIs
const SFCC_OAUTH_CLIENT_ID = '5df052e1-adbe-4d6e-963f-4f1b4f0124ad';
const SFCC_OAUTH_CLIENT_SECRET = 'WaterMelon@2023';

const SFCC_CREDENTIALS = `${SFCC_OAUTH_CLIENT_ID}:${SFCC_OAUTH_CLIENT_SECRET}`;

const SFCC_REALM_ID = 'zzkc';
const SFCC_INSTANCE_ID = '006';

const SFCC_OAUTH_SCOPES = 'sfcc.orders sfcc.orders.rw';

// URLs
const access_token_url = 'https://account.demandware.com/dwsso/oauth2/access_token';

const axios = require('axios');
const { getAppOrigin } = require('@salesforce/pwa-kit-react-sdk/utils/url');
const options = {
    // The build directory (an absolute path)
    buildDir: path.resolve(process.cwd(), 'build'),

    // The cache time for SSR'd pages (defaults to 600 seconds)
    defaultCacheTimeSeconds: 600,

    // The contents of the config file for the current environment
    mobify: getConfig(),

    // The port that the local dev server listens on
    port: 3000,

    // The protocol on which the development Express app listens.
    // Note that http://localhost is treated as a secure context for development,
    // except by Safari.
    protocol: 'http',

    // Option for whether to set up a special endpoint for handling
    // private SLAS clients
    // Set this to false if using a SLAS public client
    // When setting this to true, make sure to also set the PWA_KIT_SLAS_CLIENT_SECRET
    // environment variable as this endpoint will return HTTP 501 if it is not set
    useSLASPrivateClient: false
}

const runtime = getRuntime()

const {handler} = runtime.createHandler(options, (app) => {
    // Set default HTTP security headers required by PWA Kit
    app.use(defaultPwaKitSecurityHeaders)
    // Set custom HTTP security headers
    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'img-src': ["'self'", '*.commercecloud.salesforce.com', 'data:', 's7d1.scene7.com','images.ctfassets.net','storage.googleapis.com', 'www.target.com.au'],
                    'script-src': ["'self'", "'unsafe-eval'", 'storage.googleapis.com',
                        'js.stripe.com'],
                    'connect-src': ["'self'", 'api.cquotient.com', 'api.stripe.com', 'ac.cnstrc.com'],
                    'frame-src': ['js.stripe.com', 'hooks.stripe.com'],
                }
            }
        })
    )

    // Handle the redirect from SLAS as to avoid error
    app.get('/callback?*', (req, res) => {
        // This endpoint does nothing and is not expected to change
        // Thus we cache it for a year to maximize performance
        res.set('Cache-Control', `max-age=31536000`)
        res.send()
    })
    app.get('/robots.txt', runtime.serveStaticFile('static/robots.txt'))
    app.get('/favicon.ico', runtime.serveStaticFile('static/ico/favicon.ico'))

     // Custom Code - starts

    //  app.post('/create-confirm-intent',bodyParser.json(), async (req, res) => {
    //     try {
    //         console.log(req,"req-stripe")
    //         const intent = await stripe.paymentIntents.create({
    //             confirm: true,
    //             amount: Math.round(req.body.order.orderTotal * 100),
    //             currency: req.body.order.currency,
    //             automatic_payment_methods: { enabled: true },
    //             payment_method: req.body.paymentMethodId, 
    //             return_url: `${getAppOrigin()}/checkout/confirmation/${req.body.order.orderNo}`,
    //             use_stripe_sdk: true,
    //             metadata: {
    //                 orderNo: req.body.order.orderNo,
    //                 paymentInstrumentId: req.body.order.paymentInstruments[0].paymentInstrumentId
    //             }
    //         });
    //         res.json({
    //             status: intent.status
    //         });
    //     } catch (err) {
    //         res.json({
    //             error: err
    //         })
    //     }
    // });

    app.post('/create-confirm-intent', bodyParser.json(), async (req, res) => {
  try {
    const { order } = req.body;

    const intent = await stripe.paymentIntents.create({
      amount: Math.round(order.orderTotal * 100),
      currency: order.currency || 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderNo: order.orderNo,
      },
    });

    res.json({ client_secret: intent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(400).json({ error: err.message });
  }
});



    app.post("/stripe-webhook", bodyParser.json({
        verify: function(req, res, buf) {
            req.rawBody = buf;
        }
    }), express.raw({ type: 'application/json' }), async (req, res) => {

        const sig = req.headers['stripe-signature'];

        let event;
        event = req.rawBody

        try {
            event = stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE_WEBHOOK_SECRET);
            console.log("Verified Hook");
        } catch (err) {
            console.log(`Webhook Error: ${err.message}`);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        if (event.type === 'payment_intent.succeeded') {
            let paymentIntent = event.data.object;
            console.log(event,"eventStripe")
            await axios.post(access_token_url,
                new URLSearchParams({
                    'grant_type': 'client_credentials',
                    'scope': `SALESFORCE_COMMERCE_API:${SFCC_REALM_ID}_${SFCC_INSTANCE_ID} ${SFCC_OAUTH_SCOPES}`
                }), {
                auth: {
                    username: SFCC_OAUTH_CLIENT_ID,
                    password: SFCC_OAUTH_CLIENT_SECRET
                }
            })
                .then(async (res) => {
                    console.log(res.data.access_token);

                    let access_token = res.data.access_token;

                    let organizationID = 'f_ecom_zzkc_006';
                    let shortCode = 'kv7kzm78';
                    let siteId = 'RefArch';

                    let paymentIntent = event.data.object;
                    let metadata = event.data.object.metadata;
                    let orderNo = metadata.orderNo;
                    let orderPaymentInstrumentId = metadata.paymentInstrumentId;

                    const headers = {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    }

                    const params = {
                        'siteId': siteId
                    }

                    await axios.put(
                        `https://${shortCode}.api.commercecloud.salesforce.com/checkout/orders/v1/organizations/${organizationID}/orders/${orderNo}/confirmation-status`,
                        {
                            'status': 'confirmed'
                        },
                        {
                            params: params,
                            headers: headers
                        }).then((res) => {
                            console.log(res.data);
                        }).catch((err) => {
                            console.log(err.message)
                        });

                    await axios.put(
                        `https://${shortCode}.api.commercecloud.salesforce.com/checkout/orders/v1/organizations/${organizationID}/orders/${orderNo}/status`,
                        {
                            'status': 'new'
                        },
                        {
                            params: params,
                            headers: headers
                        }).then((res) => {
                            console.log(res.data);
                        }).catch((err) => {
                            console.log(err.message)
                        });

                    await axios.put(
                        `https://${shortCode}.api.commercecloud.salesforce.com/checkout/orders/v1/organizations/${organizationID}/orders/${orderNo}/payment-status`,
                        {
                            'status': 'paid'
                        },
                        {
                            params: params,
                            headers: headers
                        }).then((res) => {
                            console.log(res.data);
                        }).catch((err) => {
                            console.log(err.message)
                        });

                    await axios.patch(
                        `https://${shortCode}.api.commercecloud.salesforce.com/checkout/orders/v1/organizations/${organizationID}/orders/${orderNo}/payment-instruments/${orderPaymentInstrumentId}/transaction`,
                        {
                            'c_stripePaymentIntentID': paymentIntent.id
                        },
                        {
                            params: params,
                            headers: headers
                        }).then((res) => {
                            console.log(res.data);
                        }).catch((err) => {
                            console.log(err.message)
                        });

                })
                .catch((err) => {
                    console.log(err.message)
                });

            ;
        }

        // Return a 200 response to acknowledge receipt of the event
        res.send();
    });

    // Custom Code - ends

    app.get('/worker.js(.map)?', runtime.serveServiceWorker)
    app.get('*', runtime.render)
})
// SSR requires that we export a single handler function called 'get', that
// supports AWS use of the server that we created above.
export const get = handler
