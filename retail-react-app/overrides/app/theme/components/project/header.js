import colors from "../../foundations/colors";

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        container: {
            minWidth: 'xs',
            width: 'full',
            boxShadow: 'base',
            backgroundColor: 'white'
        },
        content: {
            maxWidth: 'container.xxl',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: [4],
            paddingRight: [4]
        },
        topHeaderContent: {
            color: 'white',
            backgroundColor: 'acimaDefault.4'
        },
        topContentContainer: {
            maxWidth: 'container.xxl',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: [4],
            paddingRight: [4]
        },
        searchContainer: {
            width: '100%',
            maxWidth: {base: '100%', lg: '140px', xl: '232px'}
        },
        search: {
            border: '0',
            borderRadius: [70],
            fontSize: '16px',
            fontWeight: '400',
            color: 'white',
            background: 'rgba(255, 255, 255, 0.16) !important',
            _placeholder: {
                color: 'white'
            }
        },
        bodyContainer: {
            flex: '1'
        },
        icons: {
            marginBottom: [1, 1, 2, 0]
        },
        accountIcon: {
            height: 11,
            minWidth: 'auto',
            cursor: 'pointer',
            alignSelf: ['self-start', 'self-start', 'self-start', 'auto'],
            _focus: {
                boxShadow: 'outline'
            },
            _focusVisible: {
                outline: 0
            }
        },
        arrowDown: {
            height: 11,
            minWidth: 'auto',
            marginRight: 0,
            alignSelf: ['self-start', 'self-start', 'self-start', 'auto'],
            cursor: 'pointer',
            _focus: {
                boxShadow: 'outline'
            },
            _focusVisible: {
                outline: 0
            },
            display: ['none', 'none', 'none', 'block']
        },
        wishlistIcon: {
            // More breathing room between the account and wishlist icons
            marginLeft: 2
        },
        signout: {
            width: '100%',
            borderRadius: '4px',
            height: 11,
            padding: 4,
            py: 3,
            marginTop: 1,
            _hover: {
                background: 'white'
            }
        },
        signoutText: {
            fontSize: 'sm',
            fontWeight: 'normal'
        },
        signoutIcon: {
            marginRight: 2
        }
    },
    parts: ['container', 'content', 'searchContainer', 'bodyContainer', 'logo', 'icons', 'signout']
}
