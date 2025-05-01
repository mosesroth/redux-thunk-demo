import React from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  StatusBar 
} from 'react-native';

// Import simple counter component (no Redux)
import SimpleCounter from './components/SimpleCounter';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Redux Thunk Demo</Text>
        <Text style={styles.headerSubtitle}>Simplified Version</Text>
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <SimpleCounter />
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>About This Demo</Text>
          <Text style={styles.infoText}>
            This is a simplified version of the Redux Thunk demo that uses local state management instead of Redux.
          </Text>
          <Text style={styles.infoText}>
            The full version with Redux Thunk demonstrates more advanced features like async actions, API calls, and complex state management.
          </Text>
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
