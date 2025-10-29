import React from 'react';
import PropTypes from 'prop-types';
import { SimpleGrid, Box } from '@salesforce/retail-react-app/app/components/shared/ui';
import { Region, regionPropType } from '@salesforce/commerce-sdk-react/components';

/**
 * This layout component displays its children in a 3 by 9 grid on desktop,
 * and stacks vertically on mobile.
 *
 * @param {componentProps} props
 * @param {regionType []} props.regions - The page designer regions for this component.
 * @param {object} props.data - The data for the component.
 * @param {string} props.typeId - A mapping of typeId's to react components representing the type.
 * @returns {React.ReactElement} - Grid component.
 */
export const LayoutGrid3By9 = ({ regions, customClass}) => (
    <SimpleGrid className={`LayoutGrid3By9 ${customClass}`} padding={'80px 15px 160px'}
        columns={{ base: 12, sm: 12 }} // Single column on mobile, two on medium screens and up
        spacing={4} // Add spacing between the columns
    >
        <Box gridColumn={{ sm: 'span 12', md: 'span 3' }} className='left-content'> {/* 3-column width for larger screens */}
            <Region region={regions[0]} />
        </Box>
        <Box gridColumn={{ sm: 'span 12', md: 'span 9' }} className='main-content'> {/* 9-column width for larger screens */}
            <Box className='content-detail-card'>
                <Region region={regions[1]} />
            </Box>
        </Box>
    </SimpleGrid>
);

LayoutGrid3By9.displayName = 'LayoutGrid3By9';

LayoutGrid3By9.propTypes = {
    regions: PropTypes.arrayOf(regionPropType).isRequired
};

export default LayoutGrid3By9;
