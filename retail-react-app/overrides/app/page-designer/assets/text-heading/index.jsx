/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Flex, Heading, Text } from '@salesforce/retail-react-app/app/components/shared/ui'
import Link from '@salesforce/retail-react-app/app/components/link'

/**
 * Simple ImageTile component that can be used inside any Layout component.
 * @param image Object containing the image url, _type and focalPoint.
 * @returns {JSX.Element}
 */
export const TextHeading = ({ textHeadline, buttonText, tileLink }) => {
    const text_Headline = textHeadline
    const button_Text = buttonText
    const title_Link = tileLink

    return (
        <Box className='textHeader' w="100%" mx='auto' py={4} px={2} textAlign="center" maxW="1200px"
            color="#034694"
            borderBottom="1px solid #034694"
            fontWeight="600"
            fontSize="24px"
        >
            <Flex
                justifyContent="space-between"
                alignItems="center"
                className='heading-inner'
                py={2}
                px={4}
                mb={4}
            >
                {/* Left Section*/}
                {text_Headline && (
                    <Heading as="h4" fontSize="24px"
                        dangerouslySetInnerHTML={{
                            __html: text_Headline
                        }}
                    >
                    </Heading>
                )}

                {/* Right Section */}
                {button_Text && (
                    <Button
                        as="a"
                        href={title_Link}
                        className="headerLink"
                        color="blue.500"
                        variant="link"
                    >
                        <Text as="span">{button_Text}</Text>
                    </Button>
                )}
            </Flex>
        </Box >
    )
}

export default TextHeading
