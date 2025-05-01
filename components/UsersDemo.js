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
import { fetchUsers, fetchUserWithPosts } from '../redux/actions/usersActions';

const UsersDemo = () => {
  const [userId, setUserId] = useState('');
  const { items, loading, error } = useSelector(state => state.users);
  const dispatch = useDispatch();
  
  const handleFetchUsers = () => {
    dispatch(fetchUsers());
  };
  
  const handleFetchUserWithPosts = () => {
    if (userId.trim()) {
      dispatch(fetchUserWithPosts(userId));
    }
  };
  
  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userHeader}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userUsername}>@{item.username}</Text>
      </View>
      
      <View style={styles.userDetails}>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userPhone}>{item.phone}</Text>
        <Text style={styles.userWebsite}>{item.website}</Text>
      </View>
      
      {item.posts && (
        <View style={styles.postsContainer}>
          <Text style={styles.postsTitle}>Posts by {item.name}</Text>
          <FlatList
            data={item.posts.slice(0, 3)}
            renderItem={({ item: post }) => (
              <View style={styles.postItem}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postBody}>{post.body.substring(0, 100)}...</Text>
              </View>
            )}
            keyExtractor={post => post.id.toString()}
          />
        </View>
      )}
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users API Example</Text>
      <Text style={styles.description}>
        Redux Thunk with getState and multiple API calls
      </Text>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleFetchUsers}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Fetch All Users</Text>
        </TouchableOpacity>
        
        <View style={styles.fetchByIdContainer}>
          <TextInput
            style={styles.input}
            value={userId}
            onChangeText={setUserId}
            placeholder="Enter user ID"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={[styles.button, styles.fetchByIdButton]}
            onPress={handleFetchUserWithPosts}
            disabled={loading || !userId.trim()}
          >
            <Text style={styles.buttonText}>User + Posts</Text>
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
        <View style={styles.usersContainer}>
          <Text style={styles.usersTitle}>Users ({items.length})</Text>
          <FlatList
            data={items}
            renderItem={renderUserItem}
            keyExtractor={item => item.id.toString()}
            style={styles.usersList}
          />
        </View>
      ) : !loading && (
        <Text style={styles.emptyText}>No users loaded. Tap "Fetch All Users" to load.</Text>
      )}
      
      <Text style={styles.codeSnippet}>
        {`// Thunk with getState and multiple API calls
export const fetchUserWithPosts = (userId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    
    try {
      // Fetch user details
      const userResponse = await axios.get(
        \`https://jsonplaceholder.typicode.com/users/\${userId}\`
      );
      
      // Fetch user's posts
      const postsResponse = await axios.get(
        \`https://jsonplaceholder.typicode.com/posts?userId=\${userId}\`
      );
      
      // Combine the data
      const userData = {
        ...userResponse.data,
        posts: postsResponse.data
      };
      
      dispatch({ 
        type: FETCH_USERS_SUCCESS, 
        payload: [userData] 
      });
      return userData;
    } catch (error) {
      dispatch({ 
        type: FETCH_USERS_FAILURE, 
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
    backgroundColor: '#9C27B0',
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
  usersContainer: {
    marginBottom: 16,
  },
  usersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  usersList: {
    maxHeight: 300,
  },
  userItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userUsername: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  userDetails: {
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 14,
    color: '#2196F3',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  userWebsite: {
    fontSize: 14,
    color: '#9C27B0',
  },
  postsContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  postsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  postItem: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  postTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  postBody: {
    fontSize: 12,
    color: '#666',
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

export default UsersDemo;
