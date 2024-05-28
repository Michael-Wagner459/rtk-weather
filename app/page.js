import CitySearch from './components/citySearch';
import CityWeather from './components/cityWeather';

export default function Home() {
	return (
		<body>
			<div className='text-center'>
				<h1>Weather App</h1>
			</div>
			<br />
			<br />
			<div className='text-center'>
				<CitySearch />
				<br />
				<br />
				<CityWeather />
			</div>
		</body>
	);
}
