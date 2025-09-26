import React, {useState, useEffect} from 'react'
import {useCioAutocomplete} from '@constructor-io/constructorio-ui-autocomplete'
import {ssrParameters} from '../../../../config/default'
import '../../static/style-sheets/style.scss'
import {Box, Input, Text, Image, Link, IconButton} from '@chakra-ui/react'
import {SearchIcon, CloseIcon} from '@chakra-ui/icons'
import {useProduct} from '@salesforce/commerce-sdk-react'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import Recommendations from './recommendations'

const args = {
    apiKey: 'key_GhkM9tF89OfZOFM5',
    onSubmit: (submitEvent) => console.dir(submitEvent)
}

function Search() {
    const {
        isOpen,
        sections,
        getFormProps,
        getLabelProps,
        getInputProps,
        getMenuProps,
        getItemProps,
        autocompleteClassName
    } = useCioAutocomplete(args)

    const [isSuggestionsOpen, setSuggestionsOpen] = useState(false)
    const [isDidYouMeanOpen, setDidYouMeanOpen] = useState(false)
    const [isCloseButtonVisible, setCloseButtonVisible] = useState(false)
    const [showPoweredBy, setShowPoweredBy] = useState(false);
    const [maxItems, setMaxItems] = useState(5)
    const [inputValue, setInputValue] = useState('') // State to hold input value
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
    }
    // Function to handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value)
        if (event.target.value.length >= 3) {
            setShowPoweredBy(true); // Show the "powered by Constructor-IO" text when input length is 3 or more
        } else {
            setShowPoweredBy(false); // Hide it otherwise
        }
    }

    // Function to handle closing suggestions
    const handleCloseSuggestions = () => {
        console.log('handleCloseSuggestions')
        setSuggestionsOpen(false)
        setCloseButtonVisible(false)
    }
    // Function to handle closing DID you mean
    const handleCloseDidYouMean = () => {
        setDidYouMeanOpen(false)
        setCloseButtonVisible(false)
    }

    let history = useHistory()

    let host = 'http://'
    ssrParameters.proxyConfigs.forEach((element) => {
        if (element.path === 'ocapi') {
            host += element.host
        }
    })

    function highlightSuggestedTerm(text, term) {
        if (text && term) {
            const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi')
            return text
                .split(regex)
                .map((part, index) =>
                    regex.test(part) ? <strong key={index}>{part}</strong> : part
                )
        }
        return text
    }

    // Effect to blur background when suggestions are open
    // useEffect(() => {
    //     console.log('useEffect tiggered')
    //     const appMain = document.getElementById('app-main')
    //     if ((isOpen || isSuggestionsOpen || isDidYouMeanOpen) && (inputValue.length > 3)) {
    //         appMain.classList.add('blur-body')
    //     } else {
    //         appMain.classList.remove('blur-body')
    //     }
    // }, [isOpen])

    // Check if there are no search suggestions
    const noSearchSuggestions = sections.some(
        (section) => section.indexSectionName === 'Search Suggestions' && section.data.length === 0
    )

    // Check if products are unavailable
    const noProductSuggestions = sections.some(
        (section) => section.indexSectionName === 'Products' && section.data.length === 0
    )

    console.log(
        'noSearchSuggestions & noProductSuggestions',
        noSearchSuggestions,
        noProductSuggestions
    )

    return (
        <Box className={autocompleteClassName}>
            <form {...getFormProps()} className="search-input" onChange={handleInputChange}>
                <label {...getLabelProps()} hidden>
                    Search
                </label>
                <SearchIcon className="search-icon" />
                <Input
                    {...getInputProps()}
                    onKeyDown={(e) => {
                        let searchContainerElement =
                            document.getElementsByClassName('search-wrap-container')[0]
                        searchContainerElement.style.display = 'block'
                        if (e.key === 'Enter') {
                            searchContainerElement.style.display = 'none'
                            e.target.blur()
                            history.push('/search?q=' + e.target.value)
                        }
                    }}
                />
            </form>
            {inputValue.length >= 3 && (
                <Box className={`search-wrap-container ${!isOpen ? 'hidden' : ''}`}>
                    {(inputValue.length > 0 && isOpen) && (
                    <IconButton
                        icon={<CloseIcon />}
                        aria-label="Close"
                        onClick={() => {
                            handleCloseSuggestions()
                            setSuggestionsOpen(false)
                            setCloseButtonVisible(false)
                        }}
                        className={`close-button ${isOpen ? 'visible' : 'hidden'}`}
                    />
                    )}
                    <Box
                        {...getMenuProps()}
                        className={`search-wrap ${isOpen ? 'visible' : 'hidden'}`}
                    >
                        {isOpen &&
                            sections?.map((section) => (
                                <Box
                                    key={section.indexSectionName}
                                    className={`${
                                        section.indexSectionName === 'Search Suggestions'
                                            ? 'search-suggestions'
                                            : 'products'
                                    }`}
                                >
                                {section.indexSectionName === 'Products' ? (
                                        <ProductSection
                                            section={section}
                                            getItemProps={getItemProps}
                                            host={host}
                                            maxItems={maxItems}
                                            allSections={sections}
                                        />
                                    ) : (
                                        <SearchSuggestionSection
                                            section={section}
                                            getItemProps={getItemProps}
                                            highlightSuggestedTerm={highlightSuggestedTerm}
                                            inputValue={inputValue}
                                            sections={sections}
                                            allSections={sections}
                                        />
                                    )}
                                </Box>
                            ))}
                    </Box>
                    {noSearchSuggestions && noProductSuggestions && <DidYouMeanSection handleCloseDidYouMean={handleCloseDidYouMean} />}
                    {(isOpen && ((noSearchSuggestions || noProductSuggestions) || ((noSearchSuggestions || !noProductSuggestions)))) && (
                        <Text className="powered-by-search-text">
                            Powered by <span>Constructor-IO</span>
                        </Text>
                    )}
                </Box>
            )}
        </Box>
    )
}
function DidYouMeanSection({ handleCloseDidYouMean, isVisible, inputValue }) {
     const history = useHistory()
    const location = useLocation()
    const {productId} = useParams()
    const urlParams = new URLSearchParams(location.search)
    const {
        data: product,
        isLoading: isProductLoading,
        isError: isProductError,
        error: productError
    } = useProduct(
        {
            parameters: {
                id: urlParams.get('pid') || productId,
                allImages: true
            }
        },
        {
            // When shoppers select a different variant (and the app fetches the new data),
            // the old data is still rendered (and not the skeletons).
            keepPreviousData: true
        }
    )
    const [isCloseButtonVisible, setCloseButtonVisible] = useState(false)
    const [visibility, setVisibility] = useState(isVisible ? 'none' : 'block');

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close DidYouMean section if user clicks outside
            if (!event.target.closest('.did-you-mean-empty')) {
                handleCloseDidYouMean();
                setVisibility('none');
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [handleCloseDidYouMean]);

    useEffect(() => {
        const appMain = document.getElementById('app-main');
        if (visibility === 'block' && inputValue?.length > 3) {
            appMain.classList.add('blur-body');
        } else {
            appMain.classList.remove('blur-body');
        }
    }, [visibility]);

    const handleVisibilityChange = (newVisibility) => {
        setVisibility(newVisibility);
        setCloseButtonVisible(newVisibility === 'block');
    };
    return (
        <Box style={{ display: visibility }} className={`did-you-mean-empty`}>
            <IconButton
                icon={<CloseIcon />}
                aria-label="Close"
                onClick={() => {
                    handleCloseDidYouMean();
                    handleVisibilityChange('none');
                }}
                className={`close-button ${isCloseButtonVisible ? 'visible' : 'hidden'}`}

            />
            <Box className={`did-you-mean-empty-content`}>
                <Text className="heading">This item is not available.</Text>
                <Text className="text">
                     But these are our best sellers that you can check.
                </Text>
            </Box>

            <Recommendations
                productID={product?.id}
                noOfResults={6}
                podId="bestsellers"
            />
            <Text className="powered-by-search-text">
                Powered by <span>Constructor-IO</span>
            </Text>
        </Box>
    );
}


