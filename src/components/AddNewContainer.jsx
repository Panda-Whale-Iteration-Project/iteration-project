const AddNewContainer = () => {
	return (
		<button
			className='bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition'
			onClick={() => console.log('Add New Subscription Clicked')}
		>
			Add New Subscription
		</button>
	);
};

export default AddNewContainer;

// import React from 'react';

// const AddNewContainer = () => {
//   return (
//     <div className='border border-indigo-600'>
//       <h1>AddNewContainer</h1>
//     </div>
//   );
// };

// export default AddNewContainer;

// import React from 'react';

// const AddNewContainer = () => (
//   <button className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition">
//     Add New Subscription
//   </button>
// );

// export default AddNewContainer;
