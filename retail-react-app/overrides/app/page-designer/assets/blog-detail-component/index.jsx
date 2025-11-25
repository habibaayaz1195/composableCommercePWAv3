import React, {useEffect, useState} from 'react'
import { Box, Heading, Text, Image, Button,
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbSeparator
} from "@chakra-ui/react";
import Link from '@salesforce/retail-react-app/app/components/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import {Printer, ChevronRight} from '../../../components/icons-custom'
import {FormattedMessage} from 'react-intl'


export const BlogDetailComponent = ({ blogHeading, blogDate, blogImage, blogImageAlt, blogDetail }) => {
    const handlePrint = () => {
        window.print();
    };

    const blogImageURL = blogImage?.src?.mobile ? blogImage?.src?.mobile : blogImage?.url

    return (
        <>
            <Box className='blog-breadcrumb' paddingTop={{base: '56px', md: '85px'}} paddingLeft={{base:'24px', md:'0'}} paddingRight={{base:'24px', md:'0'}} marginBottom={{base: '56px', md: '64px'}}>
                <Breadcrumb
                    spacing="8px"
                    fontSize="16px"
                    color="#050044"
                >
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to="/blog" fontWeight="400" color={'#0070E0'}>
                            Blog
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator className='bread-right-icon'>
                        <ChevronRight />
                    </BreadcrumbSeparator>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#" fontWeight="400" color={'#3E3E3E'} fontSize={'16px'}>
                            {blogHeading}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
            <Box className={`blog-detail-container`} background={"white"} paddingLeft={{base: '24px', md:'0'}} paddingRight={{base: '24px', md:'0'}}>
                <Box className="blog-detail-inner">
                    <Heading as="h1" fontSize={{base: '32px', md: '40px'}} lineHeight={'1'} color="acimaDefault.4" marginBottom={{base: '54', md: '64px'}} letterSpacing={'-0.9px'} textAlign={'center'}>
                        {blogHeading}
                    </Heading>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} marginBottom={'16px'}>
                        <Text className="news-date" fontSize="16px" fontWeight={'700'} color="acimaDefault.4" letterSpacing={{base:'0', md: '-0.35px'}}>
                            {blogDate}
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
                    <Box className='blogImage' marginBottom={{base:'32px', md:'64px'}}>
                        <Image
                            mx='auto'
                            objectFit='contain'
                            className={'image-tile-image'}
                            data-testid={'image-tile-image'}
                            borderRadius={'16px'}
                            src={blogImageURL}
                            ignoreFallback={true}
                            alt={blogImage?.blogImageAlt}
                            title={blogImage?.blogImageAlt}
                        />
                    </Box>
                    <Box className='news-detail-text'>
                        <Text as="p" mb={4} className={'news-content-text'} color={'acimaDefault.4'}
                            dangerouslySetInnerHTML={{
                                __html: blogDetail
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default BlogDetailComponent;
