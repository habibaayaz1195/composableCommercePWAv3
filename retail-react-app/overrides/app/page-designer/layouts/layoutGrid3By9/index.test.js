import React from 'react'
import {render} from '@testing-library/react'
import {renderWithProviders} from '@salesforce/retail-react-app/app/utils/test-utils'
import LayoutGrid3By9 from '../layoutGrid3By9/index'

// Mock the useContent hook
jest.mock('@salesforce/commerce-sdk-react', () => ({
    useContent: jest.fn().mockReturnValue({
        data: {
            c_body: 'Mocked content'
        },
        error: null
    })
}))

describe('LayoutGrid3By9', () => {
    test('LayoutGrid3By9 renders without errors', () => {
        renderWithProviders(
            <LayoutGrid3By9
                regions={[
                    {
                        components: [
                            {
                                data: {
                                    customClass: 'static-page-wrapper',
                                },
                                id: '668b8a3095d2a2b1564ede7d03',
                                typeId: 'commerce_layouts.layoutGrid3By9'
                            }
                        ],
                        id: 'main'
                    }
                ]}
            />
        )
        
        expect(document.querySelector('.LayoutGrid3By9')).toBeInTheDocument()
    })
})