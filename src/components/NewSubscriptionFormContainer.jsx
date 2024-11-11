import React from 'react';
import AddNewTitleDisplay from './AddNewTitleDisplay.jsx'
import AddNewFormDisplay from './AddNewFormDisplay.jsx'

// Pop up container
const NewSubscriptionFormContainer = ({ closePopup, userData }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-65 z-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-1/3'>
        {/* Close button */}
        <button className='p-2 text-gray-600' onClick={closePopup}>
          X
        </button>
        {/* Title and form */}
        <AddNewTitleDisplay />
        <AddNewFormDisplay closePopup={closePopup} userData={userData} />
      </div>
    </div>
  );
};

export default NewSubscriptionFormContainer;