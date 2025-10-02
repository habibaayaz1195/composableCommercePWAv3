import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import React, { useEffect, useState } from 'react'
import { getAppOrigin } from '@salesforce/pwa-kit-react-sdk/utils/url'
import axios from 'axios'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
} from '@salesforce/retail-react-app/app/components/shared/ui'

import { FormattedMessage, useIntl } from 'react-intl'
import useNavigation from '@salesforce/retail-react-app/app/hooks/use-navigation'
import { ToggleCard } from '@salesforce/retail-react-app/app/components/toggle-card';

const CheckoutForm = (props) => {
  console.log("props", props)
  const { basket } = props
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { formatMessage } = useIntl()
  const navigate = useNavigation()


  const submitOrder = async () => {
    try {
      setIsLoading(true)

      if (!stripe) {
        throw("")
      }


      const { error: submitError } = await elements.submit();
      if (submitError) {
        handleError(submitError);
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        elements
      });

      if (error) {
        throw("")
      }

      const order = await props.submitOrder()

      // Create the PaymentIntent
      await axios.post(`${getAppOrigin()}/create-confirm-intent`, {
        paymentMethodId: paymentMethod.id,
        order: order
      }).then((res) => {
        console.log(res.data);
        if (res.data.status == 'succeeded') {
          navigate(`checkout/confirmation/${order.orderNo}`)
        }
      }).catch((err) => {
        console.log(err)
      });
       
    } catch (error) {
      const message = formatMessage({
        id: 'checkout.message.generic_error',
        defaultMessage: 'An unexpected error occurred during checkout.'
      })
      setError(message)
    } finally {
      setIsLoading(false)

    }
  }

  return (
    <div>
        <ToggleCard
            id="step-4"
            title={formatMessage({ defaultMessage: 'Payment', id: 'checkout_payment.title.payment' })}
        >
      <PaymentElement />

        </ToggleCard>
      {error && (
        <Alert status="error" variant="left-accent">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Box pt={2}>
        <Button w="full" onClick={submitOrder} isLoading={isLoading} disable={!stripe || !elements}>
          <FormattedMessage
            defaultMessage="Place Order"
            id="checkout.button.place_order"
          />
        </Button>
      </Box>
    </div>
  );
};
const STRIPE_PUBLISHABLE_KEY = "pk_test_51NQqygFOWeiILMiFvEfdoO9TAP1hgKuk0avfuHrKrnhht53B8KZTJ73Rzkv4OcCGlIb6ATLb4A4GjVHQQbPVRgQE00cJOtolRd";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const StripeCheckout = (props) => {


  const options = {
    mode: 'payment',
    amount: 953,
    currency: props.basket.currency.toLowerCase(),
    paymentMethodCreation: 'manual',
  };

  const mergedProps = { ...props }
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm {...mergedProps} />
      </Elements>
    </div>

  );

}
export default StripeCheckout