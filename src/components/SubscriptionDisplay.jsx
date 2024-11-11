import React, { useEffect, useState } from 'react';

const SubscriptionDisplay = ({ userData }) => {
	const [subscriptionData, setSubscriptionData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		//fetch req for data by id
		const fetchSubscriptionsData = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/user/${userData.subscriptionUser._id}`
				);
				if (!response.ok) {
					throw new Error('Unable to fetch User data');
				}
				const data = await response.json();
				setSubscriptionData(data.subscriptions);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchSubscriptionsData();
	}, []);

	console.log(subscriptionData);
  
	return (
		<div className='border border-gray-200 p-3 mb-3 rounded flex justify-between items-center'>
			<div>
				<h3 className='font-semibold'>Service Name</h3>
				<p>$20/month</p>
				<p>Renewal: 01/15/2024</p>
			</div>
			<div className='flex space-x-2'>
				<button className='text-indigo-600 hover:text-indigo-800'>Edit</button>
				<button className='text-red-600 hover:text-red-800'>Delete</button>
				<button className='text-gray-600 hover:text-gray-800'>
					Toggle Notifications
				</button>
			</div>
		</div>
	);
};

export default SubscriptionDisplay;

//OG code
//import React from 'react';

// const SubscriptionDisplay = () => {
//   return (
//     <div className='border border-indigo-600'>
//       <h1>SubscriptionDisplay</h1>
//     </div>
//   );
// };

// export default SubscriptionDisplay;
