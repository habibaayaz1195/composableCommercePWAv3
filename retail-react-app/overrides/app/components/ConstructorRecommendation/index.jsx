import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ConstructorioClient from '@constructor-io/constructorio-client-javascript'
import {Box, Text, Button} from '@chakra-ui/react'
import '../../static/style-sheets/ConstructorRecommendations.scss'
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import MobileRecommendations from './MobileRecommendations'
const {getAppOrigin} = require('@salesforce/pwa-kit-react-sdk/utils/url')
import {Link} from 'react-router-dom'

const ConstructorRecommendations = ({productID, noOfResults, podId, filters, term}) => {
    const [recommendations, setRecommendations] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentMobileIndex, setCurrentMobileIndex] = useState(1)
    const [isMobile, setIsMobile] = useState(false)
    // const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false)
    const [isFirstProductHidden, setIsFirstProductHidden] = useState(true)
    const [isTitleBlurry, setIsTitleBlurry] = useState(false)
    const [itemWidth, setItemWidth] = useState(0)
    const url = getAppOrigin()

    console.log('recommendations', recommendations, url)

    useEffect(() => {
        const constructorio = new ConstructorioClient({
            apiKey: 'key_nD31T9flU169jaPu',
            sessionId: 241,
            clientId:
                document.cookie
                    .match('(^|;)\\s*' + 'ConstructorioID_client_id' + '\\s*=\\s*([^;]+)')
                    ?.pop() || ''
        })

        constructorio.recommendations
            .getRecommendations(podId, {
                numResults: noOfResults,
                itemIds: [productID],
                filters: filters,
                term: term
            })
            .then((data) => {
                setRecommendations(data.response.results)
            })
            .catch((err) => {
                console.log(err)
                setRecommendations([])
            })

        // Update isMobile state based on window width
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        // Initial check
        handleResize()

        // Event listener for window resize
        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    useEffect(() => {
        if (recommendations.length > 0) {
            const item = document.querySelector('.recommendation-item')
            if (item) {
                const itemComputedStyle = window.getComputedStyle(item)
                const itemMargin = parseFloat(itemComputedStyle.marginRight)
                const itemWidth = item.offsetWidth + itemMargin
                setItemWidth(itemWidth)
            }
        }
    }, [recommendations])
    const handleLeftClick = () => {
        if (isMobile && currentMobileIndex > 0) {
            setCurrentMobileIndex(currentMobileIndex - 1)
        } else if (!isMobile && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }
    const handleRightClick = () => {
        if (isMobile && currentMobileIndex < recommendations.length - 1) {
            setCurrentMobileIndex(currentMobileIndex + 1)
            setIsFirstProductHidden(true)
            setIsTitleBlurry(true)
        } else if (!isMobile && currentIndex < recommendations.length - 4) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const truncateDescription = (description) => {
        const words = description.split(' ')
        if (words.length > 24) {
            return words.slice(0, 24).join(' ') + '...'
        }
        return description
    }

    return (
        <Box className="recommendations-wrapper">
            {isMobile && (
                <Box className="Mobile-title-content">
                    <Text className="inner-heading">RECOMMENDATIONS</Text>
                    <Text className="inner-text">Check out our most loved collection.</Text>
                </Box>
            )}
            {isMobile && (
                <MobileRecommendations
                    productID={productID}
                    noOfResults={noOfResults}
                    podId={podId}
                    filters={filters}
                    term={term}
                />
            )}
            <Box className="recommendations-container">
                {!isMobile && (
                    <>
                   <Box className="ROW">
            <Box className="BOX-ONE" w="20%">
                <Box className={`recommendations-title ${isTitleBlurry ? 'blurry' : ''}`}>
                    <Box className="inner-title-content">
                        <Text className="inner-heading">RECOMMENDATIONS</Text>
                        <Text className="inner-text">Check out our most loved collection.</Text>
                        <Button className="inner-button">
                            <a href={`${url}`}>Explore</a>
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box className="BOX-TWO" w="80%">
                <Box className="recommendations-container-inner">
                    <Box className="recommendations-items" style={{ transform: `translateX(-${currentIndex * 100}px)` }}>
                        {recommendations.map((rec, index) => (
                            <Box className="recommendation-item" key={rec.data.id}>
                                {/* {index === 0 && isFirstProductHidden ? null : ( */}
                                    <Link onClick={() => { window.open(rec.data.url, '_blank') }} key={rec.data.id} as="figure">
                                        <img src={rec.data.image_url} alt={rec.data.name} className="recommendation-image" />
                                        <Box as="figcaption" className="recommendation-details">
                                            <Box className="recommendation-name">{rec.value}</Box>
                                            <Box className="recommendation-description">{truncateDescription(rec.data.description)}</Box>
                                            <Box className="recommendation-price">Price: ${rec.data.price}</Box>
                                        </Box>
                                    </Link>
                                {/* )} */}
                            </Box>
                        ))}
                    </Box>
                    <Box className="carousel-button left-button" onClick={handleLeftClick}>
                        <ChevronLeftIcon />
                    </Box>
                    <Box className="carousel-button right-button" onClick={handleRightClick}>
                        <ChevronRightIcon />
                    </Box>
                </Box>
            </Box>
        </Box>
                    </>
                )}
            </Box>
        </Box>
    )
}

ConstructorRecommendations.propTypes = {
    productID: PropTypes.string,
    noOfResults: PropTypes.number,
    podId: PropTypes.string,
    filters: PropTypes.object,
    term: PropTypes.string
}

export default ConstructorRecommendations
