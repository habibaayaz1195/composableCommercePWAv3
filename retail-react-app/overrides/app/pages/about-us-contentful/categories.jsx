import React from 'react';
import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react';

const Categories = ({ fCategoriesData }) => {
  return (
    <Box width="100%" className='category-holder'>
        <Text className='category-title'>
            {fCategoriesData.title}
        </Text>

        <Flex pt={5} flexDirection="row" alignItems="center" justifyContent="space-around" className='category-inner'>
            {fCategoriesData.f_categories.map((item, itemIndex) => (
                <Box key={itemIndex} mb={3} textAlign="center" className='category-item'>
                    <Tooltip label={item.altText} hasArrow>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <Image src={item.asset.url} alt={item.title} boxSize="200px" px={2} />
                        </a>
                    </Tooltip>
                    <Text textTransform="capitalize" fontWeight={500} mt={2}>
                        {item.title}
                    </Text>
                </Box>
            ))}
        </Flex>
    </Box>
  );
};

export default Categories;
