import React from 'react';
import { useState } from 'react';
import CategoryDropDownMenu from './CategoryDropDownMenu';
import NotificationsDropDownMenu from './NotificationsDropDownMenu';

const AddNewTrialFormDisplay = ({ closePopup, userData }) => {
  // STATE INFO AND FUNCTIONS FOR CATEGORIES DROP DOWN MENU
  // DropDownVisibility determines if category drop down menu renders
  // DropDownSelection determines what text is populated based on category selection
  const [dropDownVisibility, setDropDownVisibility] = useState(false);
  const [dropDownSelection, setDropDownSelection] = useState('Select one');

  // Toggle if category menu renders or not on button click
  const toggleDropDown = () => {
    setDropDownVisibility((previousState) => !previousState);
    closeNotificationDropDown();
  };

  // Pass function down to the drop down menu to close upon selection
  const closeDropDown = () => {
    setDropDownVisibility(false);
  };

  // STATE INFO AND FUNCTIONS FOR NOTIFICATIONS TOGGLE AND DROP DOWN MENU
  // NotificationsVisibility determines if notification options render
  // NotificationsDropDownVisibility determines if notifications drop down menu renders
  // notificationSelection determines what text is populated based on category selection
  const [notificationsVisibility, setNotificationsVisibility] = useState(false);
  const [notificationsDropDownVisibility, setnotificationsDropDownVisibility] =
    useState(false);
  const [notificationSelection, setNotificationSelection] =
    useState('Select one');

  // Toggle if notif options renders or not depending on if toggle is checked
  // Also sets notif bool in form state
  const toggleNotificationVisibility = () => {
    setNotificationsVisibility((previousState) => !previousState);
    setFormData((prevState) => ({
      ...prevState,
      notifications: !notificationsVisibility, // Toggle notifications field
    }));
  };

  // Toggle if notif date menu renders or not on button click
  const toggleNotificationsDropDown = () => {
    setnotificationsDropDownVisibility((previousState) => !previousState);
    closeDropDown();
  };

  // Pass this function to the notif drop down menu to close when a selection is made
  const closeNotificationDropDown = () => {
    setnotificationsDropDownVisibility(false);
  };

  // STATE INFO AND FUNCTIONS FOR FORM DATA
  // State for form data

  // Mark: make sure the labels are consistent throughout all files
  const [formData, setFormData] = useState({
    userId: '',
    trialName: '',
    expDate: '',
    notifyDate: '',
    subCost: 0,
    category: '',
    details: '',
  });

  // Update form state as input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // REQUIRED FIELDS: trialName, expDate, notifyDate/notifyDaysBefore,
  // OPTIONAL FIELDS: subCost, category, details
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.trialName ||
      !formData.expDate ||
      !formData.notifyDate ||
      (notificationsVisibility && notificationSelection == 'Select one')
    ) {
      alert('Please fill out required fields');
    } else {
      const toSend = {
        userId: userData.trialUser._id,
        trialName: formData.trialName,
        subCost: parseInt(formData.subCost),
        status: 'Active',
        details: formData.details,
        category:
          dropDownSelection != 'Select one' ? dropDownSelection : 'Other',
        expDate: formData.expDate,
        // notifyDate: formData.notifyDate,
        notifyDaysBefore: notificationsVisibility
          ? parseInt(notificationSelection)
          : '',
      };
      console.log(
        'Attempting to send new Trial to backend. Info submitted: ',
        toSend
      );

      // Send post request to backend with form state as body

      // Use async/await:
      try {
        const response = await fetch('http://localhost:3000/trial', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(toSend),
        });
        const data = await response.json();

        if (!response.ok) {
          `Server responded with a status ${response.status}: ${JSON.stringify(data)}`;
        }

        console.log(data);
      } catch (err) {
        console.error('Error occurred while adding new trial: ', err.message);
      }
      closePopup();
    }

    closePopup();
  };

  return (
    <div className='flex justify-center items-center p-10'>
      <form className='w-full max-w-sm relative' onSubmit={handleSubmit}>
        {/* FIRST ROW OF ELEMENTS */}
        <div className='flex flex-wrap -mx-3 mb-6'>
          {/* SERVICE NAME TEXT BOX */}
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
              Trial Name
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              name='trialName'
              type='text'
              onChange={handleInputChange}
              autoComplete='off'
            ></input>

            <p className='text-gray-500 text-xs italic'>
              Please fill out this field.
            </p>
          </div>

          {/* PAYMENT DATE TEXT BOX */}
          <div className='w-full md:w-1/2 px-3'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
              Expiration Date
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              name='expDate'
              type='date'
              onChange={handleInputChange}
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
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
              Trial Cost (If Any)
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              name='subcost'
              type='number'
              onChange={handleInputChange}
            ></input>
            <p className='text-gray-600 text-xs italic'>
              Please fill out this field.
            </p>
          </div>

          {/* SUBCRIPTION CATEGORY */}
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
              Category
            </label>

            {/* SUBCRIPTION CATEGORY BUTTON*/}
            <div className='relative'>
              <button
                type='button'
                className='inline-flex w-full justify-center gap-x-1.5 rounded appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-500 py-3 px-1 mb-3 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:border-gray-500 focus:bg-white'
                name='subscriptionCategory'
                aria-expanded='true'
                aria-haspopup='true'
                onClick={toggleDropDown}
              >
                {dropDownSelection}
                {/* Little carrot icon on the right */}
                <svg
                  className='-mr-1 h-5 w-5 text-gray-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  data-slot='icon'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>

              {/* DROP DOWN MENU - VISIBILITY IS CONDITIONAL */}
              {dropDownVisibility && (
                <div className='absolute'>
                  <CategoryDropDownMenu
                    closeDropDown={closeDropDown}
                    setDropDownSelection={setDropDownSelection}
                  />
                </div>
              )}
              <p className='text-gray-600 text-xs italic'>Optional.</p>
            </div>
          </div>
        </div>

        {/* THIRD ROW OF ELEMENTS */}
        <div className='flex flex-wrap -mx-3 mb-6'>
          {/* DETAILS TEXT BOX */}
          <div className='w-full md:full px-3 mb-6 md:mb-0'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
              Details
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              name='details'
              type='text'
              onChange={handleInputChange}
              autoComplete='off'
            ></input>
            <p className='text-gray-600 text-xs italic'>Optional.</p>
          </div>
        </div>

        {/* FOURTH ROW OF ELEMENTS */}
        <div className='flex flex-wrap -mx-3 mb-6'>
          {/* NOTIFICATIONS TOGGLE */}
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                checked={notificationsVisibility}
                name='notifications'
                onChange={toggleNotificationVisibility}
              ></input>
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
              <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Notifications
              </span>
            </label>
          </div>
        </div>

        {/* OPTIONAL FIFTH ROW OF ELEMENTS, VISIBILITY DEPENDS ON NOTIFICATION TOGGLE*/}
        {notificationsVisibility && (
          <div className='flex flex-wrap -mx-3 mb-6'>
            {/* NOTIFICATION FREQUENCY/REMINDER DATE */}
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Reminder date
              </label>

              {/* NOTIFICATION FREQUENCY BUTTON*/}
              <div className='relative'>
                <button
                  type='button'
                  className='inline-flex w-full justify-center gap-x-1.5 rounded appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-500 py-3 px-1 mb-3 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:border-gray-500 focus:bg-white'
                  name='notificationFrequency'
                  aria-expanded='true'
                  aria-haspopup='true'
                  onClick={toggleNotificationsDropDown}
                >
                  {notificationSelection}
                  {/* Little carrot icon on the right */}
                  <svg
                    className='-mr-1 h-5 w-5 text-gray-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                    data-slot='icon'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>

                {/* DROP DOWN MENU - VISIBILITY IS CONDITIONAL */}
                {notificationsDropDownVisibility && (
                  <div className='absolute'>
                    <NotificationsDropDownMenu
                      closeDropDown={closeNotificationDropDown}
                      setDropDownSelection={setNotificationSelection}
                    />
                  </div>
                )}
                <p className='text-gray-600 text-xs italic'>
                  Please fill out this field.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <div className='flex mt-auto justify-end'>
          <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-6 rounded shadow hover:bg-blue-600'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewTrialFormDisplay;
