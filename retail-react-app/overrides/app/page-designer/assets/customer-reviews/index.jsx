import React, {useEffect, useState} from 'react'
import { Box, Heading, Text } from "@chakra-ui/react";
import {QuoteIconOrange} from '../../../components/icons-custom'

export const CustomerReviewsTile = ({ reviewsCategory, reviewHeading, reviewsDetailText, reviewerName, selectedCategory }) => {
    const isHidden = selectedCategory !== 'all' && reviewsCategory !== selectedCategory;

    useEffect(() => {
        const cReviewsTiles = document.querySelectorAll(`#${CSS.escape(reviewsCategory)}`);

        cReviewsTiles.forEach(tile => {
            const parentDiv = tile.closest('.component');
            if (parentDiv) {
                if (isHidden) {
                    parentDiv.classList.add('hidden-news-parent');
                } else {
                    parentDiv.classList.remove('hidden-news-parent');
                }
            }
        });
    }, [isHidden, reviewsCategory]);

    return (
        <Box
            id={reviewsCategory}
            className="reviews-tile-container"
            p={'32px'}
            background={"white"}
            border="2px solid"
            borderColor="acimaDefault.15"
            borderRadius="16px"
            display={isHidden ? 'none' : 'block'}
            marginBottom="16px"
        >
            <Box className="review-tile-inner">
                <Heading
                    as="h4"
                    className="review-tile-heading"
                    fontSize="20px"
                    lineHeight={'28px'}
                    mb={'24px'}
                    color="acimaDefault.4"
                    letterSpacing={'0'}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <QuoteIconOrange width="40px" />
                    {reviewHeading}
                </Heading>
                <Text
                    className={'reviews-detail'}
                    color={'#5D5D5D'}
                    fontSize="16px"
                    p="0"
                    marginBottom={'40px'}
                    lineHeight={'20px'}
                    dangerouslySetInnerHTML={{ __html: reviewsDetailText }}
                />
                <Text className="review-name" fontSize="16px" color="acimaDefault.4">
                    {reviewerName}
                </Text>
            </Box>
        </Box>
    );
};
