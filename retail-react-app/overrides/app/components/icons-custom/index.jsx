/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {forwardRef, useContext} from 'react'
import {defineMessage, IntlContext} from 'react-intl'
import PropTypes from 'prop-types'
import {Icon, useTheme} from '@salesforce/retail-react-app/app/components/shared/ui'

// Our own SVG imports. These will be extracted to a single sprite sheet by the
// svg-sprite-loader webpack plugin at build time and injected in the <body> tag
// during SSR.
// NOTE: Another solution would be to use `require-context.macro` package to accomplish
// importing icon svg's.

import '../../assets/svg/hamburger.svg'
import '../../assets/svg/location-icon.svg'
import '../../assets/svg/location-icon-blue.svg'
import '../../assets/svg/brand-logo.svg'
import '../../assets/svg/quote-icon-orange.svg'
import '../../assets/svg/printer.svg'
import '../../assets/svg/chevron-right.svg'
import '../../assets/svg/chevron-up.svg'
import '../../assets/svg/blue-back-arrow.svg'
import '../../assets/svg/dashboard-icon.svg'
import '../../assets/svg/logout-icon.svg'
import '../../assets/svg/green-tick.svg'

// For non-square SVGs, we can use the symbol data from the import to set the
// proper viewBox attribute on the Icon wrapper.

// TODO: We're hardcoding the `viewBox` for these imported SVGs temporarily as the
// SVG loader plugin is not properly providing us the symbol data on the client side.


/**
 * A helper for creating a Chakra-wrapped icon from our own SVG imports via sprite sheet.
 * @param {string} name - the filename of the imported svg (does not include extension)
 * @param {Object} passProps - props that will be passed onto the underlying Icon component
 * @param {Object} localizationAttributes - attributes with localized values that will be passed
 *      onto the underlying Icon component, use `defineMessage` to create localized string.
 *      Additionally, if the icon is rendered outside the provider tree, you'll also need to
 *      pass an intl object from react-intl as a prop to translate the messages.
 */
/* istanbul ignore next */
export const icon = (name, passProps, localizationAttributes) => {
    const displayName = name
        .toLowerCase()
        .replace(/(?:^|[\s-/])\w/g, (match) => match.toUpperCase())
        .replace(/-/g, '')
    const component = forwardRef((props, ref) => {
        const theme = useTheme()
        // NOTE: We want to avoid `useIntl` here because that throws when <IntlProvider> is not in
        // the component ancestry, but we only enforce `intl` if we have `localizationAttributes`.
        let intl = useContext(IntlContext)
        if (localizationAttributes) {
            if (props?.intl) {
                const {intl: intlProp, ...otherProps} = props
                // Allow `props.intl` to take precedence over the intl we found
                intl = intlProp
                props = otherProps
            }
            if (!intl) {
                throw new Error(
                    'To localize messages, you must either have <IntlProvider> in the component ancestry or provide `intl` as a prop'
                )
            }
            Object.keys(localizationAttributes).forEach((key) => {
                passProps[key] = intl.formatMessage(localizationAttributes[key])
            })
        }
        const baseStyle = theme?.components?.Icon?.baseStyle
        return (
            <Icon ref={ref} role="img" aria-label={name} {...baseStyle} {...passProps} {...props}>
                <use role="presentation" xlinkHref={`#${name}`} />
            </Icon>
        )
    })

    component.propTypes = {
        intl: PropTypes.object
    }

    component.displayName = `${displayName}Icon`
    return component
}

// Export Chakra icon components that use our SVG sprite symbol internally
// For non-square SVGs, we can use the symbol data from the import to set the
// proper viewBox attribute on the Icon wrapper.
export const HamburgerCustomIcon = icon('hamburger', {width: '88', height: '24', viewBox: '0 0 88 24'})
export const LocationIcon = icon('location-icon', {width: '16', height: '16', viewBox: '0 0 16 16'})
export const LocationIconBlue = icon('location-icon-blue', {width: '16', height: '16', viewBox: '0 0 16 16'})
export const BrandLogo = icon('brand-logo', {width: '135', height: '33', viewBox: '0 0 135 33'})
export const QuoteIconOrange = icon('quote-icon-orange', {width: '40', height: '40', viewBox: '0 0 40 40'})
export const Printer = icon('printer', {width: '15px', height: '16px', viewBox: '0 0 15 16'})
export const ChevronRight = icon('chevron-right', {width: '12px', height: '12px', viewBox: '0 0 12 12'})
export const ChevronUp = icon('chevron-up', {width: '16px', height: '16px', viewBox: '0 0 16 16'})
export const BlueBackArrow = icon('blue-back-arrow', {width: '24px', height: '24px', viewBox: '0 0 24 24'})
export const DashboardIcon = icon('dashboard-icon', {width: '24px', height: '24px', viewBox: '0 0 24 24'})
export const LogoutIcon = icon('logout-icon', {width: '24px', height: '24px', viewBox: '0 0 24 24'})
export const GreenTick = icon('green-tick', {width: '20px', height: '20px', viewBox: '0 0 20 20'})