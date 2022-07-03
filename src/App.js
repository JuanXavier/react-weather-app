import './App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function App() {
	const [search, setSearch] = useState('')

	const [allData, setAllData] = useState({
		city: '',
		country: '',
		temperature: '',
		humidity: '',
		windSpeed: '',
		description: '',
		weatherIcons: '',
	})

	useEffect(() => {
		// what we want to happen after rendering:  fetch the database info the API call
		fetchData()
	}, [])

	const fetchData = async (city) => {
		try {
			const APIKEY = 'de2022752dc9d48b752cbf8a166fef40'

			// Axios is a library wich will allow us to make requests to the backend with promises
			const result = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`
			)

			await setAllData({
				city: result.data.name,
				country: result.data.sys.country,
				temperature: result.data.main.temp,
				humidity: result.data.main.humidity,
				windSpeed: result.data.wind.speed,
				description: result.data.weather[0].description,
				weatherIcons: result.data.weather[0].icon,
			})
		} catch (e) {
			console.error('API NOT LOADED CORRECTLY OR LOADED FOR THE FIRST TIME')
		}
	}

	const handleSubmit = (event) => {
		console.log(search)
		event.preventDefault()
		fetchData(search)
	}

	const handleChange = (event) => {
		setSearch(event.target.value)
	}

	return (
		<main>
			<div className='form'>
				<form onSubmit={handleSubmit}>
					<input
						value={search}
						type='text'
						name='city'
						placeholder='Enter location'
						onChange={handleChange}
					/>
					<button for='city'>Search</button>
				</form>
				<section>
					<div className='header-div'>
						<div>
							<div className='data'>
								<img
									alt='anything'
									src={'https://openweathermap.org/img/wn/' + allData.weatherIcons + '@2x.png'}
								/>
								<p>{allData.description} </p>
								<h1 className='title'>
									{allData.city}, {allData.country}
								</h1>
								<div className='weather-description'>
									<div>
										<h3>HUMIDITY:</h3>
										<p>{allData.humidity}%</p>
									</div>
									<div>
										<h3>TEMPERATURE:</h3>
										<p>{allData.temperature} °C</p>
									</div>
									<div>
										<h3>WIND SPEED:</h3>
										<p>{allData.windSpeed} m/s</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	)
}
