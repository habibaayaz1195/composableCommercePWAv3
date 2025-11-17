import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {CollapsibleLayout} from '../collapsibleLayout/index'
import {Region} from '@salesforce/commerce-sdk-react/components'
import {IntlProvider} from 'react-intl'
import { renderWithProviders } from '@salesforce/retail-react-app/app/utils/test-utils';
 
// Mocking the Region component
jest.mock('@salesforce/commerce-sdk-react/components', () => ({
    Region: jest.fn(() => <div>Mocked Region</div>)
}))

 
describe('CollapsibleLayout', () => {
    const regions = [
        {id: '1', name: 'Region 1'},
        {id: '2', name: 'Region 2'}
    ]

    const messages = {
        'faq.heading': 'Frequently asked questions'
    }

    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        })
    })
 
    const renderComponent = () => {
        renderWithProviders(
            <IntlProvider locale="en" messages={messages}>
                <CollapsibleLayout regions={regions} />
            </IntlProvider>
        )
    }
 
    test('renders the heading correctly', () => {
        renderComponent()
 
        const heading = screen.getByRole('heading', {
            name: /frequently asked questions/i
        })
        expect(heading).toBeInTheDocument()
    })
 
    test('renders the correct number of Region components', () => {
        renderComponent()
 
        const regionElements = screen.getAllByText('Mocked Region')
        expect(regionElements).toHaveLength(regions.length)
    })
})