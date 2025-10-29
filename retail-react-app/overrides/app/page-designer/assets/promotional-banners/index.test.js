/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PromotionalBanner from './index'
import {renderWithProviders} from '@salesforce/retail-react-app/app/utils/test-utils'

const SAMPLE_DATA = {
    acimaBtnLink: 'https://salesforce.com',
    image: {
        _type: 'Image',
        url: 'https://zzrf-001.dx.commercecloud.salesforce.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw34c389b5/images/SearchBanner/search.jpg'
    },
    alt: 'Alt Text test Image With Text Component'
}

test('Page renders correct component', () => {
    const {getByText} = renderWithProviders(<PromotionalBanner {...SAMPLE_DATA} />)

    expect(getByText(/image with text component/i)).toBeInTheDocument()
})
