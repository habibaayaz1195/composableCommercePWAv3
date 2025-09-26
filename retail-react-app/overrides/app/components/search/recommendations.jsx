import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ConstructorioClient from '@constructor-io/constructorio-client-javascript';
import { Box } from '@chakra-ui/react';
import { getAppOrigin } from '@salesforce/pwa-kit-react-sdk/utils/url';
import { Link } from 'react-router-dom';

const ConstructorRecommendations = ({ productID, noOfResults, podId, filters, term }) => {
    const [recommendations, setRecommendations] = useState([]);
    const url = getAppOrigin();

    console.log('recommendations', recommendations, url);

    useEffect(() => {
        const constructorio = new ConstructorioClient({
            apiKey: 'key_nD31T9flU169jaPu',
            sessionId: 241,
            clientId:
                document.cookie
                    .match('(^|;)\\s*' + 'ConstructorioID_client_id' + '\\s*=\\s*([^;]+)')
                    ?.pop() || ''
        });

        constructorio.recommendations
            .getRecommendations(podId, {
                numResults: noOfResults,
                itemIds: [productID],
                filters: filters,
                term: term
            })
            .then((data) => {
                setRecommendations(data.response.results);
            })
            .catch((err) => {
                console.log(err);
                setRecommendations([]);
            });

        // Cleanup
        return () => {};
    }, [productID, noOfResults, podId, filters, term]);

    return (
        <Box className="dym-recommendations-wrapper">
            <Box className="dym-recommendations-container">
                <Box className="recommendations-items">
                    {recommendations.map((rec, index) => (
                        <Box className="recommendation-item" key={rec.data.id}>
                            <Link
                                onClick={() => {
                                    window.open(rec.data.url, '_blank');
                                }}
                                key={rec.data.id}
                                as="figure"
                            >
                                <img
                                    src={rec.data.image_url}
                                    alt={rec.data.name}
                                    className="recommendation-image"
                                />
                                <Box as="figcaption" className="recommendation-details">
                                    <Box className="recommendation-name">{rec.value}</Box>
                                    <Box className="recommendation-price">
                                        Price: ${rec.data.price}
                                    </Box>
                                </Box>
                            </Link>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

ConstructorRecommendations.propTypes = {
    productID: PropTypes.string,
    noOfResults: PropTypes.number,
    podId: PropTypes.string,
    filters: PropTypes.object,
    term: PropTypes.string
};

export default ConstructorRecommendations;
