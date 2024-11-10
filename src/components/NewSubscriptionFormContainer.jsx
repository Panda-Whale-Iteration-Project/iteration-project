import React from 'react';
import AddNewTitleDisplay from './AddNewTitleDisplay.jsx'
import AddNewFormDisplay from './AddNewFormDisplay.jsx'

const NewSubscriptionFormContainer = ({ closePopup }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 border-indigo-600'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
        {/* Close button */}
        <button
          className='p-2 text-gray-600 border border-indigo-600'
          onClick={closePopup}
        >
          X
        </button>
        {/* The New Subscription Form */}
        <AddNewTitleDisplay />
        <AddNewFormDisplay />
      </div>
    </div>
  );
};

export default NewSubscriptionFormContainer;