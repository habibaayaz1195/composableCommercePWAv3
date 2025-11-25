/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Image,
    Link as ChakraLink,
    Text,
    Heading,
    HStack,
    VStack,
    Button
} from '@salesforce/retail-react-app/app/components/shared/ui'
import { Card, CardBody } from '@chakra-ui/react'
import Link from '@salesforce/retail-react-app/app/components/link'
import { isAbsoluteURL } from '@salesforce/retail-react-app/app/page-designer/utils'
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import { MinusIcon, AddIcon } from '@chakra-ui/icons'



/**
 * Static Content component
 *
 * @param {object} props
 * @param {string} - props.featureImage - Image Link.
 * @param {string} - props.moduleHeading - Text Below Image.
 * @param {image} - props.featureImage - Image.
 * @param {string} - props.featureDesc - Text Description.
 * @param {string} - props.assetCTATitle - Button Title.
 * @returns {React.ReactElement} - StaticContent component.
 */
export const StaticContent = ({
    featureIcon,
    iconAlt,
    featureHeading,
    featureDesc,
    moduleBannerImage,
    moduleImgAlt,
    moduleTitle,
    moduleDesc,
    featureImage,
    moduleHeading,
    featureContentDesc,
    assetCTALabel,
    assetCTATitle,
    assetCTAURL,
    readMoreText,
    readMoreLink,
    testimonialsText,
    classNames
    
}) => {

    //Banner Caption Holder
    const feature_Icon = featureIcon
    const icon_Alt = iconAlt
    const feature_Heading = featureHeading
    const feature_Description = featureDesc

    //Banner Caption Holder
    const module_BannerImage = moduleBannerImage
    const module_ImgAlt = moduleImgAlt
    const module_Title = moduleTitle
    const module_Desc = moduleDesc
    // Stacked content
    const feature_Image = featureImage
    const module_Heading = moduleHeading
    const feature_Desc = featureContentDesc
    const assetCTA_Label = assetCTALabel
    const assetCTA_Title = assetCTATitle
    const assetCTA_URL = assetCTAURL

    // const urlParts = assetCTA_URL.split('/'); // Split by '/'
    // const dynamicLink = urlParts[urlParts.length - 1]; // Get the last segment

    const [show, setShow] = React.useState(false)
    const handleToggle = () => setShow(!show)

    const feature_ImageURL = feature_Image?.src?.mobile ? feature_Image?.src?.mobile : feature_Image?.url
    const module_BannerImageURL = module_BannerImage?.src?.mobile ? module_BannerImage?.src?.mobile : module_BannerImage?.url
    const feature_IconURL = feature_Icon?.src?.mobile ? feature_Icon?.src?.mobile : feature_Icon?.url


    return (
        <Box className= {`static-content-container ${classNames}`} w='100%' mx='auto' pt={2} px={4}>
            <Box className={'static-content-holder'} mb={2}>
                {feature_Image && (
                    <figure className={'image-tile-figure'}>
                        <picture>
                            <source srcSet={feature_Image?.src?.tablet} media="(min-width: 48em)" />
                            <source srcSet={feature_Image?.src?.desktop} media="(min-width: 64em)" />
                            <Image
                                boxSize='80%'
                                mx='auto'
                                objectFit='cover'
                                className={'image-tile-image'}
                                data-testid={'image-tile-image'}
                                src={feature_ImageURL}
                                ignoreFallback={true}
                                alt={feature_Image?.alt}
                                title={feature_Image?.alt}
                                fetchpriority="high"
                                loading="lazy"
                            />
                        </picture>
                    </figure>
                )}

                {moduleHeading && (
                    <Heading as='h1' mb={4} className={'content-heading-text'} color={'black'}>
                        <Box color={'black'}
                            dangerouslySetInnerHTML={{
                                __html: moduleHeading
                            }}
                        />
                    </Heading>
                )}

                {feature_Desc && (
                    <Text as='p' className={'content-decription'} color={'black'} mb={4}>
                        <Box color={'black'}
                            dangerouslySetInnerHTML={{
                                __html: feature_Desc
                            }}
                        />
                    </Text>
                )}
            </Box>

            <Box className={'static-banner-holder'} position="relative" zIndex="2">
                <figure className={'image-tile-figure'}>
                    {module_BannerImage && (
                        <picture>
                            <source srcSet={module_BannerImage?.src?.tablet} media="(min-width: 48em)" />
                            <source srcSet={module_BannerImage?.src?.desktop} media="(min-width: 64em)" />
                            <Image
                                boxSize='100%'
                                mx='auto'
                                objectFit='cover'
                                className={'image-tile-image'}
                                data-testid={'image-tile-image'}
                                src={module_BannerImageURL}
                                ignoreFallback={true}
                                alt={module_BannerImage?.alt}
                                title={module_BannerImage?.alt}
                            />
                        </picture>
                    )}

                    {module_Title && (
                        <Text as="figcaption">
                            <Box
                                className={'image-with-text-heading-container'}
                                position={'absolute'}
                                top={'50%'}
                                right={0}
                                left={0}
                                transform={'translateY(-50%)'}
                                width={'100%'}
                                height={'100%'}
                                padding={'15px'}
                                backgroundColor={'rgba(0, 0, 0, 0.5)'}
                                textAlign={{ base: 'center', sm: 'center' }}
                            >
                                <VStack spacing={4} align='center' height='100%' maxW='80%' p={4} mx='auto' >
                                    {module_Title && (
                                        <Heading as="h1" className={'heading-text'}>
                                            <Box color={'white'}
                                                dangerouslySetInnerHTML={{
                                                    __html: moduleHeading
                                                }}
                                            />
                                        </Heading>
                                    )}

                                    {module_Title && (
                                        <Text as="p" className={'content-text'} color={'white'}
                                            dangerouslySetInnerHTML={{
                                                __html: module_Desc
                                            }}

                                            sx={{
                                                p: {
                                                    color: 'white'
                                                },
                                                span: {
                                                    color: 'white'
                                                }
                                            }}
                                        />
                                    )}
                                </VStack>
                            </Box>
                        </Text>
                    )}
                </figure>
            </Box>

            <HStack spacing={4} align="start">
                {feature_Icon && (
                    <Box
                        border="2px"
                        borderColor="blue.400"
                        borderRadius="50%"
                        boxSize="70px"
                        overflow="hidden"
                        flexShrink="0"
                        display="flex"
                        alignItems="center"
                        align="center"
                    >
                        <Image
                            boxSize='50px'
                            mx='auto'
                            flexShrink='0'
                            objectFit='contain'
                            className={'image-tile-icon'}
                            data-testid={'image-tile-icon'}
                            src={feature_IconURL}
                            ignoreFallback={true}
                            alt={feature_Icon?.alt}
                            title={feature_Icon?.alt}
                        />
                    </Box>
                )}

                <Box flexGrow="1">
                    {feature_Heading && (
                        <Heading as="h3" fontSize="24px" className={'heading-text'} mb={2}>
                            <Box
                                dangerouslySetInnerHTML={{
                                    __html: feature_Heading
                                }}
                            />
                        </Heading>
                    )}
                    {feature_Description && (
                        <Text as="p" className={'content-text'}
                            dangerouslySetInnerHTML={{
                                __html: feature_Description
                            }}
                        />
                    )}


                    {readMoreText && (
                        <>
                            <Collapse startingHeight={0} in={show}>
                                <Text as='p' className={'readMore-decription'} color={'black'} mb={4}>
                                    <Box color={'black'}
                                        dangerouslySetInnerHTML={{
                                            __html: readMoreText
                                        }}
                                    />
                                </Text>
                            </Collapse>
                            <Button size='sm' onClick={handleToggle} mt='1rem' className="readmore">
                                Read More {show ? <MinusIcon w="15px" pl="5px" color="#0f99d6" /> : <AddIcon w="15px" pl="5px" color="#0f99d6" />}
                            </Button>
                        </>
                    )}

                    {testimonialsText && (
                        <Text as="p"
                            className={'content-text'}
                            bg="#ffffff"
                            borderRadius="10px"
                            p="15px"
                            boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.5)"
                            mt="15px"
                            mb="6px"
                            dangerouslySetInnerHTML={{
                                __html: testimonialsText
                            }}
                        />
                    )}
                </Box>
            </HStack>
        </Box>
    )
}

export default StaticContent
