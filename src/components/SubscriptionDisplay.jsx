import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';

const SubscriptionDisplay = ({ userData, openPopup }) => {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [error, setError] = useState(null);
  const [editingSubscriptionId, setEditingSubscriptionId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    serviceName: '',
    category: '',
    amount: '',
    status: '',
    billingCycle: '',
    nextPaymentDate: '',
    notifyDaysBefore: '',
  });

  useEffect(() => {
    //fetch req for data by id
    const fetchSubscriptionsData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${userData.subscriptionUser._id}`
        );
        if (!response.ok) {
          throw new Error('Unable to fetch User data');
        }
        const data = await response.json();
        console.log(
          'subscriptions received back from db:  ',
          data.subscriptions
        );
        setSubscriptionData(data.subscriptions);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchSubscriptionsData();
  }, []);

  const handleEditClick = (subscription) => {
    setEditingSubscriptionId(subscription._id);
    setEditFormData({
      serviceName: subscription.serviceName,
      category: subscription.category,
      amount: subscription.amount,
      status: subscription.status,
      billingCycle: subscription.billingCycle,
      nextPaymentDate: subscription.nextPaymentDate,
      notifyDaysBefore: subscription.notifyDaysBefore,
    });
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for editing a subscription
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/subscription/${editingSubscriptionId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editFormData),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update subscription');
      }

      const updatedSubscription = await response.json();

      // Update subscription data locally
      setSubscriptionData((prevData) =>
        prevData.map((sub) =>
          sub._id === editingSubscriptionId ? updatedSubscription : sub
        )
      );
      setEditingSubscriptionId(null); // Exit edit mode
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (subscriptionId) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        const response = await fetch(
          `http://localhost:3000/subscription/${subscriptionId}`,
          {
            method: 'DELETE',
          }
        );
        if (!response.ok) {
          throw new Error('Failed to delete subscription');
        }
        setSubscriptionData((prevData) =>
          prevData.filter((sub) => sub._id !== subscriptionId)
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className='border border-gray-200 mb-3 rounded flex-column justify-between items-center '>
      {subscriptionData.map((subscription) => (
        <div
          key={subscription._id}
          className='border border-bottom-gray200 p-3'
        >
          {editingSubscriptionId === subscription._id ? (
            // Display edit form if this subscription is being edited
            <form onSubmit={handleEditSubmit}>
              <input
                type='text'
                name='serviceName'
                value={editFormData.serviceName}
                onChange={handleFormChange}
                placeholder='Service Name'
                className='border p-1'
              />
              <input
                type='text'
                name='category'
                value={editFormData.category}
                onChange={handleFormChange}
                placeholder='Category'
                className='border p-1'
              />
              <input
                type='number'
                name='amount'
                value={editFormData.amount}
                onChange={handleFormChange}
                placeholder='Amount'
                className='border p-1'
              />
              <input
                type='text'
                name='status'
                value={editFormData.status}
                onChange={handleFormChange}
                placeholder='Status'
                className='border p-1'
              />
              <input
                type='text'
                name='billingCycle'
                value={editFormData.billingCycle}
                onChange={handleFormChange}
                placeholder='Billing Cycle'
                className='border p-1'
              />
              <input
                type='date'
                name='nextPaymentDate'
                value={editFormData.nextPaymentDate}
                onChange={handleFormChange}
                className='border p-1'
              />
              <input
                type='number'
                name='notifyDaysBefore'
                value={editFormData.notifyDaysBefore}
                onChange={handleFormChange}
                placeholder='Notify Days Before'
                className='border p-1'
              />
              <button
                type='submit'
                className='text-indigo-600 hover:text-indigo-800'
              >
                Save
              </button>
              <button
                type='button'
                onClick={() => setEditingSubscriptionId(null)}
                className='text-gray-600 hover:text-gray-800'
              >
                Cancel
              </button>
            </form>
          ) : (
            // Display subscription details if not in edit mode
            <>
              <div>
                <h2 className='font-semibold'>{subscription.serviceName}</h2>
                <p>
                  <strong>Category: </strong>
                  {subscription.category}
                </p>
                <p>
                  <strong>Amount: </strong>${subscription.amount}
                </p>
                <p>
                  <strong>Status: </strong>
                  {subscription.status}
                </p>
                <p>
                  <strong>Billing Cycle: </strong>
                  {subscription.billingCycle}
                </p>
                <p>
                  <strong>notifyDaysBefore: </strong>
                  {subscription.notifyDaysBefore}
                </p>
                <p>
                  <strong>nextPaymentDate: </strong>
                  {subscription.nextPaymentDate}
                </p>
              </div>
              <div className='flex space-x-2 mt-2'>
                <button
                  className='text-indigo-600 hover:text-indigo-800'
                  onClick={() => handleEditClick(subscription)}
                >
                  Edit
                </button>
                <button
                  className='text-red-600 hover:text-red-800'
                  onClick={() => handleDelete(subscription._id)}
                >
                  Delete
                </button>
                <button
                  className='text-gray-600 hover:text-gray-800'
                  onClick={openPopup}
                >
                  Toggle Notifications
                </button>
              </div>
            </>
          )}
        </div>
      ))}
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
};

export default SubscriptionDisplay;
