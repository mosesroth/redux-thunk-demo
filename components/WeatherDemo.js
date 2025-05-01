import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  ActivityIndicator,
  StyleSheet 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather, fetchWeatherWithRetry } from '../redux/actions/weatherActions';

const WeatherDemo = () => {
  const [city, setCity] = useState('');
  const { data, loading, error } = useSelector(state => state.weather);
  const dispatch = useDispatch();
  
  const handleFetchWeather = () => {
    if (city.trim()) {
      dispatch(fetchWeather(city));
    }
  };
  
  const handleFetchWithRetry = () => {
    if (city.trim()) {
      dispatch(fetchWeatherWithRetry(city));
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather API Example</Text>
      <Text style={styles.description}>
        Redux Thunk with cancellation and retry logic
      </Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Enter city name"
        />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleFetchWeather}
            disabled={loading || !city.trim()}
          >
            <Text style={styles.buttonText}>Fetch Weather</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.retryButton]}
            onPress={handleFetchWithRetry}
            disabled={loading || !city.trim()}
          >
            <Text style={styles.buttonText}>With Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {loading && (
        <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}
      
      {data && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{data.city}</Text>
          
          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetail}>
              <Text style={styles.weatherLabel}>Temperature</Text>
              <Text style={styles.weatherValue}>{data.temperature}°C</Text>
            </View>
            
            <View style={styles.weatherDetail}>
              <Text style={styles.weatherLabel}>Conditions</Text>
              <Text style={styles.weatherValue}>{data.conditions}</Text>
            </View>
            
            <View style={styles.weatherDetail}>
              <Text style={styles.weatherLabel}>Humidity</Text>
              <Text style={styles.weatherValue}>{data.humidity}%</Text>
            </View>
          </View>
          
          <Text style={styles.timestamp}>
            Last updated: {new Date(data.timestamp).toLocaleTimeString()}
          </Text>
        </View>
      )}
      
      <Text style={styles.codeSnippet}>
        {`// Thunk with cancellation
export const fetchWeather = (city) => {
  return async (dispatch) => {
    // Cancel previous request if it exists
    if (weatherRequestController) {
      weatherRequestController.abort();
    }
    
    // Create a new AbortController
    weatherRequestController = new AbortController();
    const { signal } = weatherRequestController;
    
    dispatch({ type: FETCH_WEATHER_REQUEST });
    
    try {
      const response = await axios.get(
        \`https://api.example.com/weather?city=\${city}\`,
        { signal }
      );
      
      dispatch({ 
        type: FETCH_WEATHER_SUCCESS,
        payload: response.data
      });
      return response.data;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Weather fetch was cancelled');
      } else {
        dispatch({ 
          type: FETCH_WEATHER_FAILURE,
          payload: error.message
        });
        throw error;
      }
    }
  };
};`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  retryButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 16,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  errorText: {
    color: '#D32F2F',
  },
  weatherContainer: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 4,
    marginBottom: 16,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 16,
    textAlign: 'center',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weatherDetail: {
    alignItems: 'center',
  },
  weatherLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  weatherValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    fontStyle: 'italic',
  },
  codeSnippet: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 4,
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333',
  },
});

export default WeatherDemo;
