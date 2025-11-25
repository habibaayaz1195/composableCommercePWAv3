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
} from '@salesforce/retail-react-app/app/components/shared/ui'
import { 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter 
} from '@chakra-ui/react'
import Link from '@salesforce/retail-react-app/app/components/link'
import { isAbsoluteURL } from '@salesforce/retail-react-app/app/page-designer/utils'


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
export const VerticalContentTile = ({
    headingText,
    richText,
    buttonText,
    tileLink,
    imgFile,
    imgAlt
}) => {

    //Text Width Image
    const heading_Text = headingText
    const richText_content = richText
    const btn_Text = buttonText
    const tile_Link = tileLink
    const image_File = imgFile
    const image_Alt = imgAlt

    const isExternal = tile_Link?.startsWith('http://') || tile_Link?.startsWith('https://');

    const image_FileURL = image_File?.src?.mobile ? image_File?.src?.mobile : image_File?.url

    return (

        <Card className='vertical-tile' height={'100%'}>
            {heading_Text && (
                <CardHeader className='vertical-tile-header' m={0} p={0}>
                    <Heading as="h5" className={'heading-text'}>
                        <Box
                            dangerouslySetInnerHTML={{
                                __html: heading_Text
                            }}
                        />
                    </Heading>
                </CardHeader>
            )}
            <CardBody className='vertical-tile-body' m={0} p={0}>
                {image_File && (
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
                )}

                <Box className='inner-content'>
                    {richText_content && (
                        <Text as="p" mb={4} className={'content-text'}
                            dangerouslySetInnerHTML={{
                                __html: richText_content
                            }}
                        />
                    )}
                </Box>
            </CardBody>
            <CardFooter className='vertical-tile-footer' justifyContent={'center'} m={0} p={0}>
                {isExternal ? (
                    <a
                        href={tile_Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="assetBtn-block blue-btn-outline"
                        color="white"
                        title={btn_Text}
                    >
                        {btn_Text}
                    </a>
                ) : (
                    <Link
                        href={tile_Link}
                        className="assetBtn-block blue-btn-outline"
                        color="white"
                        title={btn_Text}
                    >
                        {btn_Text}
                    </Link>
                )}

            </CardFooter>
        </Card>
    )
}

export default VerticalContentTile
