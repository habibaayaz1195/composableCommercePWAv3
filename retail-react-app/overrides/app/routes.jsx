/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import loadable from '@loadable/component'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'

// Components
import {Skeleton} from '@salesforce/retail-react-app/app/components/shared/ui'
import {configureRoutes} from '@salesforce/retail-react-app/app/utils/routes-utils'
import {routes as _routes} from '@salesforce/retail-react-app/app/routes'

const fallback = <Skeleton height="75vh" width="100%" />

// Create your pages here and add them to the routes array
// Use loadable to split code into smaller js chunks
const Home = loadable(() => import('./pages/banner'), {fallback})
const MyNewRoute = loadable(() => import('./pages/my-new-route'))

const ContentfulHome = loadable(()=>import("./pages/product-contentful"))
const ContentfulAboutus = loadable(()=>import("./pages/about-us-contentful"))
const Checkout = loadable(() => import('./pages/checkout'), { fallback })
const ProductDetail = loadable(() => import('./pages/product-detail'))
const PageViewer = loadable(() => import('./pages/page-viewer'), {fallback})
const LandingPage = loadable(() => import('./pages/landing'), {fallback})

const newRoute = {
    path: '/:pageId',
    component: PageViewer,
};

const catchAllIndex = _routes.findIndex((route) => route.path === '*');

if (catchAllIndex !== -1) {
    _routes.splice(catchAllIndex, 0, newRoute);
} else {
    _routes.push(newRoute);
}

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/home',
        component: LandingPage,
        exact: true
    },
    {
        path: '/Contentful',
        component: ContentfulHome,
        exact: true
    },
    {
        path: '/about-us',
        component: ContentfulAboutus,
        exact: true
    },
	{
        path: '/page-viewer/:pageId',
        component: PageViewer
    },
    {
        path: '/my-new-route',
        component: MyNewRoute
    },
    {
        path: '/checkout',
        component: Checkout,
        exact: true
    },
    {
        path: '/product/:productId',
        component: ProductDetail
    },
    ..._routes
]

export default () => {
    const config = getConfig()
    return configureRoutes(routes, config, {
        ignoredRoutes: ['/callback', '*']
    })
}
