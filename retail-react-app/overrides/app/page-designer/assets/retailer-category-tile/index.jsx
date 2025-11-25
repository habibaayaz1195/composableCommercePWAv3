/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Image,
    Text,
    Flex,
    Heading,
    useDisclosure
} from '@salesforce/retail-react-app/app/components/shared/ui'
import { getAppOrigin } from '@salesforce/pwa-kit-react-sdk/utils/url'
import Link from '@salesforce/retail-react-app/app/components/link'
import {useCategory} from '@salesforce/commerce-sdk-react'

/**
 * Image with text component
 *
 * @param {object} props
 * @param {string} - props.category - Image Link.
 * @param {string} - props.text_headline - Text Below Image.
 * @param {image} - props.image - Image.
 * @param {string} - props.heading - text_subline.
 * @param {string} - props.alt - The image alt text shown by the component.
 * @returns {React.ReactElement} - ShopCategory component.
 */
export const RetailerCategoryTile = ({catDisplayName, category, image, customClass}) => {
    const textHeading = catDisplayName
    const catLink = category
    const {error, data: categoryData} = useCategory(
    {
        parameters: {
            id: category
        }
    })
    const fallbackImage = categoryData?.image;

    const [selectedCategory, setSelectedCategory] = useState(null)

       const {isOpen, onOpen, onClose} = useDisclosure()

       const onClickHander = (ctgData) => {
            onOpen()
            setSelectedCategory(ctgData)
        }

    const imageURL = image?.src?.mobile ? image?.src?.mobile : image?.url ? image?.url:categoryData?.image

    return (
        <>
            <Box 
                className={'retailer-category-tile'} 
                width="100%" 
                height='100%'
            >
                <Box display="inline-block" textDecoration="none" _hover={{ textDecoration: "none", cursor: "pointer" }} height='100%' width='100%'>
                    <Box 
                        className={'image-tile-figure'} 
                        borderRadius="12px" 
                        bg="white"
                        minWidth={{ base: '160px', md: '225px'}}
                        height='100%'
                        boxShadow="0px 2px 4px 0px #00000029"
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        justifyContent="center"
                        px={1}
                    >
                        <Box className={customClass}>
                            {textHeading && (
                                <Text as='b' className={'cat-heading-text'} textAlign="center" color='var(--chakra-colors-racDefault-1)' fontSize={{ base: "14px !important", md: "16px !important"}} fontWeight="600" display="block" noOfLines={1} margin="10px 0px">
                                    <Box dangerouslySetInnerHTML={{__html: textHeading}} />
                                </Text>
                            )}
                        </Box>
                        {image && (
                            <picture>
                                <source srcSet={image?.src?.tablet || image?.url || fallbackImage} media="(min-width: 48em)" />
                                <source srcSet={image?.src?.desktop || image?.url || fallbackImage} media="(min-width: 64em)" />
                                <Image
                                    objectFit="contain"
                                    boxSize="100%"
                                    height={{ base: '90px', md: '160px'}}
                                    className={'image-tile-image'}
                                    data-testid={'image-tile-image'}
                                    src={imageURL}
                                    ignoreFallback={true}
                                    alt={image?.alt}
                                    title={image?.alt}
                                    loading="lazy"
                                />
                            </picture>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )

}

export default RetailerCategoryTile
