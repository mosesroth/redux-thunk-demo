import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator,
  TextInput,
  StyleSheet 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, fetchPostById } from '../redux/actions/postsActions';

const PostsDemo = () => {
  const [postId, setPostId] = useState('');
  const { items, loading, error } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  
  const handleFetchPosts = () => {
    dispatch(fetchPosts());
  };
  
  const handleFetchPostById = () => {
    if (postId.trim()) {
      dispatch(fetchPostById(postId));
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
      <Text style={styles.postId}>Post ID: {item.id}</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts API Example</Text>
      <Text style={styles.description}>
        Redux Thunk with real API calls using axios
      </Text>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleFetchPosts}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Fetch Posts</Text>
        </TouchableOpacity>
        
        <View style={styles.fetchByIdContainer}>
          <TextInput
            style={styles.input}
            value={postId}
            onChangeText={setPostId}
            placeholder="Enter post ID"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={[styles.button, styles.fetchByIdButton]}
            onPress={handleFetchPostById}
            disabled={loading || !postId.trim()}
          >
            <Text style={styles.buttonText}>Fetch by ID</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {loading && (
        <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
      )}
      
      {error && (
        <Text style={styles.errorText}>Error: {error}</Text>
      )}
      
      {items.length > 0 ? (
        <View style={styles.postsContainer}>
          <Text style={styles.postsTitle}>Posts ({items.length})</Text>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            style={styles.postsList}
          />
        </View>
      ) : !loading && (
        <Text style={styles.emptyText}>No posts loaded. Tap "Fetch Posts" to load.</Text>
      )}
      
      <Text style={styles.codeSnippet}>
        {`// Thunk Action Creator with API call
export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_POSTS_REQUEST });
    
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts?_limit=5'
      );
      dispatch({ 
        type: FETCH_POSTS_SUCCESS, 
        payload: response.data 
      });
      return response.data;
    } catch (error) {
      dispatch({ 
        type: FETCH_POSTS_FAILURE, 
        payload: error.message 
      });
      throw error;
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
  actionsContainer: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fetchByIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginRight: 8,
    backgroundColor: '#f9f9f9',
  },
  fetchByIdButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 10,
    flex: 0.4,
  },
  loader: {
    marginVertical: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  postsContainer: {
    marginBottom: 16,
  },
  postsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  postsList: {
    maxHeight: 300,
  },
  postItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  postBody: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  postId: {
    fontSize: 12,
    color: '#999',
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    padding: 16,
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

export default PostsDemo;
