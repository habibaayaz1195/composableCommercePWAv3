/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Heading, Text } from '@salesforce/retail-react-app/app/components/shared/ui'

/**
 * Simple ImageTile component that can be used inside any Layout component.
 * @param image Object containing the image url, _type and focalPoint.
 * @returns {JSX.Element}
 */
export const RichTextBox = ({richText}) => {
    const richTextBox = richText

    return (
        <Box className='text-box-wrapper'>
            <Text
                as="span"
                className={'rich-text-box'}
                color={'black'}
            >
                {/* The `dangerouslySetInnerHTML` is safe to use in this context. */}
                {/* The HTML in the response from Page Designer API is already sanitized. */}
                <Box
                    dangerouslySetInnerHTML={{
                        __html: richTextBox
                    }}
                    sx={{
                        ['h1, h2, h3, h4, h5, h6']: {
                            fontSize: 'revert',
                            fontWeight: 'revert'
                        },
                        p: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    }}
                />
            </Text>
        </Box >
    )
}

export default RichTextBox
