//This component will display the user’s remaining budget and serve as a visual indicator.
import React from 'react';

const BudgetContainer = () => {
	const remainingBudget = 200; // Placeholder budget amount

	return (
		<div className='bg-green-100 border border-green-500 p-4 rounded shadow-md w-48 text-center'>
			<h2 className='font-bold text-lg text-green-700'>Remaining Budget</h2>
			<p className='text-2xl font-semibold'>${remainingBudget}</p>
		</div>
	);
};

export default BudgetContainer;
