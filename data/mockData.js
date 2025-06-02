// data/mockData.js

export const mockTrainings = [
  {
    id: 't1',
    title: 'Financial Literacy for Cooperatives',
    date: '2025-06-15',
    venue: 'Naga City Convention Center',
    speaker: 'Atty. Maria Santos',
    topic: 'Basic Accounting',
    capacity: 100,
    status: 'Upcoming',
  },
  {
    id: 't2',
    title: 'Good Governance in Cooperatives',
    date: '2025-07-01',
    venue: 'CDO Training Room',
    speaker: 'Mr. John Dela Cruz',
    topic: 'Ethical Leadership',
    capacity: 50,
    status: 'Upcoming',
  },
  {
    id: 't3',
    title: 'Digital Transformation for SMEs',
    date: '2025-05-20',
    venue: 'Online Webinar',
    speaker: 'Ms. Sarah Lee',
    topic: 'E-commerce Strategies',
    capacity: 200,
    status: 'Completed',
  },
  {
    id: 't4',
    title: 'Cooperative Law Updates',
    date: '2025-04-10',
    venue: 'City Hall Auditorium',
    speaker: 'Atty. David Reyes',
    topic: 'Recent Legislation',
    capacity: 75,
    status: 'Completed',
  },
];

export const mockOfficers = [
  {
    id: 'officer-456',
    name: 'Juan Dela Cruz',
    cooperative: 'Naga Farmers Coop',
    position: 'Treasurer',
    complianceStatus: 'Compliant',
    missingRequirements: [],
    trainingsAttended: ['t3', 't4'],
    certificates: [{ id: 'cert1', trainingId: 't3', issueDate: '2025-05-25', certificateNo: 'CERT-2025-001' }],
  },
  {
    id: 'officer-789',
    name: 'Maria Clara',
    cooperative: 'Naga Fisherfolk Coop',
    position: 'Secretary',
    complianceStatus: 'Non-compliant',
    missingRequirements: ['Financial Literacy Training'],
    trainingsAttended: ['t4'],
    certificates: [],
  },
  {
    id: 'officer-101',
    name: 'Pedro Penduko',
    cooperative: 'Naga Transport Coop',
    position: 'Board Member',
    complianceStatus: 'Compliant',
    missingRequirements: [],
    trainingsAttended: ['t1', 't2', 't3'],
    certificates: [{ id: 'cert2', trainingId: 't1', issueDate: '2025-06-16', certificateNo: 'CERT-2025-002' }],
  },
];

export const mockAttendance = [
  { trainingId: 't3', officerId: 'officer-456', checkinTime: '2025-05-20T09:00:00', isPresent: true },
  { trainingId: 't4', officerId: 'officer-456', checkinTime: '2025-04-10T09:15:00', isPresent: true },
  { trainingId: 't4', officerId: 'officer-789', checkinTime: '2025-04-10T09:20:00', isPresent: true },
];
