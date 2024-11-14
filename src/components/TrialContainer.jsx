// The TrialContainer will list all trials,
// while each TrialDisplay will render the details for each free trial, similar to SubscriptionDisplay.


import React from 'react';
import TrialDisplay from './TrialDisplay.jsx';

const TrialContainer = () => {
	return (
		<div className='bg-white w-full md:w-1/2 p-4 rounded shadow-md'>
			<h2 className='text-xl font-bold text-indigo-600 mb-4'>Free Trials</h2>
			<TrialDisplay />
			{/* Repeat TrialDisplay for each trial item */}
		</div>
	);
};

export default TrialContainer;

