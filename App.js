import React, { useState } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity,
  StatusBar 
} from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';

// Import components
import CounterDemo from './components/CounterDemo';
import TodosDemo from './components/TodosDemo';
import PostsDemo from './components/PostsDemo';
import UsersDemo from './components/UsersDemo';
import WeatherDemo from './components/WeatherDemo';

export default function App() {
  const [activeTab, setActiveTab] = useState('counter');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'counter':
        return <CounterDemo />;
      case 'todos':
        return <TodosDemo />;
      case 'posts':
        return <PostsDemo />;
      case 'users':
        return <UsersDemo />;
      case 'weather':
        return <WeatherDemo />;
      default:
        return <CounterDemo />;
    }
  };
  
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Redux Thunk</Text>
          <Text style={styles.headerSubtitle}>Async Redux Action Creator Middleware</Text>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.tabsContainer}
        >
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'counter' && styles.activeTab]} 
            onPress={() => setActiveTab('counter')}
          >
            <Text style={[styles.tabText, activeTab === 'counter' && styles.activeTabText]}>
              Counter
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'todos' && styles.activeTab]} 
            onPress={() => setActiveTab('todos')}
          >
            <Text style={[styles.tabText, activeTab === 'todos' && styles.activeTabText]}>
              Todos
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]} 
            onPress={() => setActiveTab('posts')}
          >
            <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
              Posts API
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'users' && styles.activeTab]} 
            onPress={() => setActiveTab('users')}
          >
            <Text style={[styles.tabText, activeTab === 'users' && styles.activeTabText]}>
              Users API
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'weather' && styles.activeTab]} 
            onPress={() => setActiveTab('weather')}
          >
            <Text style={[styles.tabText, activeTab === 'weather' && styles.activeTabText]}>
              Weather API
            </Text>
          </TouchableOpacity>
        </ScrollView>
        
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {renderContent()}
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>What is Redux Thunk?</Text>
            <Text style={styles.infoText}>
              Redux Thunk is middleware that allows you to write action creators that return a function instead of an action.
            </Text>
            <Text style={styles.infoText}>
              This function can perform asynchronous operations and dispatch actions when needed, giving you more control over the flow of actions in your Redux application.
            </Text>
            
            <Text style={styles.infoTitle}>Key Features:</Text>
            <View style={styles.featureList}>
              <Text style={styles.featureItem}>• Handle asynchronous operations</Text>
              <Text style={styles.featureItem}>• Access Redux store state with getState()</Text>
              <Text style={styles.featureItem}>• Dispatch multiple actions from one thunk</Text>
              <Text style={styles.featureItem}>• Implement conditional logic in action creators</Text>
              <Text style={styles.featureItem}>• Cancel in-flight API requests</Text>
              <Text style={styles.featureItem}>• Implement retry mechanisms</Text>
            </View>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Redux Thunk - Async middleware for Redux
            </Text>
            <Text style={styles.footerLink}>
              github.com/reduxjs/redux-thunk
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#764ABC', // Redux purple
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tabsContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#764ABC',
  },
  tabText: {
    fontSize: 14,
    color: '#757575',
  },
  activeTabText: {
    color: '#764ABC',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  infoContainer: {
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
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  featureList: {
    marginLeft: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
  footer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#EDE7F6',
    borderRadius: 8,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerLink: {
    fontSize: 14,
    color: '#764ABC',
    fontWeight: 'bold',
  },
});
