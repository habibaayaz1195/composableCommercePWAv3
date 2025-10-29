// RichTextBox.test.js
import React from 'react'
import IconTxtCard from './index'
import {renderWithProviders} from '@salesforce/retail-react-app/app/utils/test-utils'


const SAMPLE_DATA = {
    cardRichText: "<p>This is a <strong>test</strong> rich Text <strong>text</strong> content.</p>",
    cardIconImg: {
        _type: 'Image',
        focalPoint: {
            _type: 'Imagefocalpoint',
            x: 0.5,
            y: 0.5
        },
        metaData: {
            _type: 'Imagemetadata',
            height: 1280,
            width: 1920
        },
        url: 'https://zzrf-001.dx.commercecloud.salesforce.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw34c389b5/images/SearchBanner/search.jpg'
    },
    cardIconAlt: "Alt Text test Icon Image Card Component",
}

test('Page renders correct component', () => {
    const {getByText} = renderWithProviders(<IconTxtCard {...SAMPLE_DATA} />)

    expect(getByText(/Icon Text Card component/i)).toBeInTheDocument()
})
