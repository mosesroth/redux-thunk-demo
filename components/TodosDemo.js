import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator,
  StyleSheet 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  addTodoAsync 
} from '../redux/actions/todosActions';

const TodosDemo = () => {
  const [text, setText] = useState('');
  const { items, loading, error } = useSelector(state => state.todos);
  const dispatch = useDispatch();
  
  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };
  
  const handleAddTodoAsync = () => {
    if (text.trim()) {
      dispatch(addTodoAsync(text));
      setText('');
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoTextContainer}
        onPress={() => dispatch(toggleTodo(item.id))}
      >
        <View style={[
          styles.checkbox,
          item.completed && styles.checkboxChecked
        ]} />
        <Text style={[
          styles.todoText,
          item.completed && styles.todoTextCompleted
        ]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => dispatch(deleteTodo(item.id))}
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos Example</Text>
      <Text style={styles.description}>
        Redux Thunk with synchronous and asynchronous todo operations
      </Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="What needs to be done?"
        />
        
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTodo}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.addButton, styles.asyncButton]}
            onPress={handleAddTodoAsync}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Adding...' : 'Add Async'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {loading && (
          <ActivityIndicator size="small" color="#2196F3" style={styles.loader} />
        )}
        
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
      
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Todo List ({items.length})</Text>
        
        {items.length > 0 ? (
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            style={styles.list}
          />
        ) : (
          <Text style={styles.emptyText}>No todos yet. Add one above!</Text>
        )}
      </View>
      
      <Text style={styles.codeSnippet}>
        {`// Async action creator with Redux Thunk
export const addTodoAsync = (text, delay = 1000) => {
  return (dispatch) => {
    dispatch({ type: ADD_TODO_ASYNC_START });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTodo = {
          id: Date.now(),
          text,
          completed: false
        };
        
        dispatch({ 
          type: ADD_TODO_ASYNC_SUCCESS,
          payload: newTodo
        });
        resolve(newTodo);
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
  listContainer: {
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  list: {
    maxHeight: 200,
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    padding: 16,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  todoTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2196F3',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#2196F3',
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF5252',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
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

export default TodosDemo;
