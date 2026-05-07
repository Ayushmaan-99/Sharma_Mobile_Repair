import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitRepairRequest, getAllRepairRequests } from './repairRequestService';
import { addDoc, getDocs, collection, query, orderBy } from 'firebase/firestore';

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
  serverTimestamp: vi.fn(() => ({ _methodName: 'serverTimestamp' }))
}));

vi.mock('./firebase', () => ({
  db: {}
}));

describe('repairRequestService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress console logs during tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('submitRepairRequest', () => {
    it('should successfully submit a valid repair request', async () => {
      const mockDocRef = { id: 'test-doc-id-123' };
      addDoc.mockResolvedValue(mockDocRef);

      const testData = {
        customerName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        deviceType: 'iPhone',
        deviceModel: 'iPhone 13',
        issueDescription: 'Screen is cracked'
      };

      const result = await submitRepairRequest(testData);

      expect(result).toBe('test-doc-id-123');
      expect(addDoc).toHaveBeenCalledTimes(1);
      expect(collection).toHaveBeenCalledWith({}, 'repairRequests');
    });

    it('should throw error when required fields are missing', async () => {
      const incompleteData = {
        customerName: 'John Doe',
        email: 'john@example.com'
        // Missing phone, deviceType, deviceModel, issueDescription
      };

      await expect(submitRepairRequest(incompleteData)).rejects.toThrow('Missing required fields');
    });

    it('should throw error when customerName is missing', async () => {
      const dataWithoutName = {
        email: 'john@example.com',
        phone: '1234567890',
        deviceType: 'iPhone',
        deviceModel: 'iPhone 13',
        issueDescription: 'Screen is cracked'
      };

      await expect(submitRepairRequest(dataWithoutName)).rejects.toThrow('Missing required fields: customerName');
    });

    it('should handle Firestore errors gracefully', async () => {
      addDoc.mockRejectedValue(new Error('Firestore connection failed'));

      const testData = {
        customerName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        deviceType: 'iPhone',
        deviceModel: 'iPhone 13',
        issueDescription: 'Screen is cracked'
      };

      await expect(submitRepairRequest(testData)).rejects.toThrow('Failed to submit repair request');
    });

    it('should add status and timestamp to the request', async () => {
      const mockDocRef = { id: 'test-doc-id-456' };
      addDoc.mockResolvedValue(mockDocRef);

      const testData = {
        customerName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '9876543210',
        deviceType: 'Samsung',
        deviceModel: 'Galaxy S21',
        issueDescription: 'Battery drains quickly'
      };

      await submitRepairRequest(testData);

      const callArgs = addDoc.mock.calls[0][1];
      expect(callArgs.status).toBe('pending');
      expect(callArgs.timestamp).toBeDefined();
      expect(callArgs.createdAt).toBeDefined();
    });
  });

  describe('getAllRepairRequests', () => {
    it('should fetch and return all repair requests', async () => {
      const mockDocs = [
        { id: 'doc1', data: () => ({ customerName: 'John', status: 'pending' }) },
        { id: 'doc2', data: () => ({ customerName: 'Jane', status: 'completed' }) }
      ];

      const mockQuerySnapshot = {
        forEach: (callback) => mockDocs.forEach(callback)
      };

      getDocs.mockResolvedValue(mockQuerySnapshot);
      query.mockReturnValue('mock-query');
      orderBy.mockReturnValue('mock-orderBy');

      const result = await getAllRepairRequests();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 'doc1', customerName: 'John', status: 'pending' });
      expect(result[1]).toEqual({ id: 'doc2', customerName: 'Jane', status: 'completed' });
      expect(getDocs).toHaveBeenCalledTimes(1);
      expect(orderBy).toHaveBeenCalledWith('timestamp', 'desc');
    });

    it('should return empty array when no requests exist', async () => {
      const mockQuerySnapshot = {
        forEach: (callback) => []
      };

      getDocs.mockResolvedValue(mockQuerySnapshot);

      const result = await getAllRepairRequests();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle Firestore errors gracefully', async () => {
      getDocs.mockRejectedValue(new Error('Network error'));

      await expect(getAllRepairRequests()).rejects.toThrow('Failed to fetch repair requests');
    });

    it('should order requests by timestamp in descending order', async () => {
      const mockQuerySnapshot = {
        forEach: () => {}
      };

      getDocs.mockResolvedValue(mockQuerySnapshot);
      query.mockReturnValue('mock-query');
      orderBy.mockReturnValue('mock-orderBy');

      await getAllRepairRequests();

      expect(query).toHaveBeenCalled();
      expect(orderBy).toHaveBeenCalledWith('timestamp', 'desc');
    });
  });
});
