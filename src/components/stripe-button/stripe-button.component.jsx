import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HkvEMEHGLta1yKnZUSdggjM2d9Adw0pW66VKJ0zHgqWh0kF6zrDNOrhWztfwZLCRZX7G86KVEIUd5Eydbsk1C2L007l2C8YKc'
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
    return (<StripeCheckout
        label='Pay Now'
        name='CROWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://sendeyo.com/up/d/f3eb2117da'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
    />
    )
}

export default StripeCheckoutButton;