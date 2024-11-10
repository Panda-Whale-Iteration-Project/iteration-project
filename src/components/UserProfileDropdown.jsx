//This component will hold the user’s profile information (Name, Email, Phone) and a logout button.
import React, { useState } from 'react';

const UserProfileDropdown = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className='relative'>
			<button
				onClick={() => setOpen(!open)}
				className='flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-full'
			>
				<span>User Profile</span>
			</button>

			{open && (
				<div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-10'>
					<p className='font-semibold'>Name: Jane Doe</p>
					<p>Email: jane.doe@example.com</p>
					<p>Phone: (123) 456-7890</p>
					<button className='w-full bg-red-500 text-white mt-4 py-2 rounded hover:bg-red-600'>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default UserProfileDropdown;
