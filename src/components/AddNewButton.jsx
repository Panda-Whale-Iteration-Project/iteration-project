//ADDNEWBUTTON.jsx CODE
import React from 'react';
import { useState } from "react";
import NewSubscriptionFormContainer from "./NewSubscriptionFormContainer";

// Button that opens pop up
// Receives openPopup function 
const AddNewButton = ({ onOpen, label }) => {
  return (
    <button
      className='bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition'
      onClick={onOpen}
    >
      {label}
    </button>
  );
};

export default AddNewButton;
