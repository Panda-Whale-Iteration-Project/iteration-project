import React, { useState } from 'react';

const UserProfileDropdown = ({ userData }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        onClick={() => setOpen(!open)}
        className='flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-4 py-2 rounded-full text-sm font-medium'
      >
        {/* Changed photoURL to profilePhoto */}
        {userData.authUser.profilePhoto && (
          <img
            src={userData.authUser.profilePhoto}
            alt='Profile'
            className='w-6 h-6 rounded-full object-cover'
          />
        )}
        <span>User Profile</span>
      </button>

      {open && (
        <div className='absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 z-10'>
          {/* Header section with profile picture */}
          <div className='bg-indigo-50 px-6 py-4 border-b border-gray-100'>
            <div className='flex items-center space-x-3'>
              {/* Changed photoURL to profilePhoto */}
              <div className='flex-shrink-0'>
                {userData.authUser.profilePhoto ? (
                  <img
                    src={userData.authUser.profilePhoto}
                    alt='Profile'
                    className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm'
                  />
                ) : (
                  <div className='w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center'>
                    <span className='text-indigo-600 text-lg font-medium'>
                      {userData.authUser.displayName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className='flex-1 min-w-0'>
                <p className='font-semibold text-indigo-900 truncate'>
                  {userData.authUser.displayName}
                </p>
                <p className='text-sm text-gray-600 truncate mt-1'>
                  {userData.authUser.email}
                </p>
              </div>
            </div>
          </div>

          {/* Actions section */}
          <div className='p-4'>
            <button
              className='w-full bg-red-500 text-white py-2 px-4 rounded-md 
                         hover:bg-red-600 transition-colors duration-200 
                         font-medium text-sm flex items-center justify-center 
                         space-x-2 shadow-sm'
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
