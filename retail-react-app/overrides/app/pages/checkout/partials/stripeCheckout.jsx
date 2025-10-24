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


  // const submitOrder = async () => {
  //   try {
  //     setIsLoading(true)

  //     if (!stripe) {
  //       throw("")
  //     }


  //     const { error: submitError } = await elements.submit();
  //     if (submitError) {
  //       handleError(submitError);
  //     }

  //     const { error, paymentMethod } = await stripe.createPaymentMethod({
  //       elements
  //     });

  //     if (error) {
  //       throw("")
  //     }
  //    console.log(paymentMethod,"paymentMethod")
  //    console.log(elements,"elements")
  //     const order = await props.submitOrder()

  //     // Create the PaymentIntent
  //     await axios.post(`${getAppOrigin()}/create-confirm-intent`, {
  //       paymentMethodId: paymentMethod.id,
  //       order: order
  //     }).then((res) => {
  //       console.log(res.data,"stripe-res");
  //       if (res.data.status == 'succeeded') {
  //         navigate(`checkout/confirmation/${order.orderNo}`)
  //       }
  //     }).catch((err) => {
  //       console.log(err)
  //     });
       
  //   } catch (error) {
  //     const message = formatMessage({
  //       id: 'checkout.message.generic_error',
  //       defaultMessage: 'An unexpected error occurred during checkout.'
  //     })
  //     setError(message)
  //   } finally {
  //     setIsLoading(false)

  //   }
  // }

  const submitOrder = async () => {
  try {
    setIsLoading(true);

    if (!stripe || !elements) {
      throw new Error("Stripe.js has not loaded yet");
    }

    // Validate form inputs first
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    // 1 Create order in SFCC (your existing flow)
    const order = await props.submitOrder();

    // Call backend to create PaymentIntent
    const { data } = await axios.post(`${getAppOrigin()}/create-confirm-intent`, {
      order
    });
   console.log("url", data)
    if (!data || !data.client_secret) {
      throw new Error("Missing client_secret from backend");
    }

    // Confirm payment using PaymentElement
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret: data.client_secret,
      confirmParams: {
        return_url: `${getAppOrigin()}/checkout/confirmation/${order.orderNo}`,
      },
    });
console.log(paymentIntent,"paymentIntent")
    if (error) {
      console.error("Payment failed:", error.message);
      handleError(error);
    } else if (paymentIntent?.status === "succeeded") {
      navigate(`checkout/confirmation/${order.orderNo}`);
    }

  } catch (error) {
    console.error("Checkout error:", error);
    const message = formatMessage({
      id: 'checkout.message.generic_error',
      defaultMessage: 'An unexpected error occurred during checkout.'
    });
    setError(message);
  } finally {
    setIsLoading(false);
  }
};


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
const STRIPE_PUBLISHABLE_KEY = "pk_test_51SCmKoAfz7mr8QpOYt4fdFEVdwEYjZrRjYk6n4AVrIoo02qzBaH1JRwQ2p9hPouyRLsP2r0qbdWWYM3PxdXsXQw000okRbYcdv";
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