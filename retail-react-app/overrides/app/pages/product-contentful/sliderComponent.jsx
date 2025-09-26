import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const SliderComponent = ({ sliderData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = sliderData.images;
  const totalImages = images.length;
  const secondImageURL = images.length > 1 ? images[1].url : ''; // Set your second image URL

  console.log("index: ",currentImageIndex)
  console.log("imagess: ",images)
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  useEffect(() => {
    console.log("currentImageIndex",currentImageIndex)
  }, [currentImageIndex])
  
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  //   }, 5000); // Change slide every 5 seconds (adjust as needed)

  //   return () => {
  //     clearInterval(interval); // Clear the interval when the component unmounts
  //   };
  // }, [totalImages]);

  return (
    <Flex alignItems="center" justifyContent="center" position="relative" overflow={"hidden"}>
      <IconButton
        icon={<ChevronLeftIcon />}
        position="absolute"
        top="50%"
        left="20px"
        variant="unstyled"
        color="black"
        zIndex={1000}

        style={{
          background: "white",
          "border-radius": "50%"
        }}
        transform="translateY(-50%)"
        onClick={handlePrev}
      />
      {/* <Image
        src={images[currentImageIndex]?.url || ''}
        alt={`Image ${currentImageIndex}`}
        maxH="387px"
        w="100%"
        style={{
          transition: 'transform 0.3s',
          transform: `translateX(${-100 * {(currentImageIndex % 2) == 0 ? 0 : 1}}% )`,
        }}
      /> */}
      <div 
        style={{
          display:"flex",
          transition: 'transform 0.3s',
          transform: `translateX(${-100 * currentImageIndex}%)`,
        }}
      >
        {
          images.map((image,index)=>{
            return       <Image
            src={image.url || ''}
            alt={`Image ${index}`}
            w="100vw"
            h={"40vw"}
          />
          })
        }
      </div>
      {/* <Image
        src={images[currentImageIndex]?.url || ''}
        alt={`Image ${currentImageIndex}`}
        maxH="387px"
        w="100%"
        style={{
          // translate:`translateX(0%)`,
          // transition: 'transform 0.3s',
          // transform: `translateX(${-100 * currentImageIndex}%)`,
        }}
      /> */}
      <IconButton
        icon={<ChevronRightIcon />}
        position="absolute"
        top="50%"
        variant="unstyled"
        color="black"
        right="20px"
        transform="translateY(-50%)"
        zIndex={1000}
        style={{
          background: "white",
          "border-radius": "50%"
        }}
        trans
        onClick={handleNext}
      />
    </Flex>
  );
};

export default SliderComponent;
