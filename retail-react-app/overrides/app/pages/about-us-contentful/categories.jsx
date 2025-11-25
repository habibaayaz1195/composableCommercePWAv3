import React from 'react';
import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react';

const Categories = ({ fCategoriesData }) => {
  return (
    <Box paddingY="40px" width="100%" fontFamily="'Roboto', Arial, sans-serif">
      <Text fontWeight={500} pl={5} pb={4} mt={2} fontSize="1.5rem" marginY="0.83em">
        {fCategoriesData.title}
      </Text>

      <Flex pt={5} flexDirection="row" alignItems="center" justifyContent="space-around">
        {fCategoriesData.f_categories.map((item, itemIndex) => (
          <Box key={itemIndex} mb={3} textAlign="center">
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
