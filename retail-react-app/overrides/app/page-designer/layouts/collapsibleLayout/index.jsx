/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {SimpleGrid, Heading, Box} from '@salesforce/retail-react-app/app/components/shared/ui'
import {Region, regionPropType} from '@salesforce/commerce-sdk-react/components'
import { useIntl } from 'react-intl'

/**
 * This layout component displays its children in a 2 row x 1 column grid on mobile
 * and a 1 row x 2 column grid on desktop.
 *
 * @param {componentProps} props
 * @param {regionType []} props.regions - The page designer regions for this component.
 * @param {object} props.data - The data for the component.
 * @param {string} props.typeId - A mapping of typeId's to react components representing the type.
 * @returns {React.ReactElement} - Grid collapsibleLayout component.
 */

export const CollapsibleLayout = ({regions}) => {
    const intl = useIntl()

    return (
        <>
            <SimpleGrid className="collapsibleLayout" columns={1} gridGap={4} width={'100%'}>
                {regions.map((region) => (
                    <Region key={region.id} region={region} />
                ))}
            </SimpleGrid>
        </>
    )
}

CollapsibleLayout.displayName = 'CollapsibleLayout'

CollapsibleLayout.propTypes = {
    // Internally Provided
    regions: PropTypes.arrayOf(regionPropType).isRequired
}

export default CollapsibleLayout
