/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Image, useMediaQuery} from '@salesforce/retail-react-app/app/components/shared/ui'


/**
 * Simple ImageTile component that can be used inside any Layout component.
 * @param image Object containing the image url, _type and focalPoint.
 * @returns {JSX.Element}
 */
export const ImageTileResponsive = ({ image, imageMob, imageAlt, imageMobAlt }) => {
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const imageMobURL = imageMob?.url
    const imageURL = image?.url

    return (
        <Box className={'image-tile'}>
            <figure className={'image-tile-figure'}>
                {isMobile ? (
                    <Image 
                        className={'image-tile-image'} 
                        src={imageMobURL}
                        data-testid={'image-tile-image'}
                        alt={imageMobAlt?.alt}
                        title={imageMobAlt?.alt}
                        loading="lazy"
                    />
                ) : (
                    <Image 
                        className={'image-tile-image'} 
                        src={imageURL}
                        data-testid={'image-tile-image'}
                        alt={imageAlt?.alt}
                        title={imageAlt?.alt}
                        loading="lazy"
                    />
                )}
            </figure>
        </Box>
    )
}

export default ImageTileResponsive
