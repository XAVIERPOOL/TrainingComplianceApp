## Technologies Used
- **Frontend:** React Native (with Expo Framework) [cite: 68]
- **Styling:** React Native StyleSheet API
- **Mock Data:** JavaScript objects (for current prototyping phase)

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm (comes with Node.js) or Yarn
- Expo CLI: Install globally: `npm install -g expo-cli`


### Running the Application
1.  Start the Expo development server:
    ```bash
    npm start
    # or expo start
    ```
2.  Open the Expo Go app on your mobile device (iOS or Android) and scan the QR code displayed in your terminal or web browser.

### Demo Credentials
- **Administrator:**
    - Username: `admin`
    - Password: `admin123`
- **Cooperative Officer:**
    - Username: `officer`
    - Password: `officer123`

## Future Enhancements & Backend Integration
While currently using mock data, the project is designed for future backend integration to provide persistent data storage and real-time updates. Planned integrations include:
- **Authentication Services:** Firebase Authentication or OAuth2 to manage secure logins and user identity verification. [cite: 72]
- **Cloud Storage:** Google Drive or AWS S3 for securely storing digital certificates and uploaded documents. [cite: 71]
- **Email Notifications:** Integration with email servers (e.g., Gmail or SendGrid) for sending notifications and confirmations to users. [cite: 70]
- **Database:** Transition from mock data to a full SQL database (as per architectural design) or a NoSQL solution like Firebase Firestore. [cite: 94]
- **QR Code Scanning:** Full integration with `expo-barcode-scanner` for live attendance. [cite: 69]

## Author
- [Lagatic, Xavier Angelo James O.]
- [11-43205/BSIT/]
- [(https://github.com/XAVIERPOOL)]
