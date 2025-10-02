import React from 'react';
import { Box, Link, Flex } from '@chakra-ui/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Aboutuspage from '../../models/Aboutuspage';

const Information = ({ componentsInfo }) => {
  const Text = ({ children }) => <p className="align-center">{children}</p>;
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="p-2">{children}</p>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        const asset = Aboutuspage.getImage(node.data.target.sys.id);
        return (
          <img
            src={asset.url}
            alt={''}
            height={asset.height}
            width={asset.width}
          />
        );
      },
      renderText: (text) => text.replace('!', '?'),
    },
  };
  console.log('componentsInfo', componentsInfo);
  return (
    <Flex
      gap={2}
      margin="40px 12px"
      bg={componentsInfo[0]?.informations?.bgColor || 'gray.100'}
      flexDirection={
        componentsInfo[0]?.informations?.direction === 'left' ? 'row' : 'row-reverse'
      }
    >
      {componentsInfo.map((component, index) => (
        <Box key={index} flex={2} p="20px" color="black">
          {console.log('something', component)}
          <div style={{ fontSize: 'unset', fontWeight: 'unset' }}>
            {documentToReactComponents(component.informations.content, options)}
          </div>
        </Box>
      ))}
      <Box flex={4} alignSelf={'center'} textAlign="center">
        {componentsInfo.map((component, index) => (
          <img
            key={index}
            src={component.informations?.asset.url}
            alt={component.informations?.asset.description}
            height={component.informations?.asset.height}
            width={component.informations?.asset.width}
          />
        ))}
      </Box>
    </Flex>
  );
};

export default Information;
