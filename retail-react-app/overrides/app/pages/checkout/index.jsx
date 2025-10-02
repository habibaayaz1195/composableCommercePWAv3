



    /*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useEffect, useState} from 'react'
import {FormattedMessage, useIntl} from 'react-intl'
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Container,
    Grid,
    GridItem,
    Stack
} from '@salesforce/retail-react-app/app/components/shared/ui'
import useNavigation from '@salesforce/retail-react-app/app/hooks/use-navigation'
import {
    CheckoutProvider,
    useCheckout
} from '@salesforce/retail-react-app/app/pages/checkout/util/checkout-context'
import ContactInfo from '@salesforce/retail-react-app/app/pages/checkout/partials/contact-info'
import ShippingAddress from '@salesforce/retail-react-app/app/pages/checkout/partials/shipping-address'
// import ShippingOptions from '@salesforce/retail-react-app/app/pages/checkout/partials/shipping-options'
// import Payment from '@salesforce/retail-react-app/app/pages/checkout/partials/payment'
import OrderSummary from '@salesforce/retail-react-app/app/components/order-summary'
import {useCurrentCustomer} from '@salesforce/retail-react-app/app/hooks/use-current-customer'
import {useCurrentBasket} from '@salesforce/retail-react-app/app/hooks/use-current-basket'
import CheckoutSkeleton from '@salesforce/retail-react-app/app/pages/checkout/partials/checkout-skeleton'
import {useUsid, useShopperOrdersMutation} from '@salesforce/commerce-sdk-react'
import { ToggleCard } from '@salesforce/retail-react-app/app/components/toggle-card'
import { getAppOrigin } from '@salesforce/pwa-kit-react-sdk/utils/url'
import axios from 'axios'
import { useMemo } from 'react'
 
// import { loadStripe } from '@stripe/stripe-js'
// import {
//     Elements,
//     useStripe,
//     useElements,
//     PaymentElement
// } from '@stripe/react-stripe-js'
 
// const STRIPE_PUBLISHABLE_KEY = "pk_test_51NQqygFOWeiILMiFvEfdoO9TAP1hgKuk0avfuHrKrnhht53B8KZTJ73Rzkv4OcCGlIb6ATLb4A4GjVHQQbPVRgQE00cJOtolRd";
// const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
import ShippingOptions from './partials/shipping-options'
import Payment from './partials/payment'
import StripeCheckout from './partials/stripeCheckout'
 

const Checkout = (props) => {
    const {formatMessage} = useIntl()
    
    const navigate = useNavigation()
    const {usid} = useUsid()
    const {step} = useCheckout()
    const [error, setError] = useState()
    const {data: basket} = useCurrentBasket()
    const {mutateAsync: createOrder} = useShopperOrdersMutation('createOrder')

    useEffect(() => {
        if (error || step === 4) {
            window.scrollTo({bottom: 0})
        }
    }, [error, step])
    const submitOrder = async () => {
        try {            
            var order = await createOrder({
                headers: { _sfdc_customer_id: usid },
                body: { basketId: basket.basketId }
            })
            return order
        } catch (error) {
            throw (error)
        } 
    }
    console.log("backet",basket,"total ",basket.orderTotal)
    return (
        <Box background="gray.50" flex="1">
            <Container
                data-testid="sf-checkout-container"
                maxWidth="container.xl"
                py={{ base: 7, lg: 16 }}
                px={{ base: 0, lg: 8 }}
            >
                <Grid templateColumns={{ base: '1fr', lg: '66% 1fr' }} gap={{ base: 10, xl: 20 }}>
                    <GridItem>
                        <Stack spacing={4}>
                            {error && (
                                <Alert status="error" variant="left-accent">
                                    <AlertIcon />
                                    {error}
                                </Alert>
                            )}
 
                            <ContactInfo />
                            <ShippingAddress />
                            <ShippingOptions />
                            <Payment />
                            {step === 4 && (
                                <StripeCheckout submitOrder={submitOrder} price={basket?.orderTotal} basket={basket}/>
                            )}
                        </Stack>
                    </GridItem>
 
                    <GridItem py={6} px={[4, 4, 4, 0]}>
                        <OrderSummary
                            basket={basket}
                            showTaxEstimationForm={false}
                            showCartItems={true}
                        />
 
                    </GridItem>
                </Grid>
            </Container>
        </Box>
    )
}

const CheckoutContainer = () => {
    const { data: customer } = useCurrentCustomer()
    const { data: basket } = useCurrentBasket()
 
    if (!customer || !customer.customerId || !basket || !basket.basketId) {
        return <CheckoutSkeleton />
    }
 
    return (
        <CheckoutProvider>
                <Checkout />
        </CheckoutProvider>
    )
}

export default CheckoutContainer
