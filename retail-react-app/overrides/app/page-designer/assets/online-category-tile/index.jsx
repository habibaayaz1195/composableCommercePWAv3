/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
//import PropTypes from 'prop-types'
import { Box, Flex, Heading,  Image, Stack, Text, Link } from '@salesforce/retail-react-app/app/components/shared/ui'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'


/**
 * Simple ImageTile component that can be used inside any Layout component.
 * @param image Object containing the image url, _type and focalPoint.
 * @returns {JSX.Element}
 */
export const OnlineCategoryTile = ({ categorieTileText, categoryImgFile, categoryImgAlt,categoryTileID }) => {

    const categoryImgFileURL = categoryImgFile?.url

    return (

        <Link
            //va=true will be removed later
            href={`shop-online?category=${categoryTileID}`}
            textAlign={{base: "center", md: "center"}}
            borderRadius="12px"
            bg="acimaDefault.8"
            p="4"
            className='ctg-small-tile'
            display={{base: "block", md: "block"}}
            padding={{base: "13px 12px", md: "13px 16px"}}
            width={"100%"}
            maxWidth={{base: "88px", md: "125px"}}
            alignItems={"center"}
            flexDirection={{base: "column", md: "row"}}
            justifyContent={{base: "center", md: "center"}}
            alignContent={"center"}
            _hover={{ bg: "blue.100", textDecoration: "none" }}
        >
            {categoryImgFile && (
                <Image
                    src={categoryImgFileURL}
                    alt={categoryImgAlt}
                    boxSize="40px"
                    mr={'auto'}
                    ml={'auto'}
                    mb={{base: "10px", md: "10px"}}
                />
            )}
            <Text fontSize={{base: "12px", md: "12px"}} fontWeight="500" lineHeight={"14px"} color="blue.700">{categorieTileText}</Text>
        </Link>
    )
}

export default OnlineCategoryTile
