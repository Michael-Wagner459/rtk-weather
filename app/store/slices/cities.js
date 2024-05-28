'use client';
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//api information
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?q=`;
const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
//changes units from api into Imperial
const units = '&units=imperial';

//function to format data from the api request then turn it into an object to be able to push in the state
const processWeatherData = (data, cityName) => {
	//make obj format
	const cityObj = { cityName: null, temp: [], pressure: [], humidity: [] };

	const result = data.list.reduce((accumulator, item) => {
		accumulator.temp.push(item.main.temp);
		accumulator.pressure.push(item.main.pressure);
		accumulator.humidity.push(item.main.humidity);
		return accumulator;
	}, cityObj);
	result.cityName = cityName;
	return result;
};
//api fetch request
export const fetchWeather = createAsyncThunk(
	'cities/fetchWeather',
	async (city) => {
		const response = await axios.get(
			`${ROOT_URL}${city}&appid=${apiKey}${units}`
		);
		const finishedData = processWeatherData(response.data, city);
		return finishedData;
	}
);
//slice for application setting up state and what to do with fetchWeather if it fulfills or fails
export const citiesSlice = createSlice({
	name: 'cities',
	initialState: {
		cities: [],
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
				state.cities.push(action.payload);
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
				alert('Please make sure you entered a valid city.');
			});
	},
});

export default citiesSlice.reducer;
