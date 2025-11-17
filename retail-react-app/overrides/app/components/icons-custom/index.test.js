/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {IntlProvider} from 'react-intl'
import {defineMessage} from 'react-intl'

import {
    icon,
    HamburgerCustomIcon,
    LocationIcon,
    LocationIconBlue,
    BrandLogo,
    QuoteIconOrange,
    Printer,
    ChevronRight,
    ChevronUp,
    BlueBackArrow,
    DashboardIcon,
    LogoutIcon,
    GreenTick
} from './index'

// Mock the Icon component and useTheme hook
jest.mock('@salesforce/retail-react-app/app/components/shared/ui', () => {
    const React = require('react')
    return {
        Icon: React.forwardRef(({children, 'aria-label': ariaLabel, ...props}, ref) => {
            // Create a proper SVG structure for testing that preserves the use element
            // Extract the xlinkHref from the use element if it exists
            let useElement = null
            if (children && React.isValidElement(children) && children.type === 'use') {
                useElement = React.cloneElement(children, {
                    'data-testid': 'use-element',
                    ...children.props
                })
            }
            
            return (
                <svg data-testid="icon" ref={ref} aria-label={ariaLabel} {...props}>
                    {useElement || children}
                </svg>
            )
        }),
        useTheme: jest.fn(() => ({
            components: {
                Icon: {
                    baseStyle: {color: 'inherit'}
                }
            }
        }))
    }
})

// Mock SVG imports
jest.mock('../../assets/svg/hamburger.svg', () => ({}), {virtual: true})
jest.mock('../../assets/svg/location-icon.svg', () => ({}), {virtual: true})
jest.mock('../../assets/svg/location-icon-blue.svg', () => ({}), {virtual: true})
jest.mock('../../assets/svg/brand-logo.svg', () => ({}), {virtual: true})
jest.mock('../../assets/svg/quote-icon-orange.svg', () => ({}), {virtual: true})
jest.mock('../../assets/svg/printer.svg', () => ({}), {virtual: true})
jest.mock('../../assets/svg/chevron-right.svg', () => ({}), {virtual: true})
jest.mock('../../assets/svg/chevron-up.svg', () => ({}), {virtual: true})
jest.mock('../../assets/svg/blue-back-arrow.svg', () => ({}), {virtual: true})
jest.mock('../../assets/svg/dashboard-icon.svg', () => ({}), {virtual: true})
jest.mock('../../assets/svg/logout-icon.svg', () => ({}), {virtual: true})
jest.mock('../../assets/svg/green-tick.svg', () => ({}), {virtual: true})

// Helper function to render with IntlProvider
const renderWithIntl = (component, locale = 'en') => {
    return render(
        <IntlProvider locale={locale} messages={{}}>
            {component}
        </IntlProvider>
    )
}

