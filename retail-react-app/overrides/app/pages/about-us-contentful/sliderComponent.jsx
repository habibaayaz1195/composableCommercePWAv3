import React, { useState } from 'react';
import { Flex, Image, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const SliderComponent = ({ sliderData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = sliderData.images;
  const total = images.length;

  const prev = () => setCurrentIndex((i) => (i - 1 + total) % total);
  const next = () => setCurrentIndex((i) => (i + 1) % total);

  return (
    <Flex
      className='main-banner-slider'
      w="100%"
      overflow="hidden"
      position="relative"
      h={{ base: "60vw", md: "40vw" }}   // ← responsive height
    >
      {/* Left Button */}
      <IconButton
        icon={<ChevronLeftIcon />}
        onClick={prev}
        position="absolute"
        top="50%"
        left="20px"
        transform="translateY(-50%)"
        background="white"
        color="#034694"        // ← icon color
        borderRadius="50%"
        zIndex={10}
        boxShadow="0 4px 10px rgba(0,0,0,0.2)"
        _hover={{
          background: "#034694", // Background on hover
          color: "white",         // Icon color on hover
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)"
        }}
      />

      {/* Slide container */}
      <Flex
        w={`${total * 100}vw`}
        transform={`translateX(-${currentIndex * 100}vw)`}
        transition="transform 0.4s ease"
        className='slide-items'
      >
        {images.map((img, i) => (
          <Image
            key={i}
            src={img.url}
            alt={`Slide ${i}`}
            w="100vw"
            h={{ base: "60vw", md: "40vw" }}  // responsive height
            objectFit="cover"
            flexShrink={0}
          />
        ))}
      </Flex>

      {/* Right Button */}
      <IconButton
        icon={<ChevronRightIcon />}
        onClick={next}
        position="absolute"
        top="50%"
        right="20px"
        transform="translateY(-50%)"
        background="white"
        color="#034694"          // Icon color
        borderRadius="50%"
        boxShadow="0 4px 10px rgba(0,0,0,0.2)"
        zIndex={10}
        _hover={{
          background: "#034694", // Background on hover
          color: "white",         // Icon color on hover
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)"
        }}
      />

    </Flex>
  );
};

export default SliderComponent;
