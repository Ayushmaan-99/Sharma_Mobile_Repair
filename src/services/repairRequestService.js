import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

/**
 * Submit a new repair request to Firestore
 * @param {Object} data - Repair request data
 * @param {string} data.customerName - Customer's full name
 * @param {string} data.email - Customer's email address
 * @param {string} data.phone - Customer's phone number
 * @param {string} data.deviceType - Type of device (e.g., "iPhone", "Samsung")
 * @param {string} data.deviceModel - Model of the device
 * @param {string} data.issueDescription - Description of the issue
 * @returns {Promise<string>} - Document ID of the created repair request
 * @throws {Error} - If submission fails
 */
export async function submitRepairRequest(data) {
  try {
    // Validate required fields
    const requiredFields = ['customerName', 'email', 'phone', 'deviceType', 'deviceModel', 'issueDescription'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Create repair request document
    const repairRequestData = {
      ...data,
      status: 'pending', // Default status for new requests
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString() // Fallback timestamp
    };

    // Add document to Firestore
    const docRef = await addDoc(collection(db, 'repairRequests'), repairRequestData);
    
    console.log('Repair request submitted successfully:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting repair request:', error);
    throw new Error(`Failed to submit repair request: ${error.message}`);
  }
}

/**
 * Fetch all repair requests from Firestore, sorted by timestamp (newest first)
 * @returns {Promise<Array>} - Array of repair request objects with IDs
 * @throws {Error} - If fetching fails
 */
export async function getAllRepairRequests() {
  try {
    // Create query to get all repair requests ordered by timestamp
    const repairRequestsQuery = query(
      collection(db, 'repairRequests'),
      orderBy('timestamp', 'desc')
    );

    // Execute query
    const querySnapshot = await getDocs(repairRequestsQuery);
    
    // Transform documents into array of objects
    const repairRequests = [];
    querySnapshot.forEach((doc) => {
      repairRequests.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`Fetched ${repairRequests.length} repair requests`);
    return repairRequests;
  } catch (error) {
    console.error('Error fetching repair requests:', error);
    throw new Error(`Failed to fetch repair requests: ${error.message}`);
  }
}
