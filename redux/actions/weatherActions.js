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

// Generate mock weather data for a city
const generateMockWeatherData = (city) => {
  return {
    city,
    temperature: Math.floor(Math.random() * 30) + 5, // Random temp between 5-35°C
    conditions: ['Sunny', 'Cloudy', 'Rainy', 'Snowy'][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 100),
    timestamp: new Date().toISOString()
  };
};

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
    
    dispatch(fetchWeatherRequest());
    
    try {
      // Simulate API delay
      await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          resolve();
        }, 1000);
        
        // If aborted, clear the timeout and reject
        weatherRequestController.signal.addEventListener('abort', () => {
          clearTimeout(timeoutId);
          reject(new Error('Weather fetch was cancelled'));
        });
      });
      
      // Generate mock weather data
      const weatherData = generateMockWeatherData(city);
      
      dispatch(fetchWeatherSuccess(weatherData));
      return weatherData;
    } catch (error) {
      if (error.name === 'AbortError' || error.message === 'Weather fetch was cancelled') {
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
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Randomly fail to demonstrate retry (1 in 3 chance)
        if (Math.random() < 0.3 && retries < maxRetries) {
          throw new Error('Simulated network error');
        }
        
        // Generate mock weather data
        const weatherData = generateMockWeatherData(city);
        
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
