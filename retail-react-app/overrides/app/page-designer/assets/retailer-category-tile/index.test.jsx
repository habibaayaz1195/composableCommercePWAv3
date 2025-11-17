/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import '@testing-library/jest-dom'; 
import { within, screen,render} from '@testing-library/react'
import {useCategory} from '@salesforce/commerce-sdk-react'
import {ShopCategory} from "./index"
import { MultiSiteProvider } from '@salesforce/retail-react-app/app/contexts';
import mockConfig from '@salesforce/retail-react-app/config/mocks/default'
import useMultiSite from '@salesforce/retail-react-app/app/hooks/use-multi-site'
import {BrowserRouter as Router, Route} from 'react-router-dom'

// Mock the useCategory hook
jest.mock('@salesforce/commerce-sdk-react', () => {
    return {
        useCategory: jest.fn()
    }
})

// Mock the useMultiSite hook
jest.mock('@salesforce/retail-react-app/app/hooks/use-multi-site', () => ({
    __esModule: true,
    default: jest.fn(),
}));

// Mock category data
const CATEGORY_MOCK_DATA = {
        "id": "women-rac",
        "image": "https://dummyimage.com/100x100/000/fff",
}

// Mock image data without a URL
const IMAGE_WITHOUT_URL = {
        "_type" : "Image",
        "focalPoint" : {
          "_type" : "Imagefocalpoint",
          "x" : 0.5,
          "y" : 0.5
        },
        "metaData" : {
          "_type" : "Imagemetadata",
          "height" : 165,
          "width" : 153
        },
        "alt":"office supplies",
}

// Mock props with an image URL
const MOCK_PROPS_WITH_IMAGE = {
    image : {
        ...IMAGE_WITHOUT_URL,
        "url" : "https://dummyimage.com/100x100/000/fff"
      },
      catDisplayName : "Gaming",
      category : "office-supplies-rac"
}

// Render the ShopCategory component with the mock props
const wrapperComponent = ({isImageWithoutURL,isDisplayName}) => {
    render(
        <MultiSiteProvider>
        <Router>
        {
            isDisplayName?(
            <ShopCategory 
                catDisplayName={MOCK_PROPS_WITH_IMAGE.catDisplayName} 
                category={MOCK_PROPS_WITH_IMAGE.category}
                image={isImageWithoutURL?IMAGE_WITHOUT_URL:MOCK_PROPS_WITH_IMAGE.image} 
            />):(<ShopCategory 
                category={MOCK_PROPS_WITH_IMAGE.category}
                image={isImageWithoutURL?IMAGE_WITHOUT_URL:MOCK_PROPS_WITH_IMAGE.image} 
            />)
        }  
        </Router>
        </MultiSiteProvider>
        )
};

// Test suite for the ShopCategory component
describe('RETAILER CATEGORY', () => { 
    // Reset all mocks before each test
    beforeEach(() => {
        jest.resetAllMocks()
        useCategory.mockReturnValue({
            error: null,
            data: CATEGORY_MOCK_DATA,
        });

        useMultiSite.mockReturnValue({
            site: { alias: 'test-site', id: 'site-id' },
            locale: { alias: 'en-US', id: 'locale-id' },
            buildUrl: jest.fn((path, siteRef, localeRef) => `/${siteRef}/${localeRef}${path}`),
        });
    })

    // Test that the component renders correctly with category data
    test('Renders correctly with category data', () => {
        wrapperComponent({isDisplayName:true});
      
        const link = screen.getByRole('link', {
            name: /office supplies/i
        });
        const img = within(link).getByRole('img');
        expect(link).toBeInTheDocument();
        expect(img).toBeInTheDocument()
    });

    // Test that the component renders the display name if it's passed in the props
    test('Render display name if passed in props', () => {
        wrapperComponent({isDisplayName:true});
        const regex = new RegExp(MOCK_PROPS_WITH_IMAGE.catDisplayName, 'i');
        const displayText = screen.getByText(regex)
        expect(displayText).toBeInTheDocument();
    });
    
    it('Hide display name if not passed in props', () => {
        wrapperComponent({isDisplayName:false});
        const regex = new RegExp(MOCK_PROPS_WITH_IMAGE.catDisplayName, 'i');
        const displayText = screen.queryByText(regex)
        expect(displayText).not.toBeInTheDocument();
    });
    

    test('Use fallback image from category object', () => {
        wrapperComponent({isDisplayName:false,isImageWithoutURL:true});
        const link = screen.getByRole('link', {
            name: /office supplies/i
          });
        const img = within(link).getByRole('img');
        expect(img).toHaveAttribute("src",CATEGORY_MOCK_DATA.image)
    });
 })