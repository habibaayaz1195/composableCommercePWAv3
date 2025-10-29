import React from 'react'
import {render} from '@testing-library/react'
import {renderWithProviders} from '@salesforce/retail-react-app/app/utils/test-utils'
import TabItem from '../tab-item/index'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

test('TabItem renders without errors', () => {
    renderWithProviders (
        <TabItem
            regions={[
                {
                    components: [
                        {
                            data: {
                                accodionItem: 'Tab Title Text ',
                                accordionDetail: 'Tab Detail Text'
                            },
                            id: '6b3fc18c611b4e128b2496da87',
                            typeId: 'pd_assets.pdPlusAccordion'
                        }
                    ]
                }
            ]}
        />
    )
    expect(document.querySelector('.tab-item')).not.toBeNull()
})