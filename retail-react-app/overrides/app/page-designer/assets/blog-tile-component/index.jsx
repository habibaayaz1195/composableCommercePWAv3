import React, {useEffect, useState} from 'react'
import {
    Box,
    Heading,
    Text,
    VStack,
    Image
} from '@chakra-ui/react'
import Link from '@salesforce/retail-react-app/app/components/link'


export const BlogTileComponent = ({ blogTileImage, blogTileDate, blogTileHeading, blogTileImageAlt, blogTileLink , blogTileID, selectedCategory }) => {

    const blogTileImageURL = getImageKitURL(blogTileImage?.url)

    return (
        <Box
            borderRadius="16px"
            overflow="hidden"
            boxShadow="0 0 0"
            borderWidth="1px"
            borderColor="#DCDCDC"
            bg="white"
            maxWidth="373px"
            id={blogTileID}
            className={`blog-tile-container`}
        >
            <Link to={'/'+blogTileLink}>
                <Image
                    src={blogTileImageURL}
                    alt={blogTileImageAlt || 'Blog Image'}
                    objectFit="cover"
                    height="200px"
                    width="100%"
                />

                <VStack align="start" spacing={2} p={'32px'}>
                    <Heading
                        fontSize={{ base: '16px', md: '20px' }}
                        color="#050044"
                        lineHeight={{ base: '20px', md: '28px' }}
                        mb={{ base: '16px', md: '32px' }}
                        noOfLines={2}
                        minHeight={{base:'1px', md:'56px'}}
                    >
                        {blogTileHeading}
                    </Heading>
                    <Text fontSize="16px" color="#3E3E3E">
                        {blogTileDate}
                    </Text>
                </VStack>
            </Link>
        </Box>
    )
}

export default BlogTileComponent
