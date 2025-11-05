import React, { useEffect, useState } from 'react'
import fetch from 'cross-fetch'
import { useQuery } from '@tanstack/react-query'
import Aboutuspage from '../../models/Aboutuspage';
import { SimpleGrid, Box, Image, Heading, Text, Flex, Stack } from '@chakra-ui/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { createClient } from 'contentful';

const AboutUsContentful = () => {
    const [components, setComponents] = useState([])

    const client = createClient({
        space: 'rb9ez79izqmr',
        accessToken: 'WYgOvVOq3zmY2VDks6EU_ocAVgZCHgV-QsoNkarBa1o'
    });

    async function getFeaturedCategories() {
        const res = await client.getEntries({
            content_type: 'homepage',
            //'fields.componentType': 'f_Categories',
            include: 2 // fetch linked category data
        });

        const homepage = res.items[0];
        const featuredCategories = homepage.fields.featuredCategories.map(cat => ({
            title: cat.fields.title,
            image: cat.fields.image?.fields.file.url,
            slug: cat.fields.slug,
            link: cat.fields.categoryLink
        }));

        console.log('Featured Categories', featuredCategories);
    }

    getFeaturedCategories();

    //const spaceid = "rb9ez79izqmr"
    //const access_token = "WYgOvVOq3zmY2VDks6EU_ocAVgZCHgV-QsoNkarBa1o"
    const { isLoading, error, data } = useQuery({ 
        queryKey: ['aboutuspage'],
        queryFn: () =>
            fetch(
                `https://cdn.contentful.com/spaces/rb9ez79izqmr/environments/master/entries?access_token=WYgOvVOq3zmY2VDks6EU_ocAVgZCHgV-QsoNkarBa1o&content_type=aboutUsNew&include=10`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }
            ).then((res) => res.json())
    })

    useEffect(() => {
        if (data) {
            console.log('Contentful data', data)
            console.log(data)
            //const aboutUsData = Aboutuspage.fromJson(data)
            //setComponents(aboutUsData.components)
        }
    }, [data])

    if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const page = data?.items?.[0]?.fields;
  const assets = data?.includes?.Asset || [];

    return (
        <>
        <SimpleGrid className='page-wrapper'>
            <Box className='banner-section' 
                bgImage={
                    assets[0]?.fields?.file?.url ? `url(https:${assets[0].fields.file.url})` : "none"
                }
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
            >
                <Box maxW={1200} mx={'auto'} py={'60px'} px={'24px'} className='section-container'>
                    <Box className='banner-content'>
                        <Text as={'p'} className='title'>{data?.items[0]?.fields.title}</Text>
                        <Heading as={'h1'} className="short-desc">{data?.items[0]?.fields.subtitle}</Heading>
                    </Box>
                </Box>
            </Box>
            
            <Box className='box-content-section'>
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    maxW="1200px"
                    mx="auto"
                    py="60px"
                    px="24px"
                    alignItems="center"
                >
                    <Stack spacing={6} flex="1" className='content-holder left-content'>
                        {page?.leftColumnText &&
                        documentToReactComponents(data.items[0].fields.leftColumnText)}
                    </Stack>

                    <Image
                        flex="1"
                        src={assets[1]?.fields?.file?.url ? `https:${assets[1].fields.file.url}` : ""}
                        alt="About us right column"
                        borderRadius="md"
                        className='content-holder right-content'
                    />
                </Flex>

                <Flex
                    direction={{ base: "column", md: "row-reverse" }}
                    maxW="1200px"
                    mx="auto"
                    py="60px"
                    px="24px"
                    alignItems="center"
                    gap={10}
                >
                    <Stack spacing={6} flex="1" className='content-holder left-content'>
                        {page?.rightColumnText &&
                        documentToReactComponents(page.rightColumnText)}
                    </Stack>

                    <Image
                        flex="1"
                        src={assets[2]?.fields?.file?.url ? `https:${assets[2].fields.file.url}` : ""}
                        alt="About us second section"
                        borderRadius="md"
                        className='content-holder right-content'
                    />
                </Flex>
            </Box>
            
            <Box maxW="1200px" mx="auto" py="80px" px="24px">
                <Heading textAlign="center" mb={10}>
                    Our Core Values
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                    <Box
                        textAlign="center"
                        p={6}
                        borderRadius="2xl"
                        boxShadow="lg"
                        bg="white"
                        _hover={{ transform: "translateY(-5px)", transition: "0.3s" }}
                    >
                        <Heading as="h3" size="md" mb={3}>Innovation</Heading>
                        <Text color="gray.600">
                            {page?.missionStatement && page.missionStatement}
                        </Text>
                    </Box>

                    <Box
                        textAlign="center"
                        p={6}
                        borderRadius="2xl"
                        boxShadow="lg"
                        bg="white"
                        _hover={{ transform: "translateY(-5px)", transition: "0.3s" }}
                    >
                        <Heading as="h3" size="md" mb={3}>Excellence</Heading>
                        <Text color="gray.600">
                            {page?.visionStatement && page.visionStatement}
                        </Text>
                    </Box>

                    <Box
                        textAlign="center"
                        p={6}
                        borderRadius="2xl"
                        boxShadow="lg"
                        bg="white"
                        _hover={{ transform: "translateY(-5px)", transition: "0.3s" }}
                    >
                        <Heading as="h3" size="md" mb={3}>Collaboration</Heading>
                        <Text color="gray.600">
                            {page?.coreValues && page.coreValues}
                        </Text>
                    </Box>
                </SimpleGrid>
            </Box>
        </SimpleGrid>
      </>
    )
}

export default AboutUsContentful
