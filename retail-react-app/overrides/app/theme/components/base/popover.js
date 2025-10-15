/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    parts: ['popper', 'header', 'footer', 'content', 'body', 'closeButton', 'caretIcon'],
    baseStyle: {
        popper: {
            borderColor: 'transparent',
            borderRadius: 'base',
            boxShadow: '0px 1px 12px rgba(0, 0, 0, 0.25)',
        },
        closeButton: {
            position: 'absolute',
            top: 2,
            right: 2,
            ariaLabel: 'Close',
            color: 'var(--chakra-colors-blue-600)',
            size: 16,
            _hover: { backgroundColor: 'white' },
        },
        caretIcon: {
            display: 'flex',
            justifyContent: 'center',
            mt: '-17px',
            color: 'var(--chakra-colors-blue-600)',
        },
    },
    variants: {
        small: {},
        normal: {
            popper: {
                width: 286,
            },
            header: {
                textAlign: 'left',
                fontWeight: 700,
                borderBottom: 'none',
                fontSize: 18,
                px: 7,
                paddingTop: 6,
            },
            footer: {
                textAlign: 'left',
                fontSize: 14,
                px: 3,
                borderTop: 'none',
            },
            content: {
                width: 286,
            },
            body: {
                py: 0,
            },
        },
        fullWidth: {
            popper: {
                width: '100%',
                maxWidth: '100%',
                boxShadow: 'none',
                top: '0',
                right: 'auto',
                bottom: 'auto',
                left: '0',
            },
            content: {
                width: 'auto',
            },
        },
        custom: {
            popper: {
                mt: 1,
                border: '2px solid var(--chakra-colors-blue-600)',
                width: '300px',
                bg: 'white',
                placement: 'bottom',
                borderRadius: 'md',
                boxShadow: 'md',
            },
            caretIcon: {
                color: 'var(--chakra-colors-blue-600)',
                size: 24,
            },
            content: {
                bg: 'white',
                color: 'black',
                borderRadius: 'md',
                p: 4,
                boxShadow: 'md',
                position: 'relative',
            },
            closeButton: {
                color: 'var(--chakra-colors-blue-600)',
                size: 16,
                _hover: { backgroundColor: 'white' },
            },
            text: {
                fontSize: 'lg',
                fontWeight: 'bold',
                color: 'black',
                mb: 2,
            },
            description: {
                mb: 2,
            },
        },
    },
    defaultProps: {
        variant: 'normal',
    },
};
