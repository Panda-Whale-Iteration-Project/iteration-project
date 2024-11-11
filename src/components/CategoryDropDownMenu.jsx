import React from 'react';
import { useState,useEffect } from 'react';

const CategoryDropDownMenu = ({ closeDropDown, setDropDownSelection }) => {
  // Function to send state back to addNewFormDisplay with selection and menu visibility status
  const handleClick = (selection) => {
    closeDropDown();
    setDropDownSelection(selection);
  };

  return (
    <div>
      <div
        className='right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
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
            onClick={() => handleClick('Health and wellness')}
          >
            Health and wellness
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='wellness'
            onClick={() => handleClick('Streaming services')}
          >
            Streaming services
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='hobbies'
            onClick={() => handleClick('News and magazines')}
          >
            News and magazines
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='social'
            onClick={() => handleClick('Misc')}
          >
            Misc.
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropDownMenu;
