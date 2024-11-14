import React from 'react';
import { useState, useEffect} from 'react';

const BudgetContainer = ({ userData }) => {
	const [budget, setBudget] = useState(0)
	const [remainingBudget, setRemaingingBudget] = useState(0)
	const [inputValue, setInputValue] = useState('');
	const [total, setTotal] = useState(0);
	const [error, setError] = useState(null);

		useEffect(() => {
			//get req for data by user id
			const fetchSubscriptionsData = async () => {
			  try {
				const response = await fetch(
				  `http://localhost:3000/user/${userData.subscriptionUser._id}`
				);
				if (!response.ok) {
				  throw new Error('Unable to fetch User data');
				}
				const data = await response.json();
				//data sent back 
					// user: res.locals.foundUser,
					// subscriptions: res.locals.subscriptions,
					// trials: res.locals.trials,
					// budget: res.locals.budget,
			

				//loop through the data.subscriptions array to get total amount spent on subscriptions 
				let subTotal = 0; //keep track of subscriptions total
				for (let i = 0; i < data.subscriptions.length; i++){
					subTotal+= data.subscriptions[i].amount
				}
				//update state for total spent on subscriptions
				setTotal(subTotal)

				//get the user budget from the data sent back from the server 
				const userBudget = data.user.budget; 

				//uopdate state for budget 
				setBudget(userBudget)
				//calculate difference between user budget and amoutn they spent on subscriptions
				const remaining = userBudget - subTotal; 
				//update state for remaining budget
				setRemaingingBudget(remaining)
			  } 
			  catch (error) {
				setError(error.message);
			  }
			};
			fetchSubscriptionsData();
		  }, []);

	//update input state
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	  };
	  //update budget state when user clicks update budget button
	const updateBuget = async () => {
		//send a post request to the server to update budget 
		
		const toSend = {
			userId: userData.subscriptionUser._id,
			budget: inputValue,
		};
		try {
			const response = await fetch (`http://localhost:3000/user/${userData.subscriptionUser._id}`,{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json', // Specify JSON content type
				  },
				body: JSON.stringify(toSend),
			});
			if(!response.ok) {
				throw new Error (`Unable to update user's budget`)
			}
			const result= await response.json(); // server sends back updated budget

			setBudget(result.budget) // update budget tate 
			setRemaingingBudget(result.budget - total) //update remaining budget state
		} catch (error) {
			console.error('Error during budget update', error)
		}
		//clear out input field 
		setInputValue('')

	}
	return (
		<div className='bg-green-100 border border-green-500 p-4 rounded shadow-md w-48 text-center'>
			<h2 className='font-bold text-lg text-green-700'>Target Budget</h2>
			<p className='text-2xl font-semibold'>${budget}</p>
			<h2 className='font-bold text-lg text-green-700'>Remaining Budget</h2>
			<p className='text-2xl font-semibold'>${remainingBudget}</p>
			<input 
			className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
			type="text" 
			value={inputValue} 
			onChange={handleInputChange}
			placeholder='$'
			/>
			<button
			className='bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition'
			onClick={updateBuget}>Update Budget</button>
		</div>
	);
};

export default BudgetContainer;
