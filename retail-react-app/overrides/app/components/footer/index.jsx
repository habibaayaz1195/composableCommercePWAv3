import React, {useState, useEffect, useMemo } from 'react'
import {Box} from '@chakra-ui/react'
import {usePage} from '@salesforce/commerce-sdk-react'
import {Page} from '@salesforce/commerce-sdk-react/components'
import {useIntl} from 'react-intl'
import {PDPlusContentAsset, EditorialRichText} from '../../page-designer/assets'
import {MobileGrid1r1c, MobileGridFlexi3r2c, MobileGrid2r2c} from '../../page-designer/layouts'

const PAGEDESIGNER_TO_COMPONENT = {
    'commerce_assets.editorialRichText': EditorialRichText,
    'commerce_layouts.mobileGridFlexi3r2c': MobileGridFlexi3r2c,
    'commerce_layouts.mobileGrid1r1c': MobileGrid1r1c,
    'pd_assets.pdPlusContentAsset': PDPlusContentAsset,
    'commerce_layouts.mobileGrid2r2c': MobileGrid2r2c
}


const Footer = () => {
    const {data: page, error} = usePage({parameters: {pageId: 'footer'}})
    const intl = useIntl()

    return (
        <Box
            className={'footer-wrapper'}
            as="footer"
            color="#ffffff"
            bg={'#003863'}
            width="100%"
            margin="0 auto"
            px={{base: '24px', sm: '24px'}}
            py={{base: '32px', sm: '80px'}}
        >
            <Page page={page} components={PAGEDESIGNER_TO_COMPONENT} />
        </Box>
    )
}

export default Footer
