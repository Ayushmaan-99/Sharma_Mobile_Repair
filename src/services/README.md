# Repair Request Service

This service handles all Firestore operations for customer repair requests.

## Setup

1. Configure your Firebase project credentials in `.env`:
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

2. Ensure Firestore is enabled in your Firebase console

## API Reference

### `submitRepairRequest(data)`

Submits a new repair request to the Firestore `repairRequests` collection.

**Parameters:**
- `data` (Object): Repair request data
  - `customerName` (string, required): Customer's full name
  - `email` (string, required): Customer's email address
  - `phone` (string, required): Customer's phone number
  - `deviceType` (string, required): Type of device (e.g., "iPhone", "Samsung")
  - `deviceModel` (string, required): Model of the device
  - `issueDescription` (string, required): Description of the issue

**Returns:**
- `Promise<string>`: Document ID of the created repair request

**Throws:**
- `Error`: If required fields are missing or Firestore operation fails

**Example:**
```javascript
import { submitRepairRequest } from './services/repairRequestService';

try {
  const docId = await submitRepairRequest({
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    deviceType: 'iPhone',
    deviceModel: 'iPhone 13',
    issueDescription: 'Screen is cracked and touch not working'
  });
  console.log('Request submitted with ID:', docId);
} catch (error) {
  console.error('Submission failed:', error.message);
}
```

### `getAllRepairRequests()`

Fetches all repair requests from Firestore, sorted by timestamp (newest first).

**Returns:**
- `Promise<Array>`: Array of repair request objects with IDs

**Throws:**
- `Error`: If Firestore operation fails

**Example:**
```javascript
import { getAllRepairRequests } from './services/repairRequestService';

try {
  const requests = await getAllRepairRequests();
  console.log(`Found ${requests.length} repair requests`);
  requests.forEach(request => {
    console.log(`${request.id}: ${request.customerName} - ${request.status}`);
  });
} catch (error) {
  console.error('Failed to fetch requests:', error.message);
}
```

## Data Structure

Each repair request document in Firestore contains:

```javascript
{
  customerName: string,
  email: string,
  phone: string,
  deviceType: string,
  deviceModel: string,
  issueDescription: string,
  status: 'pending', // Default status for new requests
  timestamp: Timestamp, // Server timestamp
  createdAt: string // ISO string fallback
}
```

## Error Handling

All functions include comprehensive error handling:
- Input validation for required fields
- Firestore operation error catching
- Descriptive error messages
- Console logging for debugging

## Testing

Run tests with:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```
