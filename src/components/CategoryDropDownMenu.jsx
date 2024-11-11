import React from 'react';
import { useState, useEffect } from 'react';

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
            onClick={() => handleClick('Entertainment')}
          >
            Entertainment
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='wellness'
            onClick={() => handleClick('Productivity')}
          >
            Productivity
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='hobbies'
            onClick={() => handleClick('Utilities')}
          >
            Utilities
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='social'
            onClick={() => handleClick('Gaming')}
          >
            Gaming
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='social'
            onClick={() => handleClick('Education')}
          >
            Education
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='social'
            onClick={() => handleClick('Health and fitness')}
          >
            Health and fitness
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='social'
            onClick={() => handleClick('News and media')}
          >
            News and media
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='social'
            onClick={() => handleClick('Shopping')}
          >
            Shopping
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='social'
            onClick={() => handleClick('Social media')}
          >
            Social media
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='social'
            onClick={() => handleClick('Security')}
          >
            Security
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='social'
            onClick={() => handleClick('Food delivery')}
          >
            Food delivery
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='social'
            onClick={() => handleClick('Storage')}
          >
            Storage
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            tabIndex='-1'
            id='social'
            onClick={() => handleClick('Other')}
          >
            Other
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropDownMenu;
