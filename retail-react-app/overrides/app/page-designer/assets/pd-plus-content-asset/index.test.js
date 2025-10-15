import React from 'react'
import {render} from '@testing-library/react'
import {renderWithProviders} from '@salesforce/retail-react-app/app/utils/test-utils'
import PDPlusContentAsset from '../pd-plus-content-asset/index'

// Mock the useContent hook
jest.mock('@salesforce/commerce-sdk-react', () => ({
    useContent: jest.fn().mockReturnValue({
        data: {
            c_body: 'Mocked content'
        },
        error: null
    })
}))

describe('PDPlusContentAsset', () => {
    test('Content Assets renders without errors', () => {
        renderWithProviders(
            <PDPlusContentAsset
                regions={[
                    {
                        components: [
                            {
                                data: {
                                    contentassetID: 'footer-static-page-left-sidebar',
                                },
                                id: '2f72a6a939df1527ec378f8509',
                                typeId: 'commerce_assets.editorialRichText'
                            }
                        ],
                        id: 'column1'
                    },
                    {
                        components: [
                            {
                                data: {
                                    contentassetID: 'footer-static-content-pages',
                                },
                                id: '8476240d80f9d076607ca150ee',
                                typeId: 'commerce_layouts.layoutGrid3By9'
                            }
                        ],
                        id: 'column2'
                    }
                ]}
            />
        )
        
        expect(document.querySelector('.contentAsset-holder')).toBeInTheDocument()
    })
})