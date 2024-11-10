// Each subscription’s details will appear here, with edit/delete and notification toggles.

import React from 'react';

const SubscriptionDisplay = () => {
  return (
    <div className="border border-gray-200 p-3 mb-3 rounded flex justify-between items-center">
      <div>
        <h3 className="font-semibold">Service Name</h3>
        <p>$20/month</p>
        <p>Renewal: 01/15/2024</p>
      </div>
      <div className="flex space-x-2">
        <button className="text-indigo-600 hover:text-indigo-800">Edit</button>
        <button className="text-red-600 hover:text-red-800">Delete</button>
        <button className="text-gray-600 hover:text-gray-800">Toggle Notifications</button>
      </div>
    </div>
  );
};

export default SubscriptionDisplay;


// import React from 'react';

// const SubscriptionDisplay = () => {
//   return (
//     <div className='border border-indigo-600'>
//       <h1>SubscriptionDisplay</h1>
//     </div>
//   );
// };

// export default SubscriptionDisplay;
