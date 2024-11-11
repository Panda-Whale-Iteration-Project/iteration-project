import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';

const SubscriptionDisplay = ({ userData }) => {
	const [subscriptionData, setSubscriptionData] = useState([]);
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
				console.log(
					'subscriptions received back from db:  ',
					data.subscriptions
				);
				setSubscriptionData(data.subscriptions);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchSubscriptionsData();
	}, []);

	return (
		<div className='border border-gray-200 mb-3 rounded flex-column justify-between items-center '>
			{subscriptionData.map((subscription, index) => {
				return (
					<div
						key={index}
						className='border border-bottom-gray200 p-3 '
					>
						<div>
							<h2 className='font-semibold'>
								{subscription.serviceName}
							</h2>
							<p>
								<strong>Category: </strong>{subscription.category}
							</p>
							<p>
								<strong>Amount: </strong>${subscription.amount}
							</p>
							<p>
								<strong>Status: </strong>{subscription.status}
							</p>
							<p>
								<strong>Billing Cycle: </strong>{subscription.billingCycle}
							</p>
						</div>
						<div className='flex space-x-2 mt-2'>
							<button className='text-indigo-600 hover:text-indigo-800'>
								Edit
							</button>
							<button className='text-red-600 hover:text-red-800'>
								Delete
							</button>
							<button className='text-gray-600 hover:text-gray-800'>
								Toggle Notifications
							</button>
						</div>
					</div>
				);
			})}
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
