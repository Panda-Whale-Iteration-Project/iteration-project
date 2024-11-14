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
				setTrialData();

			} catch (error) {
				setError(error.message);
			}
		}
		fetchTrialsData();
	}, [])

	const handleEditClick = (id) => {
    // Logic for handling edit click
    console.log("Edit subscription with ID:", id);
  };

  const handleDeleteClick = (id) => {
    // Logic for handling delete click
    console.log("Delete subscription with ID:", id);
  };

	const columns = [
    { field: 'trialName', headerName: 'Service Name', width: 120},
    { field: 'category', headerName: 'Category', width: 120 },
		{ field: 'amount', headerName: 'Amount ($)', width: 120 },
		{ field: 'expDate', headerName: 'Expire Date', width: 120 },
		{ field: 'category', headerName: 'Category', width: 120 },
		{ field: 'detail', headerName: 'More details', width: 120 },
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
			<DataGrid 
				rows={trialData}
				columns={columns}
			/>
		</div>
	)
}

export default TrialDisplayRearrange;