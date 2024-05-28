'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../store/slices/cities';

export default function CitySearch() {
	//setting up useState and Dispatch
	const dispatch = useDispatch();
	const [city, setCity] = useState('');
	//submit button function that requests API and formats API and sets useState back to ''
	const handleFormSubmit = (event) => {
		event.preventDefault();
		dispatch(fetchWeather(city));
		setCity('');
	};
	//UI for the Submit form area with submit button
	return (
		<form onSubmit={handleFormSubmit}>
			<div className='col-6 offset-3'>
				<label>Enter City Name</label>
				<input
					className='form-control'
					value={city}
					onChange={(event) => setCity(event.target.value)}
				></input>
				<br />
				<button className='btn btn-primary' type='submit'>
					Submit
				</button>
			</div>
		</form>
	);
}
