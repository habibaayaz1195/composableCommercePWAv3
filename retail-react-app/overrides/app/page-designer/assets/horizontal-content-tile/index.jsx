/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Image,
    Link as ChakraLink,
    Text,
    Heading,
    useBreakpointValue,
    Stack
} from '@salesforce/retail-react-app/app/components/shared/ui'

import Link from '@salesforce/retail-react-app/app/components/link'


/**
 * Static Content component
 *
 * @param {object} props
 * @param {string} - props.featureImage - Image Link.
 * @param {string} - props.moduleHeading - Text Below Image.
 * @param {image} - props.featureImage - Image.
 * @param {string} - props.featureDesc - Text Description.
 * @param {string} - props.assetCTATitle - Button Title.
 * @returns {React.ReactElement} - TextWithImage component.
 */
export const HorizontalContentTile = ({
    headingText,
    richText,
    buttonText,
    tileLink,
    imgFile,
    imgAlt,
    buttonRef // Accept buttonRef as a prop
}) => {

    //Text Width Image
    const heading_Text = headingText
    const richText_content = richText
    const btn_Text = buttonText
    const tile_Link = tileLink
    const image_File = imgFile
    const image_Alt = imgAlt
    const isMobile = useBreakpointValue({ base: true, md: false });
    const isDesktop = useBreakpointValue({ base: false, md: true });

    const image_FileURL = image_File?.src?.mobile ? image_File?.src?.mobile : image_File?.url

    return (
        <Box className='horizontal-tile' height={'100%'}>
            <Box className='horizontal-tile-container' m={0} p={0}>
                <Image
                    mx='auto'
                    objectFit='contain'
                    className={'image-tile-image'}
                    data-testid={'image-tile-image'}
                    borderRadius={'16px'}
                    src={image_FileURL}
                    ignoreFallback={true}
                    alt={image_File?.image_Alt}
                    title={image_File?.image_Alt}
                />

                <Box className='horizontal-content-holder'>
                    {heading_Text && (
                        <Heading as="h5" className={'heading-text horizontal-tile-heading'}>
                            <Box
                                dangerouslySetInnerHTML={{
                                    __html: heading_Text
                                }}
                            />
                        </Heading>
                    )}

                    {/* Desktop Rich Text */}
                    {isDesktop ? 
                        <Box className='inner-content-desktop inner-content'>
                            {richText_content && (
                                <Text as="p" mb={4} className={'content-text'} dangerouslySetInnerHTML={{ __html: richText_content }} />
                            )}
                        </Box> : ''
                    }

                    {btn_Text && (
                        <Box className='horizontal-tile-btn' justifyContent={'center'} m={0} p={0}>
                            <Link className="assetBtn-block primary-btn" color="white" href={tile_Link} title={btn_Text}>
                                {btn_Text}
                            </Link>
                        </Box>
                    )}
                </Box>

                {/* Inner Content (Mobile) */}
                {isMobile ? 
                    <Box className='inner-content-mobile inner-content'>
                        {richText_content && (
                            <Text as="p" mb={4} className={'content-text'} dangerouslySetInnerHTML={{ __html: richText_content }} />
                        )}
                    </Box> : ''
                }
            </Box>
        </Box>
    )
}

export default HorizontalContentTile
