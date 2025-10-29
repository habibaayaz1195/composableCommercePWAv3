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
import { useRestrictedStores } from '../../../hooks/use-restricted-categories'
import { useCurrentStore } from '../../../hooks/use-store'

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

export const MobileGrid3r2c1 = ({regions}) => {
const {restrictedStores:restrictedCategories} = useRestrictedStores()
const {store} = useCurrentStore()
if((!Array.isArray(restrictedCategories) && store) || (!restrictedCategories && !store)){
  return;
}

let renderedRegions;

if(Array.isArray(restrictedCategories) && restrictedCategories.length >0){
    renderedRegions = regions.filter((region)=>{
    const category = region.components[0].data.category;
    return restrictedCategories.includes(category)?false:true
})

}

else {
  renderedRegions = regions;
}
  return (  
  <SimpleGrid className="mobile-3r-2c1" maxW="1200px" mx="auto"
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" }} gridGap={2}
    >
        {renderedRegions && renderedRegions.map((region) => {
          return  (
            <Region key={region.id} region={region} />
        )})}

    </SimpleGrid>
  )}

MobileGrid3r2c1.displayName = 'MobileGrid3r2c1'

export default MobileGrid3r2c1
