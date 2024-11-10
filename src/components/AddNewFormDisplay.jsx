import React from 'react';

const AddNewFormDisplay = () => {
  return (
    <div className='border border-indigo-600 flex justify-center items-center p-10'>
      <form className='w-full max-w-sm'>
        {/* FIRST ROW OF ELEMENTS */}
        <div className='flex flex-wrap -mx-3 mb-6'>
          {/* SERVICE NAME TEXT BOX */}
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='service-name'
            >
              Service Name
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='grid-first-name'
              type='text'
            ></input>

            <p className='text-gray-500 text-xs italic'>
              Please fill out this field.
            </p>
          </div>

          {/* PAYMENT DATE TEXT BOX */}
          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='payment-date'
            >
              Payment Date
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='payment-date'
              type='date'
            ></input>
            <p className='text-gray-500 text-xs italic'>
              Please fill out this field.
            </p>
          </div>
        </div>

        {/* SECOND ROW OF ELEMENTS */}
        <div className='flex flex-wrap -mx-3 mb-6'>
          {/* PAYMENT AMOUNT TEXT BOX */}
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='payment-amount'
            >
              Subscription Amount
            </label>
            <input
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              id='grid-password'
              type='number'
            ></input>
            <p class='text-gray-600 text-xs italic'>
              Please fill out this field.
            </p>
          </div>

          {/* SUBCRIPTION CATEGORY */}

          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='payment-amount'
            >
              Subscription Category
            </label>

            {/* SUBCRIPTION CATEGORY DROPDOWN*/}
              <div>
                <button
                  type='button'
                  // appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500
                  // inline-flex w-full justify-center gap-x-1.5 rounded-md appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 mb-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:border-gray-500 focus:bg-white
                  class='inline-flex w-full justify-center gap-x-1.5 rounded appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 py-3 px-14 mb-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:border-gray-500 focus:bg-white'
                  id='menu-button'
                  aria-expanded='true'
                  aria-haspopup='true'
                >
                  Options
                  <svg
                    class='-mr-1 h-5 w-5 text-gray-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                    data-slot='icon'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
                      clip-rule='evenodd'
                    />
                  </svg>
                </button>

              {/* <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}
              <div
                class='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='menu-button'
                tabindex='-1'
              >
                <div class='py-1' role='none'>
                  {/* <!-- Active: "bg-gray-100 text-gray-900 outline-none", Not Active: "text-gray-700" --> */}
                  <a
                    href='#'
                    class='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabindex='-1'
                    id='menu-item-0'
                  >
                    Account settings
                  </a>
                  <a
                    href='#'
                    class='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabindex='-1'
                    id='menu-item-1'
                  >
                    Support
                  </a>
                  <a
                    href='#'
                    class='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabindex='-1'
                    id='menu-item-2'
                  >
                    License
                  </a>
                  <form method='POST' action='#' role='none'>
                    <button
                      type='submit'
                      class='block w-full px-4 py-2 text-left text-sm text-gray-700'
                      role='menuitem'
                      tabindex='-1'
                      id='menu-item-3'
                    >
                      Sign out
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* CATEGORY DROPDOWN MENU */}
        </div>
      </form>
    </div>
  );
};

export default AddNewFormDisplay;

/*
NOTIFICATION TOGGLE
          <label class='inline-flex items-center cursor-pointer w-full md:w-1/2 px-3'>
            <input type='checkbox' value='' class='sr-only peer'></input>
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Toggle me
            </span>
          </label>

          NOTIFICATION DATE
          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='payment-date'
            >
              Notification Date
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='payment-date'
              type='date'
            ></input>
            <p className='text-gray-500 text-xs italic'>
              Please fill out this field.
            </p>
          </div>

          */