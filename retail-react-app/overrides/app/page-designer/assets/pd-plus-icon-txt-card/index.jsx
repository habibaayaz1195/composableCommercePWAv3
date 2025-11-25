/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
//import PropTypes from 'prop-types'
import { Box, Flex, Heading,  Image, Stack, Text } from '@salesforce/retail-react-app/app/components/shared/ui'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'


/**
 * Simple ImageTile component that can be used inside any Layout component.
 * @param image Object containing the image url, _type and focalPoint.
 * @returns {JSX.Element}
 */
export const IconTxtCard = ({ cardIconImg, cardIconAlt, cardRichText }) => {
    const iconImg = cardIconImg
    const iconImgAlt = cardIconAlt
    const cardTxt = cardRichText

    const iconImgURL = iconImg?.url

    return (

        <Card maxW='sm' border={0} boxShadow={0} background={'none'}>
            <CardBody textAlign={'center'} border={0} boxShadow={0} background={'none'}>
                <Image
                    className={'image'}
                    src={iconImgURL}
                    ignoreFallback={true}
                    alt={iconImgAlt}
                    title={iconImgAlt}
                    margin={'auto'}
                    loading="lazy"
                />
                <Stack mt='6' spacing='3'>
                    <Text className={'banner-heading-text'} color={'white'}>
                        {/* The `dangerouslySetInnerHTML` is safe to use in this context. */}
                        {/* The HTML in the response from Page Designer API is already sanitized. */}
                        <Box
                            color={'black'}
                            dangerouslySetInnerHTML={{
                                __html: cardTxt
                            }}
                            sx={{
                                ['h1, h2, h3, h4, h5, h6']: {
                                    fontSize: 'revert',
                                    fontWeight: 'revert',
                                    textAlign: 'center'
                                },
                                p: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }}
                        />
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default IconTxtCard
