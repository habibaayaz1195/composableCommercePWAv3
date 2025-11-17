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
    Button,
    useMediaQuery,
    useDisclosure
} from '@salesforce/retail-react-app/app/components/shared/ui'
import {isAbsoluteURL} from '@salesforce/retail-react-app/app/page-designer/utils'
import {Container} from '@chakra-ui/react'


/**
 * Editorial rich text component
 *
 * @param {object} props
 * @param {string} - props.ITCText - Rich Text Content.
 * @returns {React.ReactElement} - MainBanner component.
 */
export const MainBannerWithContent = ({
    image,
    heading,
    bannerClass,
    imageMob,
    acimaBtnText,
    acimaBtnLink,
    getStartedModal
}) => {
    const hasCaption = heading
    const [isMobile] = useMediaQuery('(max-width: 768px)')
    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state

    const desktopBannerImage = image?.url
    const nombileBannerImage = imageMob?.url

    return (
        <>
            <Box className={`banner-content-wrapper ${bannerClass ? bannerClass : ''}`}>
                <Box as="figure" position={'relative'} margin={0} className="fig-banner-content">
                    {isMobile ? (
                        <Box className='image-wrapper'>
                            <Image
                                src={nombileBannerImage}
                                alt="Mobile Banner"
                                w="100%"
                                fetchpriority="high"
                            />
                            <Box className='img-overlay'/>
                        </Box>
                    ) : (
                        <Box className='image-wrapper'>
                            <Image
                                src={desktopBannerImage}
                                alt="Mobile Banner"
                                w="100%"
                                fetchpriority="high"
                            />
                            <Box className='img-overlay'/>
                        </Box>
                    )}

                    {hasCaption && (
                        <Box as="figcaption" className='fig-banner-caption'>
                        <Box>
                                {heading && (
                                    <Box className={'banner-inner-text'}
                                        dangerouslySetInnerHTML={{
                                            __html: heading
                                        }}
                                    />
                                )}

                        {acimaBtnText && (
                            getStartedModal ? 
                                <Button
                                    bg="#F75200"
                                    size="lg"
                                    borderRadius="full"
                                    width="fit-content"
                                    className='btn-shop'
                                    onClick={onOpen}
                                >
                                    {acimaBtnText}
                                </Button>
                                :
                                <Button
                                    as="a"
                                    href={acimaBtnLink}
                                    bg="#F75200"
                                    size="lg"
                                    borderRadius="full"
                                    width="fit-content"
                                    className='btn-shop font-12'
                                >
                                    {acimaBtnText}
                                </Button>
                            )}                   
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default MainBannerWithContent