describe('icon helper function', () => {
    test('creates an icon component with correct display name', () => {
        const TestIcon = icon('test-icon', {width: '20px', height: '20px'})
        expect(TestIcon.displayName).toBe('TestIconIcon')
    })

    test('renders icon with correct props', () => {
        const TestIcon = icon('test-icon', {width: '20px', height: '20px'})
        render(<TestIcon />)
        
        const iconElement = screen.getByTestId('icon')
        expect(iconElement).toBeInTheDocument()
        expect(iconElement).toHaveAttribute('role', 'img')
        expect(iconElement).toHaveAttribute('aria-label', 'test-icon')
        expect(iconElement).toHaveAttribute('width', '20px')
        expect(iconElement).toHaveAttribute('height', '20px')
    })

    test('renders icon with use element', () => {
        const TestIcon = icon('test-icon', {width: '20px', height: '20px'})
        const {container} = render(<TestIcon />)
        
        // Check that the icon element exists
        const iconElement = screen.getByTestId('icon')
        expect(iconElement).toBeInTheDocument()
        
        // Check that there's a use element inside the icon
        const useElement = container.querySelector('use')
        expect(useElement).toBeInTheDocument()
        expect(useElement.tagName.toLowerCase()).toBe('use')
    })

    test('forwards ref correctly', () => {
        const TestIcon = icon('test-icon', {width: '20px', height: '20px'})
        const ref = React.createRef()
        
        render(<TestIcon ref={ref} />)
        expect(ref.current).toBeTruthy()
    })

    test('applies additional props passed to component', () => {
        const TestIcon = icon('test-icon', {width: '20px', height: '20px'})
        render(<TestIcon className="custom-class" data-testid="custom-icon" />)
        
        const iconElement = screen.getByTestId('custom-icon')
        expect(iconElement).toHaveClass('custom-class')
    })

    test('handles localization attributes with IntlProvider', () => {
        const localizedMessage = defineMessage({
            id: 'test.message',
            defaultMessage: 'Test Message'
        })
        
        const TestIcon = icon(
            'test-icon',
            {width: '20px', height: '20px'},
            {title: localizedMessage}
        )
        
        renderWithIntl(<TestIcon />)
        
        const iconElement = screen.getByTestId('icon')
        expect(iconElement).toHaveAttribute('title', 'Test Message')
    })

    test('handles localization attributes with intl prop', () => {
        const localizedMessage = defineMessage({
            id: 'test.message',
            defaultMessage: 'Test Message'
        })
        
        const TestIcon = icon(
            'test-icon',
            {width: '20px', height: '20px'},
            {title: localizedMessage}
        )
        
        const mockIntl = {
            formatMessage: jest.fn(() => 'Test Message')
        }
        
        render(<TestIcon intl={mockIntl} />)
        
        const iconElement = screen.getByTestId('icon')
        expect(iconElement).toHaveAttribute('title', 'Test Message')
        expect(mockIntl.formatMessage).toHaveBeenCalledWith(localizedMessage)
    })

    test('throws error when localization attributes provided but no intl context', () => {
        const localizedMessage = defineMessage({
            id: 'test.message',
            defaultMessage: 'Test Message'
        })
        
        const TestIcon = icon(
            'test-icon',
            {width: '20px', height: '20px'},
            {title: localizedMessage}
        )
        
        expect(() => {
            render(<TestIcon />)
        }).toThrow('To localize messages, you must either have <IntlProvider> in the component ancestry or provide `intl` as a prop')
    })

    test('prioritizes intl prop over context', () => {
        const localizedMessage = defineMessage({
            id: 'test.message',
            defaultMessage: 'Test Message'
        })
        
        const TestIcon = icon(
            'test-icon',
            {width: '20px', height: '20px'},
            {title: localizedMessage}
        )
        
        const mockIntl = {
            formatMessage: jest.fn(() => 'Prop Message')
        }
        
        renderWithIntl(<TestIcon intl={mockIntl} />)
        
        expect(mockIntl.formatMessage).toHaveBeenCalledWith(localizedMessage)
    })

    test('handles complex display name generation', () => {
        const TestIcon = icon('complex-test-icon-name', {width: '20px', height: '20px'})
        expect(TestIcon.displayName).toBe('ComplexTestIconNameIcon')
    })

    test('includes PropTypes for intl', () => {
        const TestIcon = icon('test-icon', {width: '20px', height: '20px'})
        expect(TestIcon.propTypes).toHaveProperty('intl')
    })
})

