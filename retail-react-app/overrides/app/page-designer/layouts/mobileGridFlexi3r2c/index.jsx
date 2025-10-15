/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {SimpleGrid} from '@salesforce/retail-react-app/app/components/shared/ui'
import {Region, regionPropType} from '@salesforce/commerce-sdk-react/components'
//import { useRestrictedStores } from '../../../hooks/use-restricted-categories'
//import { useCurrentStore } from '../../../hooks/use-store'

/**
 * This layout component displays its children in a 3 row x 2 column grid on mobile
 * and 2 row x 3 column grid on desktop.
 *
 * @param {componentProps} props
 * @param {regionType []} props.regions - The page designer regions for this component.
 * @param {object} props.data - The data for the component.
 * @param {string} props.typeId - A mapping of typeId's to react components representing the type.
 * @returns {React.ReactElement} - Grid component.
 */

    export const MobileGridFlexi3r2c = ({regions}) => (
        <SimpleGrid className="mobile-flexi-3r-2c" maxW="1200px" mx="auto">
            {regions.map((region) => (
                <Region key={region.id} region={region} />
            ))}
        </SimpleGrid>
    )

    MobileGridFlexi3r2c.displayName = 'MobileGridFlexi3r2c'

export default MobileGridFlexi3r2c
