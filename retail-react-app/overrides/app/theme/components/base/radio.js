/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        container: {
            display: 'flex',
            border: '1px solid',
            borderColor: 'gray.200',
            padding: '12px',
            borderRadius: '12px',
            _checked: {
                borderColor: 'rcDefault.4',
                _hover: {
                    borderColor: 'rcDefault.4'
                }
            }
        },
        label: {
            width: 'full',
            fontWeight: '700'
        },
        control: {
            backgroundColor: 'white',
            _checked: {
                backgroundColor: 'rcDefault.4',
                borderColor: 'rcDefault.4',
                _hover: {
                    borderColor: 'rcDefault.4'
                }
            },
            _indeterminate: {}
        }
    },
    sizes: {
        md: {
            container: {alignItems: 'flex-start'},
            control: {marginTop: '0.25em'},
            label: {marginLeft: 3}
        }
    }
}
