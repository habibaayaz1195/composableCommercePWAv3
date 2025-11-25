import React, {useEffect, useState} from 'react'
import { 
    Box, 
    Heading, 
    Text, 
    Button, 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbSeparator,
    Image,
    useDisclosure,
    Flex
} from "@chakra-ui/react";
import Link from '@salesforce/retail-react-app/app/components/link'
import { ChevronRightIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import {Printer, ChevronRight} from '../../../components/icons-custom'



/**
 * News Detail Report.
 * @param image Object containing the image and alt text.
 */

export const NewsReportComponent = ({ newsImage, newsAlt,  newsHeading, newsTileDate, newsDetail }) => { 
    const handlePrint = () => {
        window.print();
    };
    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state

    const newsImageURL = newsImage?.url

    return (
        <>
            <Box className='news-breadcrumb' paddingTop={{base: '56px', md: '85px'}} paddingLeft={{base: '24px', md: '0'}} paddingRight={{base: '24px', md: '0'}} marginBottom={{base: '56px', md: '64px'}}>
                <Breadcrumb
                    spacing="8px"
                    fontSize="16px"
                    color="#050044"
                >
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to="/news" fontWeight="400" color={'#0033A1'}>
                            News
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator className='bread-right-icon'>
                        <ChevronRight />
                    </BreadcrumbSeparator>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#" fontWeight="400" color={'050044'} fontSize={'16px'}>
                            {newsHeading}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
            <Box className={`news-detail-container`} background={"white"} paddingLeft={{base: '24px', md: '0'}} paddingRight={{base: '24px', md: '0'}}>
                <Box className="news-detail-inner">
                    <Box className={`news-detail-image`}>
                        <Image
                            src={newsImageURL}
                            alt={newsAlt || 'Report Image'}
                            objectFit="cover"
                            width="100%"
                            mb={8}
                            loading="lazy"
                        />
                    </Box>                
                    
                    <Heading as="h1" fontSize={{base: '32px', md: '40px'}} lineHeight={'1'} color="acimaDefault.4" marginBottom={{base: '20', md: '20px'}} letterSpacing={'-0.9px'} textAlign={'center'}>
                        {newsHeading}
                    </Heading>
                    <Box className='news-detail-text new-report-detail'>
                        <Text as="p" mb={4} className={'news-content-text'} color={'acimaDefault.4'}
                            dangerouslySetInnerHTML={{
                                __html: newsDetail
                            }}
                        />
                    </Box>
                </Box>
                <Button
                    // width={{base: 'full', md: 'inherit'}}
                    paddingX={9}
                    paddingY= {11}
                    _hover={{textDecoration: 'none'}}
                    onClick={onOpen}
                    className='get-started primary-btn'
                    w = "219px"
                    display="block"
                    margin="0 auto"
                    h="auto"
                    height="67px"

                >
                    <Text as="span" fontWeight="700" borderRadius="30px" fontSize="19px">Read the Report</Text>
                </Button>
                <GetReportFormModal isOpen={isOpen} onClose={onClose} />
            </Box>
        </>
    );
};

export default NewsReportComponent;
