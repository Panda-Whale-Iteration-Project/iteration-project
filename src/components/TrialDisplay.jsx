//The TrialContainer will list all trials, 
// while each TrialDisplay will render the details for each free trial, similar to SubscriptionDisplay.

import React from 'react';

const TrialDisplay = () => {
	return (
		<div className='border border-gray-200 p-3 mb-3 rounded flex justify-between items-center'>
			<div>
				<h3 className='font-semibold'>Trial Service Name</h3>
				<p>Expires: 01/10/2024</p>
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

export default TrialDisplay;

// import React from 'react';

// const TrialDisplay = () => {
//   return (
//     <div className='border border-indigo-600'>
//       <h1>TrialDisplay</h1>
//     </div>
//   );
// };

// export default TrialDisplay;
