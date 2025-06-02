// components/Admin/Reports.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Reports = ({ trainings, officers, attendanceRecords }) => {
  const [reportType, setReportType] = useState(null);
  const [reportData, setReportData] = useState([]);

  const generateAttendanceReport = () => {
    const attendanceSummary = trainings.map(training => {
      const attendees = attendanceRecords.filter(rec => rec.trainingId === training.id)
                                        .map(rec => officers.find(o => o.id === rec.officerId)?.name || 'Unknown Officer');
      return {
        id: training.id,
        title: training.title,
        date: training.date,
        totalAttendees: attendees.length,
        attendeesList: attendees.join(', ') || 'No attendees',
      };
    });
    setReportType('Attendance');
    setReportData(attendanceSummary);
  };

  const generateComplianceReport = () => {
    const complianceSummary = officers.map(officer => ({
      id: officer.id,
      name: officer.name,
      cooperative: officer.cooperative,
      status: officer.complianceStatus,
      missing: officer.missingRequirements.join(', ') || 'None',
      trainingsCompleted: officer.trainingsAttended.length,
    }));
    setReportType('Compliance');
    setReportData(complianceSummary);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reports & Analytics</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.reportButton} onPress={generateAttendanceReport}>
          <Text style={styles.buttonText}>Generate Attendance Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reportButton} onPress={generateComplianceReport}>
          <Text style={styles.buttonText}>Generate Compliance Report</Text>
        </TouchableOpacity>
      </View>

      {reportType && (
        <ScrollView style={styles.reportOutput}>
          <Text style={styles.reportTitle}>{reportType} Report</Text>
          {reportData.length > 0 ? (
            reportData.map((data, index) => (
              <View key={index} style={styles.reportItem}>
                {reportType === 'Attendance' ? (
                  <>
                    <Text style={styles.itemHeader}>{data.title} ({data.date})</Text>
                    <Text>Attendees: {data.totalAttendees}</Text>
                    <Text style={styles.itemDetail}>List: {data.attendeesList}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.itemHeader}>{data.name} ({data.cooperative})</Text>
                    <Text>Status: {data.status}</Text>
                    <Text style={styles.itemDetail}>Missing: {data.missing}</Text>
                    <Text style={styles.itemDetail}>Trainings Completed: {data.trainingsCompleted}</Text>
                  </>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No data to display for this report type.</Text>
          )}
        </ScrollView>
      )}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  reportButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reportOutput: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  reportItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  itemDetail: {
    fontSize: 14,
    color: '#555',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 16,
  },
});

export default Reports;