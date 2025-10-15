/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Box} from '@salesforce/retail-react-app/app/components/shared/ui'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'
import useMultiSite from '@salesforce/retail-react-app/app/hooks/use-multi-site'
import {useAccessToken} from '@salesforce/commerce-sdk-react'
import {fetchContentAsset} from '../../../utils/api'

/**
 * Simple ImageTile component that can be used inside any Layout component.
 * @param image Object containing the image url, _type and focalPoint.
 * @returns {JSX.Element}
 */
export const PDPlusContentAsset = ({contentassetID, cssClassName}) => {
    const {locale} = useMultiSite()
    const config = getConfig()
    const {getTokenWhenReady} = useAccessToken()
    const [refetch] = useState(false)
    const [GetContentAssetID , setContentassetID] = useState('')

    useEffect(() => {
        fetchContentAsset(`${contentassetID}`, config, getTokenWhenReady, locale.id).then((res3) => {
            if (!res3.error) {
                setContentassetID(res3.c_body)
            }
        })
    }, [refetch])
        
    return (
        <Box className='contentAsset-holder'>
            <Box className={`asset-name ${cssClassName}`}>
                <div dangerouslySetInnerHTML={{__html: GetContentAssetID}} />
            </Box>
        </Box>
    )
}

export default PDPlusContentAsset
