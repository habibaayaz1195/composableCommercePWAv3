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
 * @param {string} - props.buttonText - Text for the button.
 * @param {string} - props.tileLink - URL the button should navigate to.
 * @param {boolean} - props.getStartedModal - Flag to show the Get Started modal.
 * @returns {React.ReactElement} - linkButton component.
 */

const SPECIAL_URL = 'https://acimacredit.my.site.com/'
export const linkButton = ({buttonText, tileLink, getStartedModal}) => {
    const btnText = buttonText
    const isAbsolute = isAbsoluteURL(tileLink)
    const linkProps = isAbsolute ? {href: tileLink} : {to: tileLink}
    // Disclosure for Get Started modal
    const { isOpen: isOpenStart, onOpen: onOpenStart, onClose: onCloseStart } = useDisclosure()
    // Disclosure for Classic Credit modal
    const { isOpen: isOpenCredit, onOpen: onOpenCredit, onClose: onCloseCredit } = useDisclosure()

    // Click handler for "Apply for Credit" button
    const handleClick = e => {
        // If this is the special Acima site link, open the credit modal
        if (tileLink === SPECIAL_URL) {
            e.preventDefault()
            onOpenCredit()
        }
        // Otherwise, let the link navigate normally
    }

    return (
        <>
            {getStartedModal ? (
                <Button
                    width={{base: 'full', md: 'inherit'}}
                    paddingX={7}
                    {...linkProps}
                    _hover={{textDecoration: 'none'}}
                    onClick={onOpenStart}
                    className='get-started'
                >
                    <Text as="span">{btnText}</Text>
                </Button>
            ) : (
                <Button
                    as="a"
                    href={tileLink}
                    width={{base: 'full', md: 'inherit'}}
                    paddingX={7}
                    {...linkProps}
                    _hover={{textDecoration: 'none'}}
                    onClick={handleClick}
                >
                    <Text as="span">{btnText}</Text>
                </Button>
            )}

            {/* Modal for Get Started form */}
            <GetStartedFormModal
                isOpen={isOpenStart}
                onClose={onCloseStart}
            />

            {/* Modal for Classic Credit redirecting after 3 seconds */}
            <ClassicCreditModal
                isOpen={isOpenCredit}
                onClose={onCloseCredit}
            />
        </>
    )
}

linkButton.propTypes = {
    buttonText: PropTypes.string,
    tileLink: PropTypes.string.isRequired,
    getStartedModal: PropTypes.bool
}

export default linkButton
