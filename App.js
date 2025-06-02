// App.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import LoginScreen from './component/Auth/LoginScreen';
import AdminDashboard from './component/Admin/AdminDashboard';
import OfficerDashboard from './component/Officer/OfficerDashboard';

// Mock authentication service (replace with Firebase Auth in a real app)
const mockAuthService = {
  login: async (username, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (username === 'admin' && password === 'admin123') {
      return { success: true, role: 'admin', userId: 'admin-123' };
    } else if (username === 'officer' && password === 'officer123') {
      return { success: true, role: 'officer', userId: 'officer-456' };
    }
    return { success: false, message: 'Invalid credentials' };
  },
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

export default function App() {
  const [userRole, setUserRole] = useState(null); // 'admin', 'officer', or null
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle user login
  const handleLogin = async (username, password) => {
    setIsLoading(true);
    const result = await mockAuthService.login(username, password);
    if (result.success) {
      setUserRole(result.role);
      setUserId(result.userId);
    } else {
      // Handle login error (e.g., show a toast message)
      console.error(result.message);
    }
    setIsLoading(false);
  };

  // Function to handle user logout
  const handleLogout = async () => {
    setIsLoading(true);
    await mockAuthService.logout();
    setUserRole(null);
    setUserId(null);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render different components based on user role
  if (userRole === 'admin') {
    return <AdminDashboard onLogout={handleLogout} userId={userId} />;
  } else if (userRole === 'officer') {
    return <OfficerDashboard onLogout={handleLogout} userId={userId} />;
  } else {
    return <LoginScreen onLogin={handleLogin} />;
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