describe('exported icon components', () => {
    const iconComponents = [
        {name: 'HamburgerCustomIcon', component: HamburgerCustomIcon, expectedName: 'hamburger'},
        {name: 'LocationIcon', component: LocationIcon, expectedName: 'location-icon'},
        {name: 'LocationIconBlue', component: LocationIconBlue, expectedName: 'location-icon-blue'},
        {name: 'BrandLogo', component: BrandLogo, expectedName: 'brand-logo'},
        {name: 'QuoteIconOrange', component: QuoteIconOrange, expectedName: 'quote-icon-orange'},
        {name: 'Printer', component: Printer, expectedName: 'printer'},
        {name: 'ChevronRight', component: ChevronRight, expectedName: 'chevron-right'},
        {name: 'ChevronUp', component: ChevronUp, expectedName: 'chevron-up'},
        {name: 'BlueBackArrow', component: BlueBackArrow, expectedName: 'blue-back-arrow'},
        {name: 'DashboardIcon', component: DashboardIcon, expectedName: 'dashboard-icon'},
        {name: 'LogoutIcon', component: LogoutIcon, expectedName: 'logout-icon'},
        {name: 'GreenTick', component: GreenTick, expectedName: 'green-tick'}
    ]

    iconComponents.forEach(({name, component, expectedName}) => {
        test(`renders ${name} correctly`, () => {
            const Component = component
            const {container} = render(<Component />)
            
            const iconElement = screen.getByTestId('icon')
            expect(iconElement).toBeInTheDocument()
            expect(iconElement).toHaveAttribute('aria-label', expectedName)
            
            const useElement = container.querySelector('use')
            expect(useElement).toBeInTheDocument()
            expect(useElement.tagName.toLowerCase()).toBe('use')
        })

        test(`${name} has correct display name`, () => {
            const expectedDisplayName = expectedName
                .toLowerCase()
                .replace(/(?:^|[\s-/])\w/g, (match) => match.toUpperCase())
                .replace(/-/g, '') + 'Icon'
            
            expect(component.displayName).toBe(expectedDisplayName)
        })

        test(`${name} forwards ref`, () => {
            const Component = component
            const ref = React.createRef()
            render(<Component ref={ref} />)
            expect(ref.current).toBeTruthy()
        })
    })
})

describe('specific icon component properties', () => {
    test('HamburgerCustomIcon has correct dimensions', () => {
        render(<HamburgerCustomIcon />)
        const iconElement = screen.getByTestId('icon')
        expect(iconElement).toHaveAttribute('width', '88')
        expect(iconElement).toHaveAttribute('height', '24')
        expect(iconElement).toHaveAttribute('viewBox', '0 0 88 24')
    })

    test('LocationIcon has correct dimensions', () => {
        render(<LocationIcon />)
        const iconElement = screen.getByTestId('icon')
        expect(iconElement).toHaveAttribute('width', '16')
        expect(iconElement).toHaveAttribute('height', '16')
        expect(iconElement).toHaveAttribute('viewBox', '0 0 16 16')
    })

    test('BrandLogo has correct dimensions', () => {
        render(<BrandLogo />)
        const iconElement = screen.getByTestId('icon')
        expect(iconElement).toHaveAttribute('width', '135')
        expect(iconElement).toHaveAttribute('height', '33')
        expect(iconElement).toHaveAttribute('viewBox', '0 0 135 33')
    })

    test('GreenTick has correct dimensions', () => {
        render(<GreenTick />)
        const iconElement = screen.getByTestId('icon')
        expect(iconElement).toHaveAttribute('width', '20px')
        expect(iconElement).toHaveAttribute('height', '20px')
        expect(iconElement).toHaveAttribute('viewBox', '0 0 20 20')
    })
})

describe('theme integration', () => {
    test('applies theme baseStyle to icon', () => {
        const TestIcon = icon('test-icon', {width: '20px', height: '20px'})
        render(<TestIcon />)
        
        const iconElement = screen.getByTestId('icon')
        expect(iconElement).toHaveAttribute('color', 'inherit')
    })

    test('merges theme baseStyle with component props', () => {
        const TestIcon = icon('test-icon', {width: '20px', height: '20px'})
        render(<TestIcon className="custom-class" />)
        
        const iconElement = screen.getByTestId('icon')
        expect(iconElement).toHaveAttribute('color', 'inherit')
        expect(iconElement).toHaveClass('custom-class')
    })
})

describe('accessibility', () => {
    test('all icons have correct role and aria-label', () => {
        const TestIcon = icon('test-icon', {width: '20px', height: '20px'})
        render(<TestIcon />)
        
        const iconElement = screen.getByTestId('icon')
        expect(iconElement).toHaveAttribute('role', 'img')
        expect(iconElement).toHaveAttribute('aria-label', 'test-icon')
    })

    test('use element exists and has correct tag name', () => {
        const TestIcon = icon('test-icon', {width: '20px', height: '20px'})
        const {container} = render(<TestIcon />)
        
        const useElement = container.querySelector('use')
        expect(useElement).toBeInTheDocument()
        expect(useElement.tagName.toLowerCase()).toBe('use')
    })
})
