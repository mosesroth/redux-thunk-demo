import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { 
  increment, 
  decrement, 
  reset, 
  incrementAsync, 
  incrementIfOdd 
} from '../redux/actions/counterActions';

const CounterDemo = () => {
  const { value, loading, error } = useSelector(state => state.counter);
  const dispatch = useDispatch();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter Example</Text>
      <Text style={styles.description}>
        Basic Redux Thunk example with synchronous and asynchronous actions
      </Text>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterValue}>{value}</Text>
        
        {loading && (
          <ActivityIndicator size="small" color="#2196F3" style={styles.loader} />
        )}
        
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => dispatch(increment())}
        >
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => dispatch(decrement())}
        >
          <Text style={styles.buttonText}>Decrement</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => dispatch(reset())}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.asyncButton]} 
          onPress={() => dispatch(incrementAsync())}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Increment Async'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.conditionalButton]} 
          onPress={() => dispatch(incrementIfOdd())}
        >
          <Text style={styles.buttonText}>Increment If Odd</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.codeSnippet}>
        {`// Async action creator with Redux Thunk
export const incrementAsync = (delay = 1000) => {
  return (dispatch) => {
    dispatch({ type: INCREMENT_ASYNC_START });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({ type: INCREMENT_ASYNC_SUCCESS });
        resolve();
      }, delay);
    });
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
  counterContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  loader: {
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  asyncButton: {
    backgroundColor: '#FF9800',
  },
  conditionalButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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

export default CounterDemo;
