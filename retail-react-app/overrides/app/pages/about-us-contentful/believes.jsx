import React from 'react';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';

const Believes = ({ components, componentsTitle }) => {

  return (
    <div className="my-10"><Text px={"10px"} fontWeight="bold" fontSize={"28px"} mx="25px" my="40px">We Believe that ...</Text>
    <SimpleGrid columns={2} spacing={4}>

      {components.map((component, index) => (
        component.believes.map((belief, beliefIndex) => (
          <Box
            key={index}
            bg={belief.bg_color}
            py="3em"
            pl="35px"
            color="black"
            boxShadow="md"
          >
            <Text fontWeight="bold" fontSize="1.60181em" mb={'.25em'}>
              {belief.title}
            </Text>
            <Text fontSize="14px" fontWeight={400} lineHeight={'20px'} >{belief.description}</Text>
          </Box>
        ))
      ))}
    </SimpleGrid></div>
  );
};

export default Believes;
