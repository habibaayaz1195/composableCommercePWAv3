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
// import { CiStar } from "react-icons/ci";
// import { HiOutlineShieldCheck } from "react-icons/hi";
// import { CiDeliveryTruck } from "react-icons/ci";
// import { LiaGreaterThanSolid } from "react-icons/lia";

import { useProduct } from '@salesforce/commerce-sdk-react'
import ConstructorRecommendations from '../../components/ConstructorRecommendation'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { getAppOrigin } from '@salesforce/pwa-kit-react-sdk/utils/url'
import Storefronts from '../storefronts'



const Banner = () => {
    console.log("check", getAppOrigin)

    const history = useHistory()
    const location = useLocation()
    const { productId } = useParams()
    const urlParams = new URLSearchParams(location.search)
    const {
        data: product,
        isLoading: isProductLoading,
        isError: isProductError,
        error: productError
    } = useProduct(
        {
            parameters: {
                id: urlParams.get('pid') || productId,
                allImages: true
            }
        },
        {
            // When shoppers select a different variant (and the app fetches the new data),
            // the old data is still rendered (and not the skeletons).
            keepPreviousData: true
        }
    )

    return (
        <div>
            <div className="main-banner-class">
                <img src={getAssetUrl('static/img/special-Offer.png')}></img>
            </div>

            <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={{ base: '4', md: '20' }} // Adjust spacing between images and buttons
                align="center"
                justify="center"
                marginX="auto"
                maxW="1000px"
                marginTop={{ base: '5%', md: '5%' }}
            >
                <Box position="relative" display="flex" alignItems="center">
                    <img
                        src={getAssetUrl('static/img/men-category.png')}
                        alt="Image 1"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <Box position="absolute" top="50%" left="10%" transform="translateY(-50%)">
                        <Text
                            fontWeight="bold"
                            fontSize={{ base: '36px', md: '34px' }}
                            color="white"
                            mb={{ base: '0.5rem', md: '1rem' }}
                        >
                            Mens
                        </Text>
                        {/* <Text fontWeight="bold" fontSize={{ base: '32px', md: '34px' }} color="white">
                            Category
                        </Text> */}
                    </Box>

                    <Box
                        position="absolute"
                        bottom={{ base: '1rem', md: '3rem' }}
                        left="50%"
                        transform="translateX(-50%)"
                        display="flex"
                        flexDirection={{ base: 'column', md: 'row' }}
                    >
                        <Button
                            bg="white"
                            color="#013763"
                            borderRadius="inherit"
                            fontWeight="bold"
                            border="none !important"
                            minWidth="151px !important"
                            marginBottom={{ base: '0.5rem', md: '0' }}
                            marginRight={{ base: '0', md: '0.5rem' }}
                            _hover={{ bg: '#E66208', color: 'white' }}
                        >
                            <Link href="/category/mens-clothing-suits">Suits </Link>
                        </Button>

                        <Button
                            bg="white"
                            color="#013763"
                            borderRadius="inherit"
                            fontWeight="bold"
                            border="none !important"
                            minWidth="151px !important"
                            marginLeft={{ base: '0', md: '0.5rem' }}
                            marginRight={{ md: '0' }}
                            _hover={{ bg: '#E66208', color: 'white' }}
                        >
                            <Link href="/category/mens-clothing-pants"> Pants</Link>
                        </Button>
                    </Box>
                </Box>

                <Box position="relative" display="flex" alignItems="center">
                    <img
                        src={getAssetUrl('static/img/women-category.png')}
                        alt="Image 2"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />

                    <Box position="absolute" top="50%" left="10%" transform="translateY(-50%)">
                        <Text
                            fontWeight="bold"
                            fontSize={{ base: '32px', md: '34px' }}
                            color="white"
                            mb={{ base: '0.5rem', md: '1rem' }}
                        >
                            Womens
                        </Text>
                        {/* <Text fontWeight="bold" fontSize={{ base: '32px', md: '34px' }} color="white">
                            Category
                        </Text> */}
                    </Box>

                    <Box
                        position="absolute"
                        bottom={{ base: '1rem', md: '3rem' }}
                        left="50%"
                        transform="translateX(-50%)"
                        display="flex"
                        flexDirection={{ base: 'column', md: 'row' }}
                    >
                        <Button
                            bg="white"
                            color="#013763"
                            borderRadius="inherit"
                            fontWeight="bold"
                            border="none !important"
                            minWidth="151px !important"
                            marginBottom={{ base: '0.5rem', md: '0' }}
                            marginRight={{ base: '0', md: '0.5rem' }}
                            _hover={{ bg: '#E66208', color: 'white' }}
                        >
                            <Link href="/category/womens-clothing-dresses"> Dresses</Link>

                        </Button>
                        <Button
                            bg="white"
                            color="#013763"
                            borderRadius="inherit"
                            fontWeight="bold"
                            border="none !important"
                            minWidth="151px !important"
                            marginLeft={{ base: '0', md: '0.5rem' }}
                            marginRight={{ md: '0' }}
                            _hover={{ bg: '#E66208', color: 'white' }}
                        >
                            <Link href="/category/mens-clothing-pants"> Tops</Link>
                        </Button>
                    </Box>
                </Box>
            </Stack>
            <br />
            <br />
            <br />


            <ConstructorRecommendations
                productID={product?.id}
                noOfResults={8}
                podId="bestsellers"
            // filters={{size: 'medium'}} //used for pods with strategy 'filtered'
            // term="dress" // used for pods with strategy 'Query Recommendations'
            />
            {/* storefronts */}

            {/* <Stack
                direction={['column', 'column', 'row']}
                justify="center"
                align="center"
                spacing={[4, 4, 8]} // Adjust spacing as needed
                mx="auto" // Centers the Stack horizontally
                my={8} // Adds margin from top and bottom
                maxWidth="container.lg"
                marginTop="6%"
                marginBottom="6%"

            >

                <Box flex="1" cursor="pointer">
                    <a href="/Contentful">
                        <Box maxW="30px" width="auto" fontSize="30px" margin="18px auto">
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
                            <h4>CONTENTFUL</h4>
                        </Box>
                    </a>
                </Box>



                <Box flex="1" cursor="pointer">
                    <a href="/page-viewer/123">
                        <Box maxW="30px" width="auto" fontSize="30px" margin="18px auto">
                            <img src={getAssetUrl('static/img/page-designer.png')}></img>
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
                            <h4>PAGE DESIGNER</h4>
                        </Box>
                    </a>
                </Box>


                <Box flex="1" cursor="pointer">
                    <a href="https://rc-headless-commerce-production.mobify-storefront.com/us/en-US">
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
                            <h4>AMPLIENCE</h4>
                        </Box>
                    </a>
                </Box>



            </Stack> */}
            <Storefronts />

        </div>
    )
}

export default Banner
