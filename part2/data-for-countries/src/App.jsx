import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {
  
  const [country, setCountry] = useState([])
  const [filter, setFilter] = useState('')
  const [temperatureData, setTemperatureData] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY

  const filteredCountry = country.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShow = (country) => {
    setFilter(country.name.common)
  }

  const fetchTemperature = (capital) => axios
  .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=af4fab5d13cbd4a98643f97d90880e44&units=metric`)
  .then(response => setTemperatureData(response.data.main.temp))

  useEffect(() => {
    if (filteredCountry.length === 1) {
      fetchTemperature(filteredCountry[0].capital[0]);
    }
  }, [filteredCountry]);

  const hook = () => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountry(response.data)
    })
  }

  useEffect(hook, [])

  return (
    <div>
      <Filter handleChange={handleFilterChange} countryName={filter} />
      <div>
        {filteredCountry.length === 1 ? (
          <div>
            <h2>{filteredCountry[0].name.common}</h2>
            <br />
            <img src={filteredCountry[0].flags.png} />
            <h2>Weather at {filteredCountry[0].capital[0]}</h2>
            <p>Temperature: {temperatureData} Degrees Celcius</p>
          </div>
          ) : filteredCountry.length < 10 ? (
            filteredCountry.map((country, i) => <Country country={country} handleClick={() => handleShow(country)} key={i} />)
            ) : (
              <div>Too many matches, specify your search</div>
              )}
      </div>
    </div>
  )
}

export default App
