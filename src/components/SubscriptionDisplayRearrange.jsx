import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const SubscriptionDisplayRearrange = ({ userData }) => {

  const [subscriptionData, setSubscriptionData] = useState([]);
  const [error, setError] = useState(null);

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
      } catch (error) {
        setError(error.message);
      }
    };
    fetchSubscriptionsData();
  }, [userData.subscriptionUser._id]);

  const handleEditClick = (id) => {
    // Logic for handling edit click
    console.log("Edit subscription with ID:", id);
  };

  const handleDeleteClick = (id) => {
    // Logic for handling delete click
    console.log("Delete subscription with ID:", id);
  };

  const columns = [
    { field: 'serviceName', headerName: 'Service Name', width: 120},
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
          <Button
            color="primary"
            onClick={() => handleEditClick(params.id)}
          >
            Edit
          </Button>
          <Button
            color="secondary"
            onClick={() => handleDeleteClick(params.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      {error && <p className="error">{error}</p>}
      <DataGrid
        rows={subscriptionData}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={1}
        rowsPerPageOptions={[1, 5, 10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default SubscriptionDisplayRearrange;