function ProductSection({
    section,
    getItemProps,
    host,
    maxItems,
    noSearchSuggestions,
    noProductSuggestions
}) {
    return (
        <Box
            className="cio-section"
            marginX={section.indexSectionName === 'Search Suggestions' ? '12px' : '0'}
        >
            <Text className="cio-sectionName title">You might be interested in</Text>
            <Box className="cio-items suggestion-images-container">
                {section.data.slice(0, maxItems).map((item) => (
                    <Box
                        {...getItemProps(item)}
                        key={item.id}
                        className="cio-item"
                        style={{display: 'block'}} // Always display
                    >
                        {host && item.data?.image_url && (
                            <a href={`/product/${item.data.id}`}>
                                <Image
                                    src={host + item.data?.image_url}
                                    alt=""
                                    className="suggestion-images"
                                    data-testid="cio-img"
                                />
                            </a>
                        )}
                        {item.groupName ? (
                            <Text className="cio-term-in-group">in {item.groupName}</Text>
                        ) : (
                            <Box className="cio-item-heading-parent">
                                <Link
                                    href={'/product/' + item.data.id}
                                    className="cio-item-heading"
                                >
                                    {item.value}
                                </Link>
                                {/* <Text>Price: {item.data.price}</Text> */}
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

function SearchSuggestionSection({
    section,
    getItemProps,
    highlightSuggestedTerm,
    inputValue: inputVal,
    sections
}) {
    const noSearchSuggestions = sections.some(
        (section) => section.indexSectionName === 'Search Suggestions' && section.data.length === 0
    )
    return (
        <Box className="cio-section">
            <Text className="cio-sectionName title">
                {section.displayName || section.indexSectionName}
            </Text>
            {section.data.map((item) => (
                <Link href={`/product/${item.data.id}`} key={item.id}>
                    {highlightSuggestedTerm(item.value, inputVal)}
                </Link>
            ))}
            {noSearchSuggestions && (
                <Box className="did-you-mean-section">
                    <Text className="chakra-link">
                        "<span className="italics">{`${inputVal}`}</span>
                        {`" is not available. Please check your spellings.`}
                    </Text>{' '}
                    <Text className="sectionName">Did you mean?</Text>
                    <Link
                        href={`/product/${
                            sections.find((section) => section.indexSectionName === 'Products')
                                ?.data[0]?.data.id
                        }`}
                    >
                        {
                            sections.find((section) => section.indexSectionName === 'Products')
                                ?.data[0]?.value
                        }
                    </Link>
                </Box>
            )}
        </Box>
    )
}
export default Search