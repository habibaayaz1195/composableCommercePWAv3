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
    Text,
    useMediaQuery,
    useDisclosure
} from '@salesforce/retail-react-app/app/components/shared/ui'
import Link from '@salesforce/retail-react-app/app/components/link'


/**
 * PromotionalBanner component with a conditional modal on special URL click
 *
 * @param {object} props
 * @param {object} props.image - Image object with url
 * @param {string} props.bannerClass - Optional CSS class suffix
 * @param {string} props.imageAlt - Alt text for the image
 * @param {string} props.acimaBtnLink - URL for the banner link
 * @returns {React.ReactElement} - PromotionalBanner component.
 */

const SPECIAL_URL = 'https://acimacredit.my.site.com/'

export const PromotionalBanner = ({
    image,
    bannerClass,
    imageAlt,
    acimaBtnLink
}) => {
    const [isMobile] = useMediaQuery('(max-width: 768px)')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleClick = e => {
        if (acimaBtnLink === SPECIAL_URL) {
            e.preventDefault()
            onOpen()
        }
        // otherwise, link navigates normally
    }

    const imageURL = image?.url

    return (
        <Box className={`promo-banner-wrapper ${bannerClass || ''}`}>
            <Link
                to={'/'+acimaBtnLink}
                onClick={handleClick}
            >
                {image && (
                    <Box className='image-wrapper'>
                        <Image
                            src={imageURL}
                            alt={imageAlt}
                            title={imageAlt}
                            w='100%'
                            fetchpriority="high"
                        />
                    </Box>
                )}
                <Text as='span'>
                    {/* You can insert banner text or children here */}
                </Text>
            </Link>

            <ClassicCreditModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </Box>
    )
}

PromotionalBanner.propTypes = {
    image: PropTypes.shape({ url: PropTypes.string.isRequired }),
    bannerClass: PropTypes.string,
    imageAlt: PropTypes.string,
    acimaBtnLink: PropTypes.string.isRequired
}

export default PromotionalBanner
