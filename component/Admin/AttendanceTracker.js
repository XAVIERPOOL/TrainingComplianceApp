// components/Admin/AttendanceTracker.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';

const AttendanceTracker = ({ trainings, officers, attendanceRecords, onAddAttendance }) => {
  const [selectedTrainingId, setSelectedTrainingId] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentOfficerId, setCurrentOfficerId] = useState('');
  const [attendanceMode, setAttendanceMode] = useState(null); // 'manual' or 'qr'

  const selectedTraining = trainings.find(t => t.id === selectedTrainingId);
  const officersForSelectedTraining = officers.filter(officer =>
    !attendanceRecords.some(record => record.trainingId === selectedTrainingId && record.officerId === officer.id)
  );

  const openAttendanceModal = (mode) => {
    setAttendanceMode(mode);
    setModalVisible(true);
  };

  const handleRecordAttendance = () => {
    if (selectedTrainingId && currentOfficerId) {
      const officerExists = officers.some(o => o.id === currentOfficerId);
      if (officerExists) {
        onAddAttendance({
          trainingId: selectedTrainingId,
          officerId: currentOfficerId,
          checkinTime: new Date().toISOString(),
          isPresent: true,
        });
        setCurrentOfficerId(''); // Clear input
        // Optionally close modal or keep open for more entries
        // setModalVisible(false);
      } else {
        alert('Officer ID not found.'); // Use a custom modal in a real app
      }
    } else {
      alert('Please select a training and enter an Officer ID.'); // Use a custom modal
    }
  };

  const renderTrainingItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.trainingItem, selectedTrainingId === item.id && styles.selectedTrainingItem]}
      onPress={() => setSelectedTrainingId(item.id)}
    >
      <Text style={styles.trainingTitle}>{item.title}</Text>
      <Text style={styles.trainingDetails}>{item.date} - {item.venue}</Text>
    </TouchableOpacity>
  );

  const renderAttendanceRecord = ({ item }) => {
    const officer = officers.find(o => o.id === item.officerId);
    const training = trainings.find(t => t.id === item.trainingId);
    return (
      <View style={styles.recordItem}>
        <Text style={styles.recordText}>Officer: {officer?.name || 'N/A'}</Text>
        <Text style={styles.recordText}>Training: {training?.title || 'N/A'}</Text>
        <Text style={styles.recordText}>Check-in: {new Date(item.checkinTime).toLocaleString()}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance Tracker</Text>

      <Text style={styles.sectionHeader}>Select Training:</Text>
      <FlatList
        horizontal
        data={trainings.filter(t => t.status === 'Upcoming')} // Only show upcoming for attendance
        renderItem={renderTrainingItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      {selectedTraining && (
        <View style={styles.selectedTrainingInfo}>
          <Text style={styles.selectedTrainingTitle}>Selected: {selectedTraining.title}</Text>
          <Text style={styles.selectedTrainingDetails}>{selectedTraining.date} at {selectedTraining.venue}</Text>
          <View style={styles.attendanceButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={() => openAttendanceModal('manual')}>
              <Text style={styles.buttonText}>Manual Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => openAttendanceModal('qr')}>
              <Text style={styles.buttonText}>QR Scan (Simulated)</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Text style={styles.sectionHeader}>Recorded Attendance:</Text>
      <FlatList
        data={attendanceRecords.filter(rec => rec.trainingId === selectedTrainingId)}
        renderItem={renderAttendanceRecord}
        keyExtractor={(item, index) => `${item.trainingId}-${item.officerId}-${index}`}
        ListEmptyComponent={<Text style={styles.noRecordsText}>No attendance records for this training yet.</Text>}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {attendanceMode === 'manual' ? 'Record Manual Attendance' : 'Simulate QR Scan'}
            </Text>
            <Text style={styles.modalSubtitle}>For: {selectedTraining?.title || 'N/A'}</Text>

            {attendanceMode === 'manual' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Officer ID (e.g., officer-456)"
                  value={currentOfficerId}
                  onChangeText={setCurrentOfficerId}
                />
                <TouchableOpacity style={styles.modalActionButton} onPress={handleRecordAttendance}>
                  <Text style={styles.buttonText}>Record Attendance</Text>
                </TouchableOpacity>
              </>
            )}

            {attendanceMode === 'qr' && (
              <View style={styles.qrSimulation}>
                <Text style={styles.qrText}>
                  Simulating QR Code Scan.
                  {'\n'}Enter Officer ID below to mark attendance.
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Officer ID (e.g., officer-456)"
                  value={currentOfficerId}
                  onChangeText={setCurrentOfficerId}
                />
                <TouchableOpacity style={styles.modalActionButton} onPress={handleRecordAttendance}>
                  <Text style={styles.buttonText}>Simulate Scan & Record</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  horizontalList: {
    paddingBottom: 10,
  },
  trainingItem: {
    backgroundColor: '#e9ecef',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedTrainingItem: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
  },
  trainingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  trainingDetails: {
    fontSize: 13,
    color: '#555',
  },
  selectedTrainingInfo: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#add8e6',
  },
  selectedTrainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 5,
  },
  selectedTrainingDetails: {
    fontSize: 15,
    color: '#0056b3',
    marginBottom: 15,
  },
  attendanceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  recordItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  recordText: {
    fontSize: 15,
    color: '#555',
  },
  noRecordsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    width: '90%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  modalActionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  qrSimulation: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: '#555',
  },
  closeButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default AttendanceTracker;
