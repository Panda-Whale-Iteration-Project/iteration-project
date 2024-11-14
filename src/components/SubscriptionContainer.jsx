//The container lists all active subscriptions with options to edit, delete, or toggle notifications.
//SubscriptionDisplay.jsx will be used to render each individual subscription.
import React from 'react';
// import SubscriptionDisplay from './SubscriptionDisplay.jsx';
import SubscriptionDisplayRearrange from './SubscriptionDisplayRearrange.jsx';

const SubscriptionContainer = ({ userData, subscriptionData }) => {
  return (
    <div className='bg-white w-full p-4 rounded shadow-md'>
      <h2 className='text-xl font-bold text-indigo-600 mb-4'>Subscriptions</h2>
      {/* <SubscriptionDisplay userData={userData} />  */}
      <SubscriptionDisplayRearrange userData={userData} subscriptionData={subscriptionData} />
      {/* Repeat SubscriptionDisplay for each subscription item */}
    </div>
  );
};

export default SubscriptionContainer;


