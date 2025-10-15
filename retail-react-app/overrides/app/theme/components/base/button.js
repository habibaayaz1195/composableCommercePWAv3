/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        borderRadius: '0'
    },
    variants: {
        solid: (props) =>
            props.colorScheme === 'acimaDefault'
                ? {
                      backgroundColor: 'acimaDefault.6',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      _hover: {bg: 'acimaDefault.10', textDecoration: 'none', _disabled: {bg: 'acimaDefault.11'}},
                      _focus: {bg: 'acimaDefault.6', textDecoration: 'none', outline: '3px solid acimaDefault.11'},
                      _active: {bg: 'acimaDefault.12'},
                      _disabled: {opacity: '0.6', color: 'white', bg: 'acimaDefault.11'}
                  }
                : {},
        outline: (props) =>
            props.colorScheme === 'acimaDefault.6'
                ? {color: 'acimaDefault.6', _hover: {bg: 'acimaDefault.6'}, borderColor: 'acimaDefault.6'}
                : {color: 'acimaDefault.6', _hover: {bg: 'acimaDefault.6'}},
        footer: {
            fontSize: 'sm',
            backgroundColor: 'gray.100',
            color: 'black',
            _hover: {bg: 'gray.200'},
            _active: {bg: 'gray.300'},
            paddingLeft: 3,
            paddingRight: 3
        },
        link: (props) => ({
            color: props.colorScheme === 'red' ? 'red.500' : 'blue.600',
            fontWeight: 'normal',
            minWidth: '1em',
            lineHeight: 4
        }),
        'menu-link': {
            color: 'black',
            justifyContent: 'flex-start',
            fontSize: 'sm',
            _hover: {bg: 'gray.50', textDecoration: 'underline', textDecorationColor: 'gray.900'},
            _activeLink: {
                bg: 'gray.50',
                borderLeft: 'solid',
                borderLeftColor: 'gray.600',
                borderLeftWidth: '4px'
            }
        },
        'menu-link-mobile': {
            color: 'black',
            justifyContent: 'flex-start',
            fontSize: 'sm',
            _hover: {bg: 'gray.50', textDecoration: 'underline', textDecorationColor: 'gray.900'},
            _activeLink: {
                bg: 'gray.50',
                borderLeft: 'solid',
                borderLeftColor: 'gray.300',
                borderLeftWidth: '4px'
            }
        },
        'search-link': {
            color: 'black',
            justifyContent: 'flex-start',
            fontSize: 'sm',
            _hover: {textDecoration: 'none'}
        }
    },
    sizes: {
        md: {
            height: 11,
            minWidth: 11
        }
    },
    defaultProps: {
        colorScheme: 'blue'
    }
}
