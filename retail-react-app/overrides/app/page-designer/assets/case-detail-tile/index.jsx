import React, {useEffect, useState} from 'react'
import { 
    Box, 
    Heading, 
    Text, 
    Button, 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbSeparator 
} from "@chakra-ui/react";
import Link from '@salesforce/retail-react-app/app/components/link'
import { ChevronRightIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import {Printer, ChevronRight} from '../../../components/icons-custom'
import {FormattedMessage} from 'react-intl'

export const CaseDetailComponent = ({ newsHeading, newsSubHeading, newsTileDate, newsDetail }) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Box className='news-breadcrumb' paddingTop={{base: '56px', md: '85px'}} paddingLeft={{base: '24px', md: '0'}} paddingRight={{base: '24px', md: '0'}} marginBottom={{base: '56px', md: '64px'}}>
                <Breadcrumb
                    spacing="8px"
                    fontSize="16px"
                    color="#050044"
                >
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to="/partner" fontWeight="400" color={'#0033A1'}>
                            For Partners
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
                    <Box marginBottom={{base: '54', md: '64px'}} textAlign={'center'}>
                        <Heading as="h1" fontSize={{base: '32px', md: '40px'}} lineHeight={'1'} color="acimaDefault.4" marginBottom='10px' letterSpacing={'-0.9px'} textAlign={'center'}>
                            {newsHeading}
                        </Heading>
                        {newsSubHeading && (
                            <Text as={'p'} fontSize={'16px'} color={'acimaDefault.13'} margin={'0'}>
                                {newsSubHeading}
                            </Text>
                        )}
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} marginBottom={'32px'}>
                        <Text className="news-date" fontSize="16px" fontWeight={'700'} color="acimaDefault.4" letterSpacing={{base:'0', md: '-0.35px'}}>
                            {newsTileDate}
                        </Text>
                        <Button
                            colorScheme="trasparent"
                            background={'none'}
                            leftIcon={<Printer />}
                            onClick={handlePrint}
                            fontSize="16px" color="acimaDefault.4"
                            className='print-btn font-Geomanist-regular'
                        >
                            <FormattedMessage
                                defaultMessage="Print"
                                id="print.title"
                            />
                        </Button>
                    </Box>
                    <Box className='news-detail-text'>
                        <Text as="p" mb={4} className={'news-content-text'} color={'acimaDefault.4'}
                            dangerouslySetInnerHTML={{
                                __html: newsDetail
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default CaseDetailComponent;
