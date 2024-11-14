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
  const [subsData, setSubsData] = useState([]);
  // State to identify form type - set to 'Subscription' or 'Trial' via 'AddNewButton'
  const [formType, setFormType] = useState('none');

  const openPopup = () => {
    setPopUpVisibility(true);
  };

  const closePopup = () => {
    setPopUpVisibility(false);
  };

  useEffect(() => {
    const fetchSubscriptionsData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${userData.subscriptionUser._id}`
        );
        if (!response.ok) {
          throw new Error('Unable to fetch User data');
        }
        const data = await response.json();
        setSubsData(data.subscriptions); // Initial load of subscriptions from backend
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };
  
    fetchSubscriptionsData();
  }, [userData.subscriptionUser._id]);


  const refreshSubscriptions = (newSubscription) => {
    setSubsData((prevData) => [...prevData, newSubscription]);
  };

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
        <BudgetContainer userData={userData} />
        {/* <AddNewButton onOpen={openPopup} /> */}

        {/* Conditionally Render the Popup */}
        {PopUpVisibility && (
          <div>
            <NewSubscriptionFormContainer
              closePopup={closePopup}
              userData={userData}
              refreshSubscriptions={refreshSubscriptions}
            />
          </div>
        )}
      </div>

      {/* Subscription and Trial Lists */}
      <div className='w-full flex flex-col gap-4 mt-6'>
        <div className='flex flex-col flex-grow lg:flex-50 min-w-0'>
          <AddNewButton onOpen={openPopup} label='Add New Subscription' />
          <SubscriptionContainer
            userData={userData}
            subsData={subsData}
            setSubsData={setSubsData}
          />
        </div>

        <div className='flex flex-col flex-grow lg:flex-50 min-w-0'>
          <AddNewButton onOpen={openPopup} label='Add New Free Trial' />
          <TrialContainer userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
