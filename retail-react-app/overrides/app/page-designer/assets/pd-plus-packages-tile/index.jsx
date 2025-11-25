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
    Button,
    useDisclosure
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
const SPECIAL_URL = 'https://acimacredit.my.site.com/';

export const PackagesTile = ({
    headingText,
    richText,
    buttonText,
    tileLink,
    imgFile,
    imgAlt,
    headingTextMarkup
}) => {

    //Text Width Image
    const heading_Text = headingText
    const richText_content = richText
    const btn_Text = buttonText
    const tile_Link = tileLink
    const image_File = imgFile
    const image_Alt = imgAlt
    const heading_Text_Markup = headingTextMarkup

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClick = e => {
        if (tile_Link === SPECIAL_URL) {
          e.preventDefault();
          onOpen();
        }
        // otherwise the link works normally
    };    

    const image_FileURL = image_File?.src?.mobile ? image_File?.src?.mobile : image_File?.url

    return (

        <Card maxW='sm' className='packages-tile' height={'100%'}>
            <CardHeader className='packages-tile-header' m={0} p={0}>
                {heading_Text_Markup && (
                        <Box
                            dangerouslySetInnerHTML={{
                                __html: heading_Text_Markup
                            }}
                        />
                )}
                {heading_Text && (
                    <Heading as="h4" className={'heading-text'}>
                        <Box
                            dangerouslySetInnerHTML={{
                                __html: heading_Text
                            }}
                        />
                    </Heading>
                )}
            </CardHeader>
            <CardBody className='packages-tile-body' m={0} p={0}>
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
            <CardFooter className='packages-tile-footer' justifyContent={'center'} m={0} p={0}>
                {/* <Link className="assetBtn-block primary-btn" color="white" href={tile_Link} title={btn_Text}>
                    {btn_Text}
                </Link> */}
                <Button
                    as="a"
                    href={tile_Link}
                    className="assetBtn-block primary-btn packages-tile-button"
                    color="white"
                    variant="solid"
                    onClick={handleClick}
                >
                    <Text className='packages-tile-button' as="span">{btn_Text}</Text>
                </Button>
            </CardFooter>
            <ClassicCreditModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </Card>
    )
}

export default PackagesTile
