import React, { useEffect, useState } from 'react';
import fetch from 'cross-fetch';
import { useQuery } from '@tanstack/react-query';
import { Grid, GridItem, Skeleton, Center, ChakraProvider } from '@chakra-ui/react';
import Categories from './categories';
import Assets from './assests';
import Homepage from '../../models/Homepage';
import SliderComponent from './sliderComponent';
import SfccProducts from './sfcc_products';

import '../../static/style-sheets/style.scss'
import Storefronts from '../storefronts';

const ProductContentful = () => {
  const [components, setComponents] = useState([]);

  const spaceid = 's1f68g6uorjr';
  const access_token = '-ARLwOL7HbhyPv7a74sKBFRqMBUjNGk2APvqlI7_AO8';

  const { isLoading, error, data } = useQuery({
    queryKey: ['contentfulData'],
    queryFn: () =>
      fetch(
        `https://cdn.contentful.com/spaces/s1f68g6uorjr/environments/master/entries?access_token=${access_token}&content_type=homepage&include=10`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => res.json()),
  });

  useEffect(() => {
    setComponents(Homepage.fromJson(data).components);
  }, [data]);

  return (
    <div>
      {components?.map((component, index) => (
        <div key={index} style={{ background: 'white' }}>
          {component.componentType === 'slider' ? (
            <SliderComponent sliderData={component} />
          ) : component.componentType === 'f_categories' ? (
            <Categories fCategoriesData={component} categoryTitle={component?.title} />
          ) : component.componentType === 'f_assets' ? (
            <Assets assetsData={component.f_assets} categoryTitle={component?.title} />
          ) : component.componentType === 'f_products' ? (
            <SfccProducts sfccproducts={component} />
          ) : (
            <h1>Featured assets</h1>
          )}
        </div>
      ))}
      <div>
        <Storefronts />
      </div>
    </div>
  );
};

export default ProductContentful;
