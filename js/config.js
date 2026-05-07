/**
 * Configuration file for Sharma Mobile Repair Website
 * 
 * IMPORTANT: Replace these placeholder values with your actual backend API endpoints
 * For production, use environment variables or a secure configuration management system
 */

const CONFIG = {
    // API Base URL - Replace with your actual backend URL
    API_BASE_URL: 'https://sharma-mobile-repair-api.onrender.com/api',
    
    // API Endpoints
    ENDPOINTS: {
        REPAIR_REQUESTS: '/repair-requests',
        ACCESSORIES: '/accessories',
        ADMIN_LOGIN: '/admin/login',
        CHANGE_PASSWORD: '/admin/change-password',
        CHANGE_USERNAME: '/admin/change-username',
        UPLOAD_IMAGE: '/upload'
    },
    
    // File Upload Settings
    UPLOAD: {
        MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB in bytes
        ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        MAX_FILES: 5
    },
    
    // Form Validation
    VALIDATION: {
        PHONE_PATTERN: /^[0-9]{10}$/,
        EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    
    // UI Settings
    UI: {
        LOADING_DELAY: 300, // milliseconds
        SUCCESS_MESSAGE_DURATION: 5000, // milliseconds
        ERROR_MESSAGE_DURATION: 7000 // milliseconds
    }
};

// Freeze the config object to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.ENDPOINTS);
Object.freeze(CONFIG.UPLOAD);
Object.freeze(CONFIG.VALIDATION);
Object.freeze(CONFIG.UI);
