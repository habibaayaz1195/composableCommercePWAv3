/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import { Box, Button, Stack } from '@salesforce/retail-react-app/app/components/shared/ui'
import { Input, Text, Image, Link, IconButton } from '@chakra-ui/react'

import { getAssetUrl } from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'


const Storefronts = () => {


    return (
        <div>

            {/* storefronts */}
            <Stack
                direction={['column', 'column', 'row']}
                justify="center"
                align="center"
                spacing={[4, 4, 8]}
                mx="auto"
                my={8}
                maxWidth="container.lg"
                marginTop="6%"
                marginBottom="6%"

            >

                <Box flex="1" cursor="pointer">
                    <a href="/Contentful">
                        <Box maxW="30px" width="auto" fontSize="30px" margin="18px auto">
                            {/* <CiStar /> */}
                            <img src={getAssetUrl('static/img/contentfull.ico')}></img>
                        </Box>
                        <Box
                            fontWeight="bold"
                            letterSpacing="0.3em"
                            fontSize="14px !important"
                            lineHeight="18px !important"
                            textTransform="uppercase"
                            marginBottom="20px"
                            textAlign="center"
                        >
                            <h4 display="inline-block"
                                margin="0 auto">CONTENTFUL</h4>
                        </Box>
                    </a>
                </Box>


                <Box flex="1" cursor="pointer">
                    <a href="https://royalcyber-storefront-production2.mobify-storefront.com/">
                        <Box maxW="30px" width="auto" fontSize="30px" margin="18px auto">
                            <img src={getAssetUrl('static/img/amplience.ico')}></img>
                        </Box>
                        <Box
                            fontWeight="bold"
                            letterSpacing="0.3em"
                            fontSize="14px !important"
                            lineHeight="18px !important"
                            textTransform="uppercase"
                            marginBottom="20px"
                            textAlign="center"
                        >
                            <h4 display="inline-block"
                                margin="0 auto">AMPLIENCE</h4>
                        </Box>
                    </a>
                </Box>

                <Box flex="1" cursor="pointer">
                    <a href="/page-viewer/123">
                        <Box maxW="30px" width="auto" fontSize="30px" margin="18px auto">
                            <img src={getAssetUrl('static/img/page-designer.ico')}></img>
                        </Box>
                        <Box
                            fontWeight="bold"
                            letterSpacing="0.3em"
                            fontSize="14px !important"
                            lineHeight="18px !important"
                            textTransform="uppercase"
                            marginBottom="20px"
                            textAlign="center"
                        >
                            <h4 style={{ width: "112% !important" }}>PAGE DESIGNER</h4>
                        </Box>
                    </a>
                </Box>

                <Box flex="1" cursor="pointer">
                    <a href="https://rc-headless-commerce-production.mobify-storefront.com/">
                        <Box maxW="30px" width="auto" fontSize="30px" margin="18px auto">
                            <img src={getAssetUrl('static/img/conscia.ico')}></img>
                        </Box>
                        <Box
                            fontWeight="bold"
                            letterSpacing="0.3em"
                            fontSize="14px !important"
                            lineHeight="18px !important"
                            textTransform="uppercase"
                            marginBottom="20px"
                            textAlign="center"
                        >
                            <h4 display="inline-block"
                                margin="0 auto">CONSCIA</h4>
                        </Box>
                    </a>
                </Box>
                
                <Box flex="1" cursor="pointer">
                    <a href="https://royalcyber-storefront-production.mobify-storefront.com/">
                        <Box maxW="30px" width="auto" fontSize="30px" margin="18px auto">
                            <img src={getAssetUrl('static/img/cloudinary.ico')}></img>
                        </Box>
                        <Box
                            fontWeight="bold"
                            letterSpacing="0.3em"
                            fontSize="14px !important"
                            lineHeight="18px !important"
                            textTransform="uppercase"
                            marginBottom="20px"
                            textAlign="center"
                        >
                            <h4 display="inline-block"
                                margin="0 auto">CLOUDINARY</h4>
                        </Box>
                    </a>
                </Box>

                <Box flex="1" cursor="pointer">
                    <a href="https://composablelatest-production.mobify-storefront.com/">
                        <Box maxW="30px" width="auto" fontSize="30px" margin="18px auto">
                            <img src={getAssetUrl('static/img/algolia.ico')}></img>
                        </Box>
                        <Box
                            fontWeight="bold"
                            letterSpacing="0.3em"
                            fontSize="14px !important"
                            lineHeight="18px !important"
                            textTransform="uppercase"
                            marginBottom="20px"
                            textAlign="center"
                        >
                            <h4 display="inline-block"
                                margin="0 auto">ALGOLIA</h4>
                        </Box>
                    </a>
                </Box>

            </Stack>

        </div>
    )
}
export default Storefronts
