import React, { useEffect, useState } from 'react'
import fetch from 'cross-fetch'
import { useQuery } from '@tanstack/react-query'
import SliderComponent from "./sliderComponent";
import Categories from './categories';
import { SimpleGrid, Box, Image, Heading, Text, Flex, Stack } from '@chakra-ui/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { createClient } from 'contentful';
import SfccProducts from '../product-contentful/sfcc_products';

const AboutUsContentful = () => {
    const [components, setComponents] = useState([])
    const [sliderImages, setSliderImages] = useState([]);
    const [featuredCategories, setFeaturedCategories] = useState([]);
    const [entry, setEntry] = useState(null);

    const client = createClient({
        space: 'rb9ez79izqmr',
        accessToken: 'WYgOvVOq3zmY2VDks6EU_ocAVgZCHgV-QsoNkarBa1o'
    });

    useEffect(() => {
        client
            .getEntry('2WFivQoxNQVovrKlInnrsE')
            .then(setEntry)
            .catch(console.error);
    }, [client]);

    // Safe product IDs: empty array until entry is loaded
    const productIds = entry
        ? Object.values(entry.fields).map(id => id.toString())
        : [];
    console.log('productIds array:', productIds);

    // ========== Categories ==========
    async function getFeaturedCategories() {
        const res = await client.getEntries({
            content_type: 'homepage',
            include: 2
        });

        const homepage = res.items[0];

        const featuredCategories = homepage.fields.featuredCategories.map(cat => ({
            title: cat.fields.title,
            asset: { url: "https:" + cat.fields.image?.fields.file.url },
            slug: cat.fields.slug,
            link: cat.fields.categoryLink,
            altText: cat.fields.title
        }));

        console.log('Featured Categories', featuredCategories);

        return featuredCategories;
    }


    getFeaturedCategories();

    // ========== GET SLIDER ==========
    async function getSlider() {
        const slider = await client.getEntry("1TNV3uzW9EtyPkK8VgDU2e");

        const sliderImages = slider.fields.images.map((img) => ({
            url: "https:" + img.fields.file.url,
            title: img.fields.title || ""
        }));

        console.log("Slider Clean Array:", sliderImages);
        return sliderImages;
    }

    useEffect(() => {
        async function loadCategories() {
            const cats = await getFeaturedCategories();
            setFeaturedCategories(cats);
        }
        loadCategories();
    }, []);


    useEffect(() => {
        async function loadSlider() {
            const imgs = await getSlider();
            setSliderImages(imgs);
        }
        loadSlider();
    }, []);

    // ========== GET ABOUT US PAGE ==========
    const { isLoading, error, data } = useQuery({
        queryKey: ['aboutuspage'],
        queryFn: () =>
            fetch(
                `https://cdn.contentful.com/spaces/rb9ez79izqmr/environments/master/entries?access_token=WYgOvVOq3zmY2VDks6EU_ocAVgZCHgV-QsoNkarBa1o&content_type=aboutUsNew&include=10`
            ).then((res) => res.json())
    });

    useEffect(() => {
        if (data) {
            console.log("About us data:", data);
        }
    }, [data]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const page = data?.items?.[0]?.fields;
    const assets = data?.includes?.Asset || [];

    return (
        <>
            <SimpleGrid className='page-wrapper'>
                {/* INSERT SLIDER HERE */}
                    {sliderImages.length > 0 && (
                    <Box 
                        mx="auto" 
                        className='main-banner-wrapper'
                        overflow="hidden"
                        width="100vw"
                        position="relative"
                    >
                        <SliderComponent sliderData={{ images: sliderImages }} />
                    </Box>
                )}

                {/* INSERT CATEGORIES HERE */}
                {featuredCategories.length > 0 && (
                    <Box className='featured-category-section'>
                        <Box className='featured-cat-wrapper' maxW="1400px" mx="auto" width="100%">
                            <Categories 
                                fCategoriesData={{
                                    title: "Featured Categories",
                                    f_categories: featuredCategories
                                }} 
                            />
                        </Box>  
                    </Box>
                )}

                {/* Product Data */}
                <SfccProducts sfccproducts={{ products: productIds, title: 'Featured Products' }} />

                {/* Banner */}
                <Box className='banner-section'
                    bgImage={assets[0]?.fields?.file?.url ? `url(https:${assets[0].fields.file.url})` : "none"}
                    bgSize="cover"
                    bgPosition="center"
                >
                    <Box maxW={1200} mx={'auto'} py={'60px'} px={'24px'}>
                        <Text className='title'>{page.title}</Text>
                        <Heading className="short-desc">{page.subtitle}</Heading>
                    </Box>
                </Box>


                {/* CONTENT SECTIONS BELOW */}
                <Box className='box-content-section'>
                    {/* Left + Right Section */}
                    <Box className='content-inner' py="60px">
                        <Flex className='text-with-content-wrapper' gap={'60px'} direction={{ base: 'column', md: 'row' }} maxW="1200px" mx="auto" alignItems={'center'}>
                            <Stack flex="1">
                                {page?.leftColumnText && documentToReactComponents(page.leftColumnText)}
                            </Stack>

                            <Box className='image-holder' maxW={'400px'}>
                                <Image
                                    flex="1" 
                                    src={assets[1]?.fields?.file?.url ? `https:${assets[1].fields.file.url}` : ""}
                                />
                            </Box>
                        </Flex>
                    </Box>

                    {/* Second Section */}
                    <Box className='content-inner' py="60px" bgColor={'white'} >
                        <Flex className='text-with-content-wrapper' gap={'60px'} direction={{ base: 'column', md: 'row-reverse' }} maxW="1200px" mx="auto" alignItems={'center'}>
                            <Stack flex="1">
                                {page?.rightColumnText && documentToReactComponents(page.rightColumnText)}
                            </Stack>

                            <Box className='image-holder' maxW={'400px'}>
                                <Image
                                    flex="1"
                                    src={assets[2]?.fields?.file?.url ? `https:${assets[2].fields.file.url}` : ""}
                                />
                            </Box>
                        </Flex>
                    </Box>
                </Box>

                {/* CONTENT Cards */}
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
    );
}

export default AboutUsContentful;
