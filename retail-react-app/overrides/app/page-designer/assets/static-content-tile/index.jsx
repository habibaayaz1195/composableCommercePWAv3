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
    VStack
} from '@salesforce/retail-react-app/app/components/shared/ui'


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
export const StaticContentTile = ({
    headingText,
    richText,
    buttonText,
    tileLink,
    imgFile,
    imgAlt
}) => {

    const heading_Text = headingText
    const richText_content = richText
    const btn_Text = buttonText
    const tile_Link = tileLink
    const image_File = imgFile
    const image_Alt = imgAlt

    const image_FileURL = image_File?.src?.mobile ? image_File?.src?.mobile : image_File?.url

    return (
        <VStack maxW='sm' className='static-content-tile' height={'100%'}>
            <Box className='content-tile-wrapper'>
                <Box className='content-holder'>
                    {heading_Text && (
                        <Heading as="h4" className={'heading-text'} mb={4}>
                            <Box
                                dangerouslySetInnerHTML={{
                                    __html: heading_Text
                                }}
                            />
                        </Heading>
                    )}

                    {richText_content && (
                        <Text as="p" mb={4} className={'content-text'}
                            dangerouslySetInnerHTML={{
                                __html: richText_content
                            }}
                        />
                    )}
                </Box>

                <Image
                    mx='auto'
                    objectFit='contain'
                    className={'image-tile-image'}
                    data-testid={'image-tile-image'}
                    src={image_FileURL}
                    ignoreFallback={true}
                    alt={image_File?.image_Alt}
                    title={image_File?.image_Alt}
                    loading="lazy"
                />
            </Box>
            {/* <CardFooter className='static-tile-footer' justifyContent={'center'}>
                <Link className="assetBtn-block primary-btn" color="white" href={tile_Link} title={btn_Text} isExternal>
                    {btn_Text}
                </Link>
            </CardFooter> */}
        </VStack>
    )
}

export default StaticContentTile
