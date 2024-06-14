import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchWeathers } from './store/api';
import { NavBar } from './components/NavBar';
import { FORECAST } from './constants';
import { WeatherItems } from './components/WeatherItems';

function App () {
  const [cityName, setCityName] = useState('Yerevan');
  const { weathers, isLoading } = useAppSelector(state => state.weather);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWeathers({city: 'Yerevan', type: FORECAST}));
  }, [dispatch]);

  const handleSearch = () => {
    try {
      dispatch(fetchWeathers({city: cityName, type: FORECAST}));
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (weathers.cod == 404) {
    return (
      <h2>Please type valid country, for example Yerevan, Moscow, and now please, refresh the page</h2>
    )
  }
  
  return (
    <div className="App">
      <NavBar>
        <div>
          <input value={cityName} onChange={(e) => setCityName(e.target.value)} type='text'/>
          <button onClick={handleSearch}>Search City</button>
        </div>
      </NavBar>
      <WeatherItems cityName={cityName} />
    </div>
  );
}

export default App;
