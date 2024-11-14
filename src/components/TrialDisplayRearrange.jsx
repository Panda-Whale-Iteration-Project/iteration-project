import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const TrialDisplayRearrange = ({ userData }) => {
	const [trialData, setTrialData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTrialsData = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/user/${userData.subscriptionUser._id}`
				);

				if (!response.ok) {
					throw new Error('Unable to fetch data');
				}
				const data = await response.json();
				console.log('trials data', data.trials)
				setTrialData(data.trials);
				
			} catch (error) {
				setError(error.message);
			}
		}
		fetchTrialsData();
	}, [userData.subscriptionUser._id]);

	const handleEditClick = (id) => {
    // Logic for handling edit click
    console.log("Edit trial with ID:", id);
  };

  const handleDeleteClick = (id) => {
    // Logic for handling delete click
    console.log("Delete trial with ID:", id);
  };

	const columns = [
    { field: 'trialName', headerName: 'Service Name', width: 120},
    { field: 'category', headerName: 'Category', width: 120 },
		{ field: 'amount', headerName: 'Amount ($)', type: 'number', width: 120 },
		{ field: 'status', headerName: 'Status', type: 'number', width: 120 },
		{ field: 'expDate', headerName: 'Expire Date', width: 120 },
		{ field: 'detail', headerName: 'More details', width: 150 },
		{ field: 'action', headerName: 'Action', width: 120,
			rederCell: (params) => (
				<div>
					<Button color="primary" onClick={() => handleEditClick(params.id)}>
						Edit
					</Button>
					<Button color="secondary" onClick={() => handleDeleteClick(params.id)}>
						Delete
					</Button>
				</div>
			),
		},
	]

	return (
		<div style={{ height: 400, width: '100%' }}>
			{error && <p className='error'>{error}</p>}
			<DataGrid 
				rows={trialData}
				columns={columns}
				getRowId={(row) => row._id}
        pageSize={1}
        rowsPerPageOptions={[1, 5, 10]}
        checkboxSelection
        disableSelectionOnClick
			/>
		</div>
	)
}

export default TrialDisplayRearrange;