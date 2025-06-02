// components/Admin/TrainingManagement.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
// ^ Add Alert here
const TrainingManagement = ({ trainings, onUpdateTraining, onAddTraining, onDeleteTraining }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentTraining, setCurrentTraining] = useState(null); // For editing or addingS
  const [form, setForm] = useState({
    title: '',
    date: '',
    venue: '',
    speaker: '',
    topic: '',
    capacity: '',
    status: 'Upcoming',
  });

  const openAddModal = () => {
    setCurrentTraining(null);
    setForm({
      title: '',
      date: '',
      venue: '',
      speaker: '',
      topic: '',
      capacity: '',
      status: 'Upcoming',
    });
    setModalVisible(true);
  };

  const openEditModal = (training) => {
    setCurrentTraining(training);
    setForm({
      title: training.title,
      date: training.date,
      venue: training.venue,
      speaker: training.speaker,
      topic: training.topic,
      capacity: String(training.capacity),
      status: training.status,
    });
    setModalVisible(true);
  };

  const handleSaveTraining = () => {
    if (currentTraining) {
      onUpdateTraining({ ...currentTraining, ...form, capacity: parseInt(form.capacity) });
    } else {
      onAddTraining({ ...form, capacity: parseInt(form.capacity) });
    }
    setModalVisible(false);
  };

  const handleDelete = (id) => {
  Alert.alert(
    "Delete Training", // Alert Title
    "Are you sure you want to delete this training?", // Alert Message
    [
      {
        text: "Cancel",
        onPress: () => console.log("Delete cancelled"),
        style: "cancel"
      },
      {
        text: "Delete",
        onPress: () => {
          console.log(`Deleting training with ID: ${id}`); // Optional: confirm in console
          onDeleteTraining(id);
        },
        style: "destructive" // Red button for destructive action
      }
    ],
    { cancelable: true } // Allows dismissing by tapping outside
  );
};

  const renderTrainingItem = ({ item }) => (
    <View style={styles.trainingItem}>
      <View>
        <Text style={styles.trainingTitle}>{item.title}</Text>
        <Text style={styles.trainingDetails}>Date: {item.date}</Text>
        <Text style={styles.trainingDetails}>Venue: {item.venue}</Text>
        <Text style={styles.trainingDetails}>Speaker: {item.speaker}</Text>
        <Text style={styles.trainingDetails}>Capacity: {item.capacity}</Text>
        <Text style={styles.trainingDetails}>Status: {item.status}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Training Management</Text>
      <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Text style={styles.buttonText}>Add New Training</Text>
      </TouchableOpacity>

      <FlatList
        data={trainings}
        renderItem={renderTrainingItem}
        keyExtractor={item => item.id}
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
            <Text style={styles.modalTitle}>{currentTraining ? 'Edit Training' : 'Add New Training'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={form.title}
              onChangeText={(text) => setForm({ ...form, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={form.date}
              onChangeText={(text) => setForm({ ...form, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Venue"
              value={form.venue}
              onChangeText={(text) => setForm({ ...form, venue: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Speaker"
              value={form.speaker}
              onChangeText={(text) => setForm({ ...form, speaker: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Topic"
              value={form.topic}
              onChangeText={(text) => setForm({ ...form, topic: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Capacity"
              keyboardType="numeric"
              value={form.capacity}
              onChangeText={(text) => setForm({ ...form, capacity: text })}
            />
            {/* Status can be a dropdown in a more complex app */}
            <TextInput
              style={styles.input}
              placeholder="Status (e.g., Upcoming, Completed)"
              value={form.status}
              onChangeText={(text) => setForm({ ...form, status: text })}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveTraining}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
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
  addButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  trainingItem: {
    // Keep as row for main content and actions, but allow flexible wrapping if needed
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Align items vertically in the center
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    // Added for better responsiveness on small screens:
    flexWrap: 'wrap', // Allow content to wrap to the next line
    // Consider adding paddingRight if buttons are still too close to edge
    paddingRight: 5,
  },
  trainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    // Ensure title can take up available space
    flexShrink: 1, // Allow text to shrink if necessary
    marginBottom: 5, // Add a little space below title before details
  },
  trainingDetails: {
    fontSize: 14,
    color: '#555',
    // Ensure details can take up available space and wrap
    flexShrink: 1,
    width: '100%', // Make it take full width below title if wrapped
  },
  actions: {
    flexDirection: 'row', // Keep buttons in a row for now
    // If buttons are still cut off, you might want to switch to 'column' for this:
    // flexDirection: 'column', // Option 2: Stack buttons vertically
    // alignItems: 'flex-end', // Align buttons to the right if stacked
    marginTop: 10, // Add some space from the text content if wrapping occurs
    justifyContent: 'flex-end', // Push buttons to the right
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 5,
    minWidth: 60, // Ensure a minimum width for touchability
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    minWidth: 60, // Ensure a minimum width for touchability
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
});

export default TrainingManagement;
