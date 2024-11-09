import React from 'react';
import TrialContainer from './TrialContainer.jsx';
import SubscriptionContainer from './SubscriptionContainer.jsx';
import AddNewContainer from './AddNewContainer.jsx';



const DashboardContainer = () => {
  return (
    <div className='border border-indigo-600'>
      <h1>DashboardContainer</h1>
      <AddNewContainer />
      <SubscriptionContainer />
      <TrialContainer />
    </div>
  );
};

export default DashboardContainer;