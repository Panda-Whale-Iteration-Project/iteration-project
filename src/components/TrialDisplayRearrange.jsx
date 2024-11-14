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
				)
			} catch (error) {

			}
		}
	})

	const columns = [
    { field: 'trialName', headerName: 'Service Name', width: 120},
    { field: 'category', headerName: 'Category', width: 120 },
	]

	return (
		<div style={{ height: 400, width: '100%' }}>

		</div>
	)
}