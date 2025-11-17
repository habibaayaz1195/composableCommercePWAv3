import React, { useEffect, useRef } from 'react';
import { Box, Heading, Text } from "@chakra-ui/react";
import Link from '@salesforce/retail-react-app/app/components/link';
import { useLocation } from 'react-router-dom';

export const NewsTile = ({ newsTileLink, newsRelease, newsHeading, newsTileDate }) => {
  // Utility to truncate headings
//   const truncateHeading = (heading, maxLength = 92) =>
//     heading.length > maxLength ? heading.slice(0, maxLength) + '...' : heading;

  // Determine current pageId and link segment
  const { pathname } = useLocation();
  // const pageId = pathname.split('/').filter(Boolean).pop();
  // const newsSegments = newsTileLink.split('/').filter(Boolean);
  // const isCasePage = pageId === newsSegments[0];

  //added safeguard in case of null
  const pageId = pathname?.split('/')?.filter(Boolean).pop();
  const newsSegments = newsTileLink?.split('/')?.filter(Boolean);
  const isCasePage = Array.isArray(newsSegments) && newsSegments.length > 0 && pageId === newsSegments[0];

  // Only hide when it's both the matching page and a Case Studies release
  const shouldHide = isCasePage && newsRelease === 'Case Studies';


  // Reference to this tile element
  const tileRef = useRef(null);

  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;

    // walk up to the layout container
    const parentContainer = el.closest('.component');
    if (!parentContainer) return;

    // Toggle hide class based on combined condition
    parentContainer.classList.toggle('hide-tile', shouldHide);
  }, [shouldHide]);

  return (
    <Box
      ref={tileRef}
      className={`news-tile-container ${shouldHide ? 'case-tile' : ''} ${newsRelease}`}
      p="26px 32px"
      bg="white"
      border="1px solid"
      borderColor="acimaDefault.15"
      borderRadius="16px"
    >
      <Box className="news-tile-inner">
        <Link to={'/'+newsTileLink}>
          <Text
            className={`news-tag ${newsRelease}`}
            display="inline-block"
            fontSize="12px"
            p="3px 8px"
            borderRadius="6px"
            mb="16px"
          >
            {newsRelease}
          </Text>
          <Heading
            as="h4"
            fontSize={{ base: '16px', md: '20px' }}
            lineHeight={{ base: '20px', md: '28px' }}
            mb="16px"
            noOfLines={4}
          >
            {newsHeading}
          </Heading>
          <Text className="news-date" fontSize="14px" color="#5D5D5D">
            {newsTileDate}
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default NewsTile;
