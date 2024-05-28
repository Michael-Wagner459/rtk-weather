'use client';
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const ROOT_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}${units}`
const apiKey = process.env.WEATHER_API_KEY;
const units = '&units=imperial';

export const fetchWeather = createAsyncThunk(
	'cities/fetchWeather',
	async () => {
		const response = await axios.get(
			`${ROOT_URL}${cityName}&appid=${apiKey}${units}`
		);
		return response.data;
	}
);

export const citiesSlice = createSlice({
	name: 'cities',
	initialState: {
		cities: [
			{
				cityName: 'Austin',
				temp: [45, 78, 99, 54, 67],
				pressure: [22, 33, 55, 66, 32],
				humidity: [80, 85, 100, 90, 65],
			},
			{
				cityName: 'Dallas',
				temp: [45, 78, 99, 54, 67],
				pressure: [22, 33, 55, 66, 32],
				humidity: [80, 85, 100, 90, 65],
			},
		],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeather.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchWeather.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.cities = action.payload;
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default citiesSlice.reducer;
