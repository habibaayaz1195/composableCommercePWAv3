import React from 'react';
import { Flex, Box, Text, Link, Image } from '@chakra-ui/react';

const Assets = ({ categoryTitle, assetsData }) => {
  return (
    <Flex flexDirection="column" alignItems="center" textAlign="center" paddingY="40px">
      <Text fontWeight="500" pb={4} fontSize="1.5rem" mx={2}>
        {categoryTitle}
      </Text>
      <Flex justifyContent="center" flexWrap="wrap" width="100%">
        {assetsData.map((asset, index) => (
          <Flex
            key={index}
            fontFamily="'Roboto', Arial, sans-serif"
            textAlign="center"
            pb={3}
            position="relative"
            // width={{ base: '100%', sm: '50%', md: '35%' }}
          >
            <Box
              className="text-container"
              position="absolute"
              top="50%"
              left="50%"
              width="90%"
              transform="translate(-50%, -50%)"
              color="white"
            >
              <Text fontWeight="bold" 
                    fontSize="28px" 
                    mb={2}
              >
                {asset.title}
              </Text>
              <Text lineHeight="1.3" fontSize="16px">
                {asset.description}
              </Text>
              <Link
                href={asset.url}
                _hover={{ textDecoration: 'underline' }}
                target="_blank"
                rel="noopener noreferrer"
                color={index === 2 ? '#ff8c3f' : 'white'}
                mt={3}
                fontSize="20px"
                lineHeight="2.5"
              >
                {asset.urlTitle}
              </Link>
            </Box>
            <Image
              mr={index === 1 ? '20px' : '0'}
              src={asset.asset.url}
              alt={asset.title}
              maxH="290px"
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Assets;
