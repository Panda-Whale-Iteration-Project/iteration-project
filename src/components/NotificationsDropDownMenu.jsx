import React from 'react';
import { useState, useEffect } from 'react';

const NotificationsDropDownMenu = ({ closeDropDown, setDropDownSelection }) => {
  // Function to send state back to addNewFormDisplay with selection and menu visibility status
  const handleClick = (selection) => {
    closeDropDown();
    setDropDownSelection(selection);
  };

  return (
    <div>
      <div
        className='right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto max-h-20'
        aria-orientation='vertical'
        aria-labelledby='menu-button'
        tabIndex='-1'
      >
        <div className='py-1 ' role='none'>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='healthAndFitness'
            onClick={() => handleClick('1 day before')}
          >
            1 day before
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='wellness'
            onClick={() => handleClick('2 days before')}
          >
            2 days before
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='hobbies'
            onClick={() => handleClick('3 days before')}
          >
            3 days before
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='social'
            onClick={() => handleClick('1 week before')}
          >
            7 days before
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotificationsDropDownMenu;
