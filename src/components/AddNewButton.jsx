import { useState } from "react";
import NewSubscriptionFormContainer from "./NewSubscriptionFormContainer";

// Button that opens pop up
// Receives openPopup function 
const AddNewButton = ({ onOpen }) => {
  return (
    <button
      className='bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition'
      onClick={onOpen}
    >
      Add New Subscription
    </button>
  );
};

export default AddNewButton;
