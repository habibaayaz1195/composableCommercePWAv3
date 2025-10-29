/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
    Link as ChakraLink,
    Button,
    Text,
    useDisclosure
} from '@salesforce/retail-react-app/app/components/shared/ui'
import Link from '@salesforce/retail-react-app/app/components/link'
import {isAbsoluteURL} from '@salesforce/retail-react-app/app/page-designer/utils'

/**
 * Image with text component
 *
 * @param {object} props
 * @param {string} - props.ITCLink - Image Link.
 * @param {string} - props.ITCText - Text Below Image.
 * @param {image} - props.image - Image.
 * @param {string} - props.heading - Text Overlay.
 * @param {string} - props.alt - The image alt text shown by the component.
 * @returns {React.ReactElement} - ImageWithText component.
 */
export const CompareDiffereceLink = ({buttonText, tileLink, isModalChecked}) => {
    const btnText = buttonText
    const isAbsolute = isAbsoluteURL(tileLink)
    const linkProps = isAbsolute ? {href: tileLink} : {to: tileLink}
    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state

    return (
        <>
            {isModalChecked ? 
                <Button
                    width={{base: 'full', md: 'inherit'}}
                    paddingX={7}
                    {...linkProps}
                    _hover={{textDecoration: 'none'}}
                    onClick={onOpen}
                >
                <Text as="span">{btnText}</Text>
                </Button> :
                <Button
                    as="a"
                    href={tileLink}
                    width={{base: 'full', md: 'inherit'}}
                    paddingX={7}
                    {...linkProps}
                    _hover={{textDecoration: 'none'}}
                >
                    <Text as="span">{btnText}</Text>
                </Button>
            }

            <CompareDifferenceModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}


export default CompareDiffereceLink
