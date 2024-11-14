//The container lists all active subscriptions with options to edit, delete, or toggle notifications.
//SubscriptionDisplay.jsx will be used to render each individual subscription.
import React from 'react';
// import SubscriptionDisplay from './SubscriptionDisplay.jsx';
import SubscriptionDisplayRearrange from './SubscriptionDisplayRearrange.jsx';

const SubscriptionContainer = ({ userData }) => {
  return (
    <div className='bg-white w-full p-4 rounded shadow-md'>
      <h2 className='text-xl font-bold text-indigo-600 mb-4'>Subscriptions</h2>
      {/* <SubscriptionDisplay userData={userData} />  */}
      <SubscriptionDisplayRearrange userData={userData} />
      {/* Repeat SubscriptionDisplay for each subscription item */}
    </div>
  );
};

export default SubscriptionContainer;

// const SubscriptionContainer = ({ userData }) => {
// 	return (
// 		<div className='bg-white w-full md:w-1/2 p-4 rounded shadow-md'>
// 			<h2 className='text-xl font-bold text-indigo-600 mb-4'>Subscriptions</h2>
// 			{userData && userData.length > 0 ? (
// 				userData.map((subscription, index) => (
// 					<SubscriptionDisplay
// 						key={index}
// 						subscription={subscription}
// 					/>
// 				))
// 			) : (
// 				<p className='text-gray-600'>No subscriptions available.</p>
// 			)}
// 		</div>
// 	);
// };

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
