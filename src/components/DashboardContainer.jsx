// serve as the main container, displaying the user’s subscriptions, trials, budget, and profile info.
import React, { useEffect, useState } from 'react';
import SubscriptionContainer from './SubscriptionContainer.jsx';
import TrialContainer from './TrialContainer.jsx';
import BudgetContainer from './BudgetContainer.jsx';
import AddNewContainer from './AddNewContainer.jsx';
import AddNewButton from './AddNewButton.jsx';
import AddTrialButton from './AddTrialButton.jsx';
import UserProfileDropdown from './UserProfileDropdown.jsx';
import Icony from './Icony.jsx';
import NewSubscriptionFormContainer from './NewSubscriptionFormContainer.jsx';

const DashboardContainer = ({ userData }) => {
  // State and functions to open/close popup
  const [PopUpVisibility, setPopUpVisibility] = useState(false);
  // State to identify form type - set to 'Subscription' or 'Trial' via 'AddNewButton'
  const [formType, setFormType] = useState('none');

  // (WIP) Might use this later to customize 'AddNewButton' and the displayed form
  // const handleAddNewButtonClick = (label) => {
  //   console.log('label', label);
  //   console.log('form type', formType);
  //   label === 'Subscription'
  //     ? setFormType('Subscription')
  //     : setFormType('Trial');
  //   console.log('form type after setting', formType);
  //   openPopup();
  // };

  const openPopup = () => {
    setPopUpVisibility(true);
  };

  const closePopup = () => {
    setPopUpVisibility(false);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         'http://localhost:3000/user/673180385659763608645a3f'
  //       );
  //       const data = await response.json();
  //       //setsubscriptions data
  //     } catch (error) {
  //       console.error('Error fetching subscriptions:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className='flex flex-col items-center bg-gray-100 min-h-screen p-4'>
      {/* Header with Icon and User Info */}
      <header className='w-full flex justify-between items-center bg-white p-4 rounded shadow-md'>
        <Icony />
        <h1 className='text-2xl font-bold text-indigo-600'>
          SAVING YOU AN ARM & A TAIL
        </h1>
        <UserProfileDropdown userData={userData} />
      </header>

      {/* Budget and Add Subscription Button */}
      <div className='w-full flex justify-between items-center mt-4'>
        <BudgetContainer />

        {/* Conditionally Render the Popup */}
        {PopUpVisibility && (
          <div>
            <NewSubscriptionFormContainer
              closePopup={closePopup}
              userData={userData}
            />
          </div>
        )}
      </div>

      {/* Subscription and Trial Lists */}
      <div className='w-full flex flex-col gap-4 mt-6'>
        <div className='flex flex-col flex-grow lg:flex-50 min-w-0'>
          <AddNewButton onOpen={openPopup} label='Add New Subscription' />
          <SubscriptionContainer userData={userData} />
        </div>

        <div className='flex-grow min-w-0'>
          <AddNewButton onOpen={openPopup} label='Add New Free Trial' />
          <TrialContainer />
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;

// // OG Code
// // import React from 'react';
// // import TrialContainer from './TrialContainer.jsx';
// // import SubscriptionContainer from './SubscriptionContainer.jsx';
// // import AddNewContainer from './AddNewContainer.jsx';

// // const DashboardContainer = () => {
// //   return (
// //     <div className='border border-indigo-600'>
// //       <h1>DashboardContainer</h1>
// //       <AddNewContainer />
// //       <SubscriptionContainer />
// //       <TrialContainer />
// //     </div>
// //   );
// // };

// // export default DashboardContainer;
