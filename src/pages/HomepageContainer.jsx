import React from 'react';
import DashboardContainer from '../components/DashboardContainer.jsx';

const HomepageContainer = () => {
	return (
		<div className='border border-indigo-600'>
			{/* <TitleDisplay /> */}
			<DashboardContainer />
		</div>
	);
};

const TitleDisplay = () => {
	return (
		<div className='border border-indigo-600'>
			<h1 className='mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl'>
				<span className='text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-red-900	'>
					ArmaDollar Saver
				</span>
			</h1>
		</div>
	);
};

export default HomepageContainer;
