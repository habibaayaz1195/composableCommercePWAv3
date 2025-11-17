import React, { useRef } from 'react'
import { useState } from 'react';
import { Box, Image, IconButton, Text } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import {useIntl} from 'react-intl'


export const YouTubeVideo = ({ videoID, videoPoster, imgAlt, className }) => {
    const intl = useIntl()
    const [isPlaying, setIsPlaying] = useState(false);

    const videoPosterURL = getImageKitURL(videoPoster?.url)

    return (
        <Box className={`video-wrapper ${className}`} position="relative" borderRadius="lg" overflow="hidden">
            {!isPlaying ? (
                <Box position="relative">
                    <Image src={videoPosterURL} alt={imgAlt} width="100%" loading="lazy"/>
                    <IconButton
                        className='video-play-btn'
                        icon={<FaPlay fontSize="2rem" />}
                        aria-label="Play Video"
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        borderRadius="100%"
                        size="lg"
                        onClick={() => setIsPlaying(true)}
                        width={'104px'}
                        height={'104px'}
                        background='#F75200'
                    />
                    <Text className='video-bottom-text' paddingTop={{ base: '16px', md: '32px' }} fontSize={'24px'} textAlign={'center'}>
                        {intl.formatMessage({
                            id: 'watch.video.youtube',
                            defaultMessage: 'Watch the video'
                        })}
                    </Text>
                </Box>
            ) : (
                <Box as="iframe"
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
                    title="YouTube Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            )}
        </Box>
    );
};

export default YouTubeVideo;
