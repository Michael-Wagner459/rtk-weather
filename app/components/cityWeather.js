'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import {
	Sparklines,
	SparklinesReferenceLine,
	SparklinesLine,
	SparklinesCurve,
} from 'react-sparklines';

export default function CityWeather() {
	const cities = useSelector((state) => state.cities.cities);

	const getAverage = (array) =>
		Math.round(
			array.reduce((sum, currentValue) => sum + currentValue, 0) /
				array.length
		);

	const renderCities = () => {
		if (cities.length > 0) {
			return cities.map((city, index) => {
				return (
					<tbody key={index}>
						<tr>
							<th scope='row'>{city.cityName}</th>
							<td>
								<Sparklines data={city.temp}>
									<SparklinesLine color='blue' />
									<SparklinesReferenceLine type='avg' />
								</Sparklines>
							</td>
							<td>
								<Sparklines data={city.pressure}>
									<SparklinesLine color='red' />
									<SparklinesReferenceLine type='avg' />
								</Sparklines>
							</td>
							<td>
								<Sparklines data={city.humidity}>
									<SparklinesLine color='yellow' />
									<SparklinesReferenceLine type='avg' />
								</Sparklines>
							</td>
						</tr>
						<tr>
							<th></th>
							<td>{getAverage(city.temp)}&#40;F&#41;</td>
							<td>{getAverage(city.pressure)}&#40;hPa&#41;</td>
							<td>{getAverage(city.humidity)}&#40;%&#41;</td>
						</tr>
					</tbody>
				);
			});
		} else {
			return <div>No Weather Data To Show</div>;
		}
	};
	return (
		<table className='table'>
			<thead>
				<tr className='text-bold'>
					<th scope='col'>City</th>
					<th scope='col'>Temperature&#40;F&#41;</th>
					<th scope='col'>Pressure&#40;hPa&#41;</th>
					<th scope='col'>Humidity&#40;%&#41;</th>
				</tr>
			</thead>
			{renderCities()}
		</table>
	);
}
