import axios from 'axios';

// Action Types
export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

// Action Creators
const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST
});

const fetchWeatherSuccess = (data) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: data
});

const fetchWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error
});

// Thunk Action Creator with cancellation
let weatherRequestController = null;

export const fetchWeather = (city) => {
  return async (dispatch) => {
    // Cancel previous request if it exists
    if (weatherRequestController) {
      weatherRequestController.abort();
    }
    
    // Create a new AbortController
    weatherRequestController = new AbortController();
    const { signal } = weatherRequestController;
    
    dispatch(fetchWeatherRequest());
    
    try {
      // Using OpenWeatherMap API mock endpoint
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/1`,
        { signal }
      );
      
      // Simulate weather data transformation
      const weatherData = {
        city,
        temperature: Math.floor(Math.random() * 30) + 5, // Random temp between 5-35°C
        conditions: ['Sunny', 'Cloudy', 'Rainy', 'Snowy'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString()
      };
      
      dispatch(fetchWeatherSuccess(weatherData));
      return weatherData;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Weather fetch was cancelled');
      } else {
        dispatch(fetchWeatherFailure(error.message));
        throw error;
      }
    }
  };
};

// Thunk with retry logic
export const fetchWeatherWithRetry = (city, maxRetries = 3) => {
  return async (dispatch) => {
    let retries = 0;
    
    const attemptFetch = async () => {
      try {
        dispatch(fetchWeatherRequest());
        
        // Using OpenWeatherMap API mock endpoint
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/1`
        );
        
        // Simulate weather data
        const weatherData = {
          city,
          temperature: Math.floor(Math.random() * 30) + 5,
          conditions: ['Sunny', 'Cloudy', 'Rainy', 'Snowy'][Math.floor(Math.random() * 4)],
          humidity: Math.floor(Math.random() * 100),
          timestamp: new Date().toISOString()
        };
        
        dispatch(fetchWeatherSuccess(weatherData));
        return weatherData;
      } catch (error) {
        if (retries < maxRetries) {
          retries++;
          console.log(`Retry attempt ${retries} for ${city}`);
          return attemptFetch();
        }
        
        dispatch(fetchWeatherFailure(error.message));
        throw error;
      }
    };
    
    return attemptFetch();
  };
};
