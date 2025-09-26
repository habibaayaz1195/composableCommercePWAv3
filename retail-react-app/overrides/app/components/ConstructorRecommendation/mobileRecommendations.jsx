import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ConstructorioClient from '@constructor-io/constructorio-client-javascript'
import {Box, Button} from '@chakra-ui/react'
import {getAppOrigin} from '@salesforce/pwa-kit-react-sdk/utils/url'
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import {Link} from 'react-router-dom'

const MobileRecommendations = ({productID, noOfResults, podId, filters, term}) => {
    const [recommendations, setRecommendations] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const url = getAppOrigin()

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
                // Skip the first recommendation
                setRecommendations(data.response.results.slice(1))
            })
            .catch((err) => {
                console.log(err)
                setRecommendations([])
            })
    }, [productID, noOfResults, podId, filters, term])

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(recommendations.length - 1, prevIndex + 1))
    }

    const truncateDescription = (description) => {
        const words = description.split(' ')
        if (words.length > 24) {
            return words.slice(0, 24).join(' ') + '...'
        }
        return description
    }
    return (
        <Box className="mob-recommendations-wrapper">
            <Box className="mob-recommendations-container">
                <Box className="recommendations-items" overflowX="hidden">
                    {recommendations.map((rec, index) => (
                        <Box key={rec.data.id} display={index === currentIndex ? 'block' : 'none'}>
                            <Box className="recommendation-item">
                                <Link
                                    onClick={() => {
                                        window.open(rec.data.url, '_blank')
                                    }}
                                    as="figure"
                                >
                                    <img
                                        src={rec.data.image_url}
                                        alt={rec.data.name}
                                        className="recommendation-image"
                                    />
                                    <Box as="figcaption" className="recommendation-details">
                                        <Box className="recommendation-name">{rec.value}</Box>
                                        <Box className="recommendation-description">
                                            {truncateDescription(rec.data.description)}
                                        </Box>
                                        <Box className="recommendation-price">
                                            Price: ${rec.data.price}
                                        </Box>
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Button
                    className="mob-navigation-buttons mob-left-button"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    <ChevronLeftIcon />
                </Button>
                <Button
                    className="mob-navigation-buttons mob-right-button"
                    onClick={handleNext}
                    disabled={currentIndex === recommendations.length - 1}
                >
                    <ChevronRightIcon />
                </Button>
            </Box>
        </Box>
    )
}

MobileRecommendations.propTypes = {
    productID: PropTypes.string,
    noOfResults: PropTypes.number,
    podId: PropTypes.string,
    filters: PropTypes.object,
    term: PropTypes.string
}

export default MobileRecommendations
