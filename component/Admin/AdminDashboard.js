// components/Admin/AdminDashboard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import TrainingManagement from './TrainingManagement';
import OfficerCompliance from './OfficerCompliance';
import AttendanceTracker from './AttendanceTracker';
import Reports from './Reports';
import { mockTrainings, mockOfficers, mockAttendance } from '../../data/mockData';

const AdminDashboard = ({ onLogout, userId }) => {
  const [activeTab, setActiveTab] = useState('Overview'); // State to manage active tab

  // In a real app, you'd fetch this data from a backend (e.g., Firestore)
  const [trainings, setTrainings] = useState(mockTrainings);
  const [officers, setOfficers] = useState(mockOfficers);
  const [attendance, setAttendance] = useState(mockAttendance);

  // Helper function to update data (simulating backend operations)
  const updateTraining = (updatedTraining) => {
    setTrainings(prev => prev.map(t => t.id === updatedTraining.id ? updatedTraining : t));
  };

  const addTraining = (newTraining) => {
    setTrainings(prev => [...prev, { ...newTraining, id: `t${prev.length + 1}` }]);
  };

  const deleteTraining = (trainingId) => {
    setTrainings(prev => prev.filter(t => t.id !== trainingId));
  };

  const updateOfficer = (updatedOfficer) => {
    setOfficers(prev => prev.map(o => o.id === updatedOfficer.id ? updatedOfficer : o));
  };

  const addAttendanceRecord = (newRecord) => {
    setAttendance(prev => [...prev, newRecord]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Training Management':
        return (
          <TrainingManagement
            trainings={trainings}
            onUpdateTraining={updateTraining}
            onAddTraining={addTraining}
            onDeleteTraining={deleteTraining}
          />
        );
      case 'Officer Compliance':
        return (
          <OfficerCompliance
            officers={officers}
            onUpdateOfficer={updateOfficer}
            trainings={trainings} // Pass trainings for assigning
          />
        );
      case 'Attendance Tracker':
        return (
          <AttendanceTracker
            trainings={trainings}
            officers={officers}
            attendanceRecords={attendance}
            onAddAttendance={addAttendanceRecord}
          />
        );
      case 'Reports':
        return (
          <Reports
            trainings={trainings}
            officers={officers}
            attendanceRecords={attendance}
          />
        );
      case 'Overview':
      default:
        return (
          <View style={styles.overviewContainer}>
            <Text style={styles.overviewTitle}>Welcome, Admin!</Text>
            <Text style={styles.overviewText}>Your User ID: {userId}</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{trainings.length}</Text>
                <Text style={styles.statLabel}>Total Trainings</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{officers.length}</Text>
                <Text style={styles.statLabel}>Registered Officers</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{officers.filter(o => o.complianceStatus === 'Non-compliant').length}</Text>
                <Text style={styles.statLabel}>Non-Compliant Officers</Text>
              </View>
            </View>
            <Text style={styles.sectionHeader}>Quick Actions:</Text>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => setActiveTab('Training Management')}>
              <Text style={styles.quickActionButtonText}>Manage Trainings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => setActiveTab('Officer Compliance')}>
              <Text style={styles.quickActionButtonText}>Track Officer Compliance</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        {['Overview', 'Training Management', 'Officer Compliance', 'Attendance Tracker', 'Reports'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingTop: 10, // Keep this as adjusted earlier, or reduce more if status bar area is too large
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#dc3545',
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 15,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginHorizontal: 3,
    backgroundColor: '#e9ecef',
    flexShrink: 1,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  activeTabItem: {
    backgroundColor: '#007bff',
  },
  tabText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 0,
    paddingHorizontal: 20, // Keep horizontal padding
    paddingVertical: 10, // Reduced vertical padding for the main content area
  },
  overviewContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15, // Reduced padding inside the overview card
    marginBottom: 15, // Reduced bottom margin for the overview card
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  overviewTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5, // Reduced margin below title
    color: '#333',
    textAlign: 'center',
  },
  overviewText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15, // Reduced margin below user ID text
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20, // Reduced margin below stats container
    width: '100%',
  },
  statCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15, // Reduced top margin for quick actions header
    marginBottom: 10, // Reduced bottom margin for quick actions header
    textAlign: 'center',
  },
  quickActionButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10, // Reduced margin below quick action buttons
    width: '80%',
    alignSelf: 'center',
  },
  quickActionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default AdminDashboard;