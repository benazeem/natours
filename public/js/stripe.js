/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe('pk_test_51QKRc5JLJp1PO8aYs7bDJRowP9RjYmSgu9Dt28SqP59WpZMKK4mSq2C8OWQiamZ0XcqbpnmVdfO6W0Q3pcSO5rlb00EvRpXMdH');

export const bookTour = async tourId => {
  try {
    console.log(tourId);
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};