/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Image} from '@salesforce/retail-react-app/app/components/shared/ui'

/**
 * Simple ImageTile component that can be used inside any Layout component.
 * @param image Object containing the image url, _type and focalPoint.
 * @returns {JSX.Element}
 */
export const HTMLMarkup = ({ placeHTML }) => {
    const HtmlMarkup = placeHTML;
    return (
        <Box className={'html-markup-wrapper'}>
            {/* The `dangerouslySetInnerHTML` is safe to use in this context. */}
            {/* The HTML in the response from Page Designer API is already sanitized. */}
            {HtmlMarkup && (
                <Box                    
                    dangerouslySetInnerHTML={{
                        __html: HtmlMarkup
                    }}
                />
            )}
        </Box>
    )
}

export default HTMLMarkup
