// components/Officer/OfficerDashboard.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { mockTrainings, mockOfficers } from '../../data/mockData';

const OfficerDashboard = ({ onLogout, userId }) => {
  const [officerData, setOfficerData] = useState(null);
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);
  const [completedTrainings, setCompletedTrainings] = useState([]);

  useEffect(() => {
    // In a real app, fetch officer data based on userId from backend
    const currentOfficer = mockOfficers.find(o => o.id === userId);
    setOfficerData(currentOfficer);

    if (currentOfficer) {
      const allTrainings = mockTrainings;
      // Filter upcoming trainings based on status and potentially future dates
      const upcoming = allTrainings.filter(t => t.status === 'Upcoming');
      // Filter completed trainings based on what the officer has attended
      const completed = allTrainings.filter(t => currentOfficer.trainingsAttended.includes(t.id));

      setUpcomingTrainings(upcoming);
      setCompletedTrainings(completed);
    }
  }, [userId]);

  if (!officerData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading officer data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Officer Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>{officerData.name}</Text>
          <Text style={styles.profileDetail}>{officerData.cooperative} - {officerData.position}</Text>
          <Text style={[styles.profileStatus, officerData.complianceStatus === 'Compliant' ? styles.compliant : styles.nonCompliant]}>
            Compliance Status: {officerData.complianceStatus}
          </Text>
          <Text style={styles.profileDetail}>Your User ID: {userId}</Text>
        </View>

        <Text style={styles.sectionHeader}>Upcoming Trainings</Text>
        {upcomingTrainings.length > 0 ? (
          upcomingTrainings.map(training => (
            <View key={training.id} style={styles.trainingItem}>
              <Text style={styles.trainingTitle}>{training.title}</Text>
              <Text style={styles.trainingDetails}>Date: {training.date}</Text>
              <Text style={styles.trainingDetails}>Venue: {training.venue}</Text>
              <Text style={styles.trainingDetails}>Speaker: {training.speaker}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No upcoming trainings.</Text>
        )}

        <Text style={styles.sectionHeader}>Missing Requirements</Text>
        {officerData.missingRequirements.length > 0 ? (
          officerData.missingRequirements.map((req, index) => (
            <View key={index} style={styles.requirementItem}>
              <Text style={styles.requirementText}>- {req}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>You are currently compliant!</Text>
        )}

        <Text style={styles.sectionHeader}>Earned Certificates</Text>
        {officerData.certificates.length > 0 ? (
          officerData.certificates.map(cert => {
            const training = mockTrainings.find(t => t.id === cert.trainingId);
            return (
              <View key={cert.id} style={styles.certificateItem}>
                <Text style={styles.certificateTitle}>Certificate for: {training?.title || 'Unknown Training'}</Text>
                <Text style={styles.certificateDetails}>Issued: {cert.issueDate}</Text>
                <Text style={styles.certificateDetails}>No.: {cert.certificateNo}</Text>
                {/* In a real app, add a button to download/view certificate */}
              </View>
            );
          })
        ) : (
          <Text style={styles.noDataText}>No certificates earned yet.</Text>
        )}

        <Text style={styles.sectionHeader}>Completed Trainings</Text>
        {completedTrainings.length > 0 ? (
          completedTrainings.map(training => (
            <View key={training.id} style={styles.trainingItem}>
              <Text style={styles.trainingTitle}>{training.title}</Text>
              <Text style={styles.trainingDetails}>Date: {training.date}</Text>
              <Text style={styles.trainingDetails}>Venue: {training.venue}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No completed trainings.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  content: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  profileStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  compliant: {
    backgroundColor: '#d4edda',
    color: '#28a745',
  },
  nonCompliant: {
    backgroundColor: '#f8d7da',
    color: '#dc3545',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
    color: '#333',
  },
  trainingItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  trainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  trainingDetails: {
    fontSize: 14,
    color: '#555',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#888',
    fontSize: 16,
  },
  requirementItem: {
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#dc3545',
  },
  requirementText: {
    fontSize: 15,
    color: '#dc3545',
    fontWeight: '500',
  },
  certificateItem: {
    backgroundColor: '#e2f0cb',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#28a745',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  certificateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 5,
  },
  certificateDetails: {
    fontSize: 14,
    color: '#555',
  },
});

export default OfficerDashboard;