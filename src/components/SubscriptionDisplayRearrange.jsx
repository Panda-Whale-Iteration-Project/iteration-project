import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const SubscriptionDisplayRearrange = ({ userData }) => {
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchSubscriptionsData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${userData.subscriptionUser._id}`
        );
        if (!response.ok) {
          throw new Error('Unable to fetch User data');
        }
        const data = await response.json();
        setSubscriptionData(data.subscriptions);
				console.log("data subscriptions: ", data.subscriptions)
      } catch (error) {
        setError(error.message);
      }
    };
    fetchSubscriptionsData();
  }, [userData.subscriptionUser._id]);

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
    console.log('Subscription: ', subscription.nextPaymentDate);
    console.log('Edit Form Data: ', editFormData.nextPaymentDate);
    setOpen(true);
  };
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
      setOpen(false);
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
  const handleFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const columns = [
    { field: 'serviceName', headerName: 'Service Name', width: 120 },
    { field: 'category', headerName: 'Category', width: 120 },
    {
      field: 'amount',
      headerName: 'Amount ($)',
      type: 'number',
      width: 90,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 90,
      valueOptions: ['Active', 'Inactive'],
    },
    {
      field: 'billingCycle',
      headerName: 'Billing Cycle',
      width: 120,
      valueOptions: ['Monthly', 'Yearly', 'Weekly'],
    },
    {
      field: 'nextPaymentDate',
      headerName: 'Next Payment Date',
      type: 'date',
      width: 150,
      valueGetter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : '',
    },
    {
      field: 'notifyDaysBefore',
      headerName: 'Notify Days Before',
      type: 'number',
      width: 140,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button color='primary' onClick={() => handleEditClick(params.row)}>
            Edit
          </Button>
          <Button color='secondary' onClick={() => handleDelete(params.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      {error && <p className='error'>{error}</p>}
      <DataGrid
        rows={subscriptionData}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={1}
        rowsPerPageOptions={[1, 5, 10]}
        checkboxSelection
        disableSelectionOnClick
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Subscription</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            <TextField
              name='serviceName'
              label='Service Name'
              value={editFormData.serviceName}
              onChange={handleFormChange}
              fullWidth
              margin='dense'
            />
            <TextField
              name='category'
              label='Category'
              value={editFormData.category}
              onChange={handleFormChange}
              fullWidth
              margin='dense'
            />
            <TextField
              name='amount'
              label='Amount'
              type='number'
              value={editFormData.amount}
              onChange={handleFormChange}
              fullWidth
              margin='dense'
            />
            <TextField
              name='status'
              label='Status'
              value={editFormData.status}
              onChange={handleFormChange}
              fullWidth
              margin='dense'
            />
            <TextField
              name='billingCycle'
              label='Billing Cycle'
              value={editFormData.billingCycle}
              onChange={handleFormChange}
              fullWidth
              margin='dense'
            />
            <TextField
              name='nextPaymentDate'
              label='Next Payment Date'
              type='date'
              value={editFormData.nextPaymentDate}
              onChange={handleFormChange}
              fullWidth
              margin='dense'
            />
            <TextField
              name='notifyDaysBefore'
              label='Notify Days Before'
              type='number'
              value={editFormData.notifyDaysBefore}
              onChange={handleFormChange}
              fullWidth
              margin='dense'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color='secondary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default SubscriptionDisplayRearrange;
