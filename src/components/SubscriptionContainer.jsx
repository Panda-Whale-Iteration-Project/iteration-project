//The container lists all active subscriptions with options to edit, delete, or toggle notifications.
//SubscriptionDisplay.jsx will be used to render each individual subscription.

import React from 'react';
import SubscriptionDisplay from './SubscriptionDisplay.jsx';

const SubscriptionContainer = () => {
	return (
		<div className='bg-white w-full md:w-1/2 p-4 rounded shadow-md'>
			<h2 className='text-xl font-bold text-indigo-600 mb-4'>Subscriptions</h2>
			<SubscriptionDisplay />
			{/* Repeat SubscriptionDisplay for each subscription item */}
		</div>
	);
};

export default SubscriptionContainer;

//OG code
//import React from 'react';
// import SubscriptionDisplay from './SubscriptionDisplay.jsx';

// const SubscriptionContainer = () => {
//   return (
//     <div className='border border-indigo-600'>
//       <h1>SubscriptionContainer</h1>
//       <SubscriptionDisplay/>
//     </div>
//   );
// };

// export default SubscriptionContainer;
