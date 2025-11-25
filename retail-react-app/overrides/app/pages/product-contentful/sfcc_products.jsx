import React, {useEffect} from 'react';

import { Flex, Box, Image, Text, Toolti, SimpleGrid } from '@chakra-ui/react';

import { useProducts } from '@salesforce/commerce-sdk-react'

 

const SfccProducts = ({ sfccproducts }) => {

    const { data: products,error } = useProducts(

        {

            parameters: {

                ids: sfccproducts?.products?.join(","),

                allImages: true

            }

        },

    )

    const getImage = (product) => {
      console.log("produc", product)
    
      if(false) // for lumen only
        return `https://s7d1.scene7.com/is/image/Lumens/${product.id}`
      else{
        if(product?.imageGroups?.length>0 && product?.imageGroups[0]?.images?.length>0){
          return product?.imageGroups[0]?.images[0].link;
        }
      }
    }

   

    useEffect(() => {
        console.log("error",error)
        console.log("products",sfccproducts?.products?.join(",") ,products)

      }, [products,error]);

 

  return (
    <Box paddingY="40px" width="100%" fontFamily="'Roboto', Arial, sans-serif">
      <Text fontWeight={500} pl={10} pb={4} mt={2} fontSize="1.5rem" marginY="0.83em">
        {sfccproducts.title}
      </Text>
      <Flex pt={5} flexDirection="row" alignItems="center" justifyContent="space-around">

        <SimpleGrid columns={6} spacing={1} px={4}>

          {products?.data?.map((product, index) => (
            <a href={`/product/${product.id}`}>
              <Box

                key={index}

                fontFamily="'Roboto', Arial, sans-serif"

                className="d-flex flex-column bg-grey py-3 position-relative"

                m={2}

                pb={3}

              >



                <Image src={getImage(product)} alt={product.title} boxSize="200px" />

                <Text textTransform="capitalize-first" fontWeight={700} mt={2} mb={0}>

                  {product.name}

                </Text>

                <Text fontWeight={500} fontSize={'14px'}>

                  Price: {product.price || '0.0'}

                </Text>

              </Box>
            </a>

          ))}



        </SimpleGrid>

      </Flex>
    </Box>

  );

};

 

export default SfccProducts;