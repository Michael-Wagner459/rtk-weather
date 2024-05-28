'use client';
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?q=`;
const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const units = '&units=imperial';
const cityObj = { cityName: null, temp: [], pressure: [], humidity: [] };

const processWeatherData = (data, cityName) => {
	const result = data.list.reduce((accumulator, item) => {
		accumulator.temp.push(item.main.temp);
		accumulator.pressure.push(item.main.pressure);
		accumulator.humidity.push(item.main.humidity);
		return accumulator;
	}, cityObj);
	result.cityName = cityName;
	return result;
};

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
				state.cities = [...state.cities, action.payload];
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.status = 'failed';
				state.error = alert(action.error.message);
			});
	},
});

export default citiesSlice.reducer;
