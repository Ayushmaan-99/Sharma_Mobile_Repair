/**
 * Admin Panel JavaScript
 * Sharma Mobile Repair
 */

// ===================================
// Authentication State
// ===================================

let isAuthenticated = false;
let currentUser = null;

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});

/**
 * Check if user is authenticated
 */
function checkAuth() {
    const token = localStorage.getItem('adminToken');
    const username = localStorage.getItem('adminUsername');
    
    if (token && username) {
        isAuthenticated = true;
        currentUser = username;
        showDashboard();
    } else {
        showLoginPage();
    }
}

/**
 * Show login page
 */
function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

/**
 * Show dashboard
 */
function showDashboard() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'grid';
    document.getElementById('adminUsername').textContent = currentUser;
    
    // Load initial data
    loadAnalytics();
}

// ===================================
// Login Form
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const submitButton = loginForm.querySelector('button[type="submit"]');
            showButtonLoading(submitButton);
            
            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.ADMIN_LOGIN}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                
                if (!response.ok) {
                    throw new Error('Invalid credentials');
                }
                
                const result = await response.json();
                
                // Store authentication
                localStorage.setItem('adminToken', result.token);
                localStorage.setItem('adminUsername', username);
                localStorage.setItem('lastLogin', new Date().toISOString());
                
                isAuthenticated = true;
                currentUser = username;
                
                // Show dashboard
                showDashboard();
                
            } catch (error) {
                console.error('Login error:', error);
                showMessage('loginMessage', 'Invalid username or password', 'error');
            } finally {
                hideButtonLoading(submitButton);
            }
        });
    }
});

// ===================================
// Logout
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUsername');
                isAuthenticated = false;
                currentUser = null;
                showLoginPage();
            }
        });
    }
});

// ===================================
// Navigation
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const section = this.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            showSection(section);
        });
    });
});

/**
 * Show specific section
 */
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const sectionMap = {
        'analytics': 'analyticsSection',
        'accessories': 'accessoriesSection',
        'requests': 'requestsSection',
        'recycle-bin': 'recycleBinSection',
        'settings': 'settingsSection'
    };
    
    const titleMap = {
        'analytics': 'Analytics Dashboard',
        'accessories': 'Manage Accessories',
        'requests': 'Repair Requests',
        'recycle-bin': 'Recycle Bin',
        'settings': 'Settings'
    };
    
    const sectionId = sectionMap[sectionName];
    const sectionTitle = titleMap[sectionName];
    
    if (sectionId) {
        document.getElementById(sectionId).style.display = 'block';
        document.getElementById('sectionTitle').textContent = sectionTitle;
        
        // Load section data
        if (sectionName === 'analytics') {
            loadAnalytics();
        } else if (sectionName === 'accessories') {
            loadAccessories();
        } else if (sectionName === 'requests') {
            loadRepairRequests();
        } else if (sectionName === 'recycle-bin') {
            loadRecycleBin();
        } else if (sectionName === 'settings') {
            loadSettings();
        }
    }
}

// ===================================
// Analytics
// ===================================

async function loadAnalytics() {
    try {
        // Load repair requests
        const requestsResponse = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.REPAIR_REQUESTS}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        
        if (requestsResponse.ok) {
            const requests = await requestsResponse.json();
            
            // Update stats
            document.getElementById('totalRequests').textContent = requests.length;
            document.getElementById('pendingRequests').textContent = 
                requests.filter(r => r.status === 'pending').length;
            document.getElementById('completedRequests').textContent = 
                requests.filter(r => r.status === 'completed').length;
            
            // Show recent requests
            displayRecentRequests(requests.slice(0, 5));
        }
        
        // Load accessories count
        const accessoriesResponse = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.ACCESSORIES}`);
        
        if (accessoriesResponse.ok) {
            const accessories = await accessoriesResponse.json();
            document.getElementById('totalAccessories').textContent = accessories.length;
        }
        
    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

/**
 * Display recent requests
 */
function displayRecentRequests(requests) {
    const container = document.getElementById('recentRequests');
    
    if (requests.length === 0) {
        container.innerHTML = '<p class="empty-state">No repair requests yet</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Device</th>
                <th>Status</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            ${requests.map(request => `
                <tr>
                    <td data-label="Customer">${escapeHtml(request.customerName)}</td>
                    <td data-label="Phone">${escapeHtml(request.phone)}</td>
                    <td data-label="Device">${escapeHtml(request.deviceModel)}</td>
                    <td data-label="Status"><span class="status-badge status-${escapeAttribute(request.status)}">${escapeHtml(request.status)}</span></td>
                    <td data-label="Date">${formatDate(request.createdAt)}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

// ===================================
// Accessories Management
// ===================================

let accessories = [];
let editingAccessoryId = null;

async function loadAccessories() {
    const container = document.getElementById('accessoriesTable');
    container.innerHTML = '<p class="loading-text"><i class="fas fa-spinner fa-spin"></i> Loading accessories...</p>';
    
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.ACCESSORIES}`);
        
        if (!response.ok) {
            throw new Error('Failed to load accessories');
        }
        
        accessories = await response.json();
        displayAccessories(accessories);
        
    } catch (error) {
        console.error('Error loading accessories:', error);
        container.innerHTML = '<p class="empty-state"><i class="fas fa-exclamation-circle"></i><br>Failed to load accessories</p>';
    }
}

/**
 * Display accessories table
 */
function displayAccessories(items) {
    const container = document.getElementById('accessoriesTable');
    
    if (items.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-shopping-bag"></i><p>No accessories added yet</p></div>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${items.map(item => `
                <tr>
                    <td data-label="Image"><img src="${escapeAttribute(item.image)}" alt="${escapeAttribute(item.name)}" class="table-thumb"></td>
                    <td data-label="Name">${escapeHtml(item.name)}</td>
                    <td data-label="Price">${formatPrice(item.price)}</td>
                    <td data-label="Status"><span class="status-badge ${item.available ? 'status-completed' : 'status-pending'}">${item.available ? 'Available' : 'Out of Stock'}</span></td>
                    <td data-label="Actions" class="table-actions">
                        <button class="btn-icon btn-edit" onclick="editAccessory('${item.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon btn-delete" onclick="deleteAccessory('${item.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

// Add Accessory Button
document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('addAccessoryBtn');
    
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            openAccessoryModal();
        });
    }
});

/**
 * Open accessory modal
 */
function openAccessoryModal(accessoryId = null) {
    const modal = document.getElementById('accessoryModal');
    const form = document.getElementById('accessoryForm');
    const modalTitle = document.getElementById('modalTitle');
    
    // Reset form
    form.reset();
    document.getElementById('currentImage').innerHTML = '';
    editingAccessoryId = accessoryId;
    
    if (accessoryId) {
        // Edit mode
        modalTitle.textContent = 'Edit Accessory';
        const accessory = accessories.find(a => a.id === accessoryId);
        
        if (accessory) {
            document.getElementById('accessoryId').value = accessory.id;
            document.getElementById('accessoryName').value = accessory.name;
            document.getElementById('accessoryPrice').value = accessory.price;
            document.getElementById('accessoryDescription').value = accessory.description;
            document.getElementById('accessoryAvailable').value = accessory.available.toString();
            
            // Show current image
            document.getElementById('currentImage').innerHTML = `
                <img src="${escapeAttribute(accessory.image)}" alt="Current accessory image" class="current-accessory-image">
            `;
            
            // Make image optional for edit
            document.getElementById('accessoryImage').removeAttribute('required');
        }
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Accessory';
        document.getElementById('accessoryImage').setAttribute('required', 'required');
    }
    
    modal.classList.add('active');
}

/**
 * Close accessory modal
 */
function closeAccessoryModal() {
    document.getElementById('accessoryModal').classList.remove('active');
    editingAccessoryId = null;
}

// Modal close buttons
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAccessoryModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeAccessoryModal);
    }
});

// Accessory Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('accessoryForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            
            showButtonLoading(submitButton);
            
            try {
                const url = editingAccessoryId 
                    ? `${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.ACCESSORIES}/${editingAccessoryId}`
                    : `${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.ACCESSORIES}`;
                
                const method = editingAccessoryId ? 'PUT' : 'POST';
                
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                    body: formData
                });
                
                if (!response.ok) {
                    throw new Error('Failed to save accessory');
                }
                
                showMessage('modalMessage', 'Accessory saved successfully!', 'success');
                
                // Reload accessories
                setTimeout(() => {
                    closeAccessoryModal();
                    loadAccessories();
                }, 1500);
                
            } catch (error) {
                console.error('Error saving accessory:', error);
                showMessage('modalMessage', 'Failed to save accessory. Please try again.', 'error');
            } finally {
                hideButtonLoading(submitButton);
            }
        });
    }
});

/**
 * Edit accessory
 */
function editAccessory(id) {
    openAccessoryModal(id);
}

/**
 * Delete accessory
 */
async function deleteAccessory(id) {
    if (!confirm('Are you sure you want to delete this accessory?')) {
        return;
    }
    
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.ACCESSORIES}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete accessory');
        }
        
        // Reload accessories
        loadAccessories();
        
    } catch (error) {
        console.error('Error deleting accessory:', error);
        alert('Failed to delete accessory. Please try again.');
    }
}

// ===================================
// Repair Requests Management
// ===================================

let repairRequests = [];

async function loadRepairRequests() {
    const container = document.getElementById('requestsTable');
    container.innerHTML = '<p class="loading-text"><i class="fas fa-spinner fa-spin"></i> Loading requests...</p>';
    
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.REPAIR_REQUESTS}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load repair requests');
        }
        
        repairRequests = await response.json();
        displayRepairRequests(repairRequests);
        
    } catch (error) {
        console.error('Error loading repair requests:', error);
        container.innerHTML = '<p class="empty-state"><i class="fas fa-exclamation-circle"></i><br>Failed to load repair requests</p>';
    }
}

/**
 * Display repair requests table
 */
function displayRepairRequests(requests) {
    const container = document.getElementById('requestsTable');
    
    if (requests.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-tools"></i><p>No repair requests yet</p></div>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Device</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${requests.map(request => `
                <tr>
                    <td data-label="Customer">${escapeHtml(request.customerName)}</td>
                    <td data-label="Phone">${escapeHtml(request.phone)}</td>
                    <td data-label="Device">${escapeHtml(request.deviceModel)}</td>
                    <td data-label="Issue">${escapeHtml(truncateText(request.issueDescription, 50))}</td>
                    <td data-label="Status"><span class="status-badge status-${escapeAttribute(request.status)}">${escapeHtml(request.status)}</span></td>
                    <td data-label="Date">${formatDate(request.createdAt)}</td>
                    <td data-label="Actions" class="table-actions">
                        <button class="btn-icon btn-view" onclick="viewRequest('${request.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon btn-delete" onclick="deleteRequest('${request.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

/**
 * View request details
 */
function viewRequest(id) {
    const request = repairRequests.find(r => r.id === id);
    if (!request) return;
    
    const modal = document.getElementById('requestModal');
    const detailsContainer = document.getElementById('requestDetails');
    
    detailsContainer.innerHTML = `
        <div class="detail-grid">
            <div class="detail-item">
                <div class="detail-label">Customer Name</div>
                <div class="detail-value">${escapeHtml(request.customerName)}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Phone Number</div>
                <div class="detail-value">${escapeHtml(request.phone)}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Email</div>
                <div class="detail-value">${escapeHtml(request.email || 'Not provided')}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Device Model</div>
                <div class="detail-value">${escapeHtml(request.deviceModel)}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Status</div>
                <div class="detail-value">
                    <span class="status-badge status-${escapeAttribute(request.status)}">${escapeHtml(request.status)}</span>
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Submitted On</div>
                <div class="detail-value">${formatDate(request.createdAt)}</div>
            </div>
        </div>
        
        <div class="detail-item" style="margin-bottom: 1.5rem;">
            <div class="detail-label">Issue Description</div>
            <div class="detail-value">${escapeHtml(request.issueDescription)}</div>
        </div>
        
        ${request.images && request.images.length > 0 ? `
            <div>
                <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Uploaded Images</h3>
                <div class="images-grid">
                    ${request.images.map((image, index) => `
                        <div class="image-item">
                            <img src="${escapeAttribute(image)}" alt="Device image ${index + 1}">
                            <button class="image-download" onclick="downloadImage('${escapeAttribute(escapeJsString(image))}', '${escapeAttribute(escapeJsString(request.customerName))}_${index + 1}')" title="Download">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '<p style="color: var(--text-light);">No images uploaded</p>'}
        
        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
            <button class="btn btn-primary" onclick="updateRequestStatus('${request.id}', 'completed')">
                Mark as Completed
            </button>
            <button class="btn btn-secondary" onclick="updateRequestStatus('${request.id}', 'pending')">
                Mark as Pending
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

/**
 * Close request modal
 */
function closeRequestModal() {
    document.getElementById('requestModal').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('closeRequestModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeRequestModal);
    }
});

/**
 * Update request status
 */
async function updateRequestStatus(id, status) {
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.REPAIR_REQUESTS}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            },
            body: JSON.stringify({ status })
        });
        
        if (!response.ok) {
            throw new Error('Failed to update status');
        }
        
        // Reload requests
        closeRequestModal();
        loadRepairRequests();
        
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Failed to update status. Please try again.');
    }
}

/**
 * Download image
 */
function downloadImage(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Status Filter
document.addEventListener('DOMContentLoaded', function() {
    const statusFilter = document.getElementById('statusFilter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const status = this.value;
            
            if (status === 'all') {
                displayRepairRequests(repairRequests);
            } else {
                const filtered = repairRequests.filter(r => r.status === status);
                displayRepairRequests(filtered);
            }
        });
    }
});

// ===================================
// Utility Functions
// ===================================

function formatDate(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return '-';

    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function truncateText(text, maxLength) {
    text = String(text || '');
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
}

function escapeJsString(value) {
    return String(value ?? '')
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/\r?\n/g, ' ');
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(Number(price) || 0);
}

function showButtonLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    if (btnText) btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'inline-block';
    button.disabled = true;
}

function hideButtonLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    if (btnText) btnText.style.display = 'inline';
    if (btnLoader) btnLoader.style.display = 'none';
    button.disabled = false;
}

function showMessage(elementId, message, type = 'success') {
    const messageEl = document.getElementById(elementId);
    if (!messageEl) return;
    
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    messageEl.style.display = 'block';
    
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 5000);
}

// ===================================
// Settings Section
// ===================================

/**
 * Load settings
 */
function loadSettings() {
    // Update username in settings
    document.getElementById('settingsUsername').textContent = currentUser;
    
    // Set last login (you can store this in localStorage)
    const lastLogin = localStorage.getItem('lastLogin');
    if (lastLogin) {
        document.getElementById('lastLogin').textContent = formatDate(lastLogin);
    } else {
        document.getElementById('lastLogin').textContent = 'First login';
    }
}

// Password Toggle Visibility
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.add('active');
            } else {
                input.type = 'password';
                this.classList.remove('active');
            }
        });
    });
});

// Change Password Form
document.addEventListener('DOMContentLoaded', function() {
    const changePasswordForm = document.getElementById('changePasswordForm');
    
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate passwords match
            if (newPassword !== confirmPassword) {
                showMessage('passwordMessage', 'New passwords do not match!', 'error');
                return;
            }
            
            // Validate password length
            if (newPassword.length < 8) {
                showMessage('passwordMessage', 'Password must be at least 8 characters long!', 'error');
                return;
            }
            
            const submitButton = changePasswordForm.querySelector('button[type="submit"]');
            showButtonLoading(submitButton);
            
            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.CHANGE_PASSWORD}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                    body: JSON.stringify({
                        currentPassword,
                        newPassword
                    })
                });
                
                const result = await response.json();
                
                if (!response.ok) {
                    throw new Error(result.error || 'Failed to change password');
                }
                
                showMessage('passwordMessage', 'Password changed successfully!', 'success');
                
                // Reset form
                changePasswordForm.reset();
                
                // Optional: Logout user after password change
                setTimeout(() => {
                    if (confirm('Password changed successfully! You will be logged out. Please login with your new password.')) {
                        localStorage.removeItem('adminToken');
                        localStorage.removeItem('adminUsername');
                        isAuthenticated = false;
                        currentUser = null;
                        showLoginPage();
                    }
                }, 2000);
                
            } catch (error) {
                console.error('Change password error:', error);
                showMessage('passwordMessage', error.message || 'Failed to change password. Please check your current password.', 'error');
            } finally {
                hideButtonLoading(submitButton);
            }
        });
    }
});

// Change Username Form
document.addEventListener('DOMContentLoaded', function() {
    const changeUsernameForm = document.getElementById('changeUsernameForm');
    
    if (changeUsernameForm) {
        changeUsernameForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentUsernamePassword').value;
            const newUsername = document.getElementById('newUsername').value.trim();
            
            // Validate username length
            if (newUsername.length < 3) {
                showMessage('usernameMessage', 'Username must be at least 3 characters long!', 'error');
                return;
            }
            
            const submitButton = changeUsernameForm.querySelector('button[type="submit"]');
            showButtonLoading(submitButton);
            
            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.CHANGE_USERNAME}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                    body: JSON.stringify({
                        currentPassword,
                        newUsername
                    })
                });
                
                const result = await response.json();
                
                if (!response.ok) {
                    throw new Error(result.error || 'Failed to change username');
                }
                
                showMessage('usernameMessage', 'Username changed successfully!', 'success');
                
                // Update stored username
                localStorage.setItem('adminUsername', newUsername);
                currentUser = newUsername;
                
                // Update UI
                document.getElementById('adminUsername').textContent = newUsername;
                document.getElementById('settingsUsername').textContent = newUsername;
                
                // Reset form
                changeUsernameForm.reset();
                
                // Optional: Show confirmation
                setTimeout(() => {
                    alert('Username changed successfully! Your new username is: ' + newUsername);
                }, 1500);
                
            } catch (error) {
                console.error('Change username error:', error);
                showMessage('usernameMessage', error.message || 'Failed to change username. Please check your password.', 'error');
            } finally {
                hideButtonLoading(submitButton);
            }
        });
    }
});

// ===================================
// Recycle Bin Management
// ===================================

let recycleBinRequests = [];

/**
 * Load recycle bin
 */
async function loadRecycleBin() {
    const container = document.getElementById('recycleBinTable');
    container.innerHTML = '<p class="loading-text"><i class="fas fa-spinner fa-spin"></i> Loading recycle bin...</p>';
    
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.REPAIR_REQUESTS}/recycle-bin/all`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load recycle bin');
        }
        
        recycleBinRequests = await response.json();
        displayRecycleBin(recycleBinRequests);
        
    } catch (error) {
        console.error('Error loading recycle bin:', error);
        container.innerHTML = '<p class="empty-state"><i class="fas fa-exclamation-circle"></i><br>Failed to load recycle bin</p>';
    }
}

/**
 * Display recycle bin table
 */
function displayRecycleBin(requests) {
    const container = document.getElementById('recycleBinTable');
    
    if (requests.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-trash-restore"></i><p>Recycle bin is empty</p></div>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'data-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Device</th>
                <th>Deleted On</th>
                <th>Days Remaining</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${requests.map(request => `
                <tr>
                    <td data-label="Customer">${escapeHtml(request.customerName)}</td>
                    <td data-label="Phone">${escapeHtml(request.phone)}</td>
                    <td data-label="Device">${escapeHtml(request.deviceModel)}</td>
                    <td data-label="Deleted">${formatDate(request.deletedAt)}</td>
                    <td data-label="Days Left">
                        <span class="days-remaining">
                            <i class="fas fa-clock"></i>
                            ${request.daysRemaining} ${request.daysRemaining === 1 ? 'day' : 'days'}
                        </span>
                    </td>
                    <td data-label="Actions" class="table-actions">
                        <button class="btn-icon btn-edit" onclick="restoreRequest('${request.id}')" title="Restore">
                            <i class="fas fa-undo"></i>
                        </button>
                        <button class="btn-icon btn-delete" onclick="permanentDeleteRequest('${request.id}')" title="Delete Permanently">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    container.innerHTML = '';
    container.appendChild(table);
}

/**
 * Delete request (move to recycle bin)
 */
async function deleteRequest(id) {
    if (!confirm('Move this repair request to recycle bin? It will be permanently deleted after 15 days.')) {
        return;
    }
    
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.REPAIR_REQUESTS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete request');
        }
        
        const result = await response.json();
        alert(result.message + ` (Will be permanently deleted in ${result.daysUntilPermanentDelete} days)`);
        
        // Reload requests
        loadRepairRequests();
        
    } catch (error) {
        console.error('Error deleting request:', error);
        alert('Failed to delete request. Please try again.');
    }
}

/**
 * Restore request from recycle bin
 */
async function restoreRequest(id) {
    if (!confirm('Restore this repair request?')) {
        return;
    }
    
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.REPAIR_REQUESTS}/${id}/restore`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to restore request');
        }
        
        const result = await response.json();
        alert(result.message);
        
        // Reload recycle bin
        loadRecycleBin();
        
    } catch (error) {
        console.error('Error restoring request:', error);
        alert('Failed to restore request. Please try again.');
    }
}

/**
 * Permanently delete request
 */
async function permanentDeleteRequest(id) {
    if (!confirm('⚠️ PERMANENTLY DELETE this repair request? This action CANNOT be undone!')) {
        return;
    }
    
    // Double confirmation
    if (!confirm('Are you absolutely sure? All data including images will be permanently deleted.')) {
        return;
    }
    
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.REPAIR_REQUESTS}/${id}/permanent`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to permanently delete request');
        }
        
        const result = await response.json();
        alert(result.message);
        
        // Reload recycle bin
        loadRecycleBin();
        
    } catch (error) {
        console.error('Error permanently deleting request:', error);
        alert('Failed to permanently delete request. Please try again.');
    }
}

/**
 * Empty recycle bin (delete all)
 */
document.addEventListener('DOMContentLoaded', function() {
    const emptyBinBtn = document.getElementById('emptyRecycleBinBtn');
    
    if (emptyBinBtn) {
        emptyBinBtn.addEventListener('click', async function() {
            if (recycleBinRequests.length === 0) {
                alert('Recycle bin is already empty.');
                return;
            }
            
            if (!confirm(`⚠️ PERMANENTLY DELETE all ${recycleBinRequests.length} requests in recycle bin? This action CANNOT be undone!`)) {
                return;
            }
            
            // Double confirmation
            if (!confirm('Are you absolutely sure? All data including images will be permanently deleted.')) {
                return;
            }
            
            try {
                let deletedCount = 0;
                
                for (const request of recycleBinRequests) {
                    const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.REPAIR_REQUESTS}/${request.id}/permanent`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                        }
                    });
                    
                    if (response.ok) {
                        deletedCount++;
                    }
                }
                
                alert(`Successfully deleted ${deletedCount} requests permanently.`);
                loadRecycleBin();
                
            } catch (error) {
                console.error('Error emptying recycle bin:', error);
                alert('Failed to empty recycle bin. Please try again.');
            }
        });
    }
});

// ===================================
// Mobile Menu Toggle
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('adminMobileToggle');
    const sidebar = document.querySelector('.admin-sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    // Show/hide mobile toggle based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 1024) {
            // Mobile/Tablet - Show toggle button
            if (mobileToggle) {
                mobileToggle.style.display = 'flex';
            }
        } else {
            // Desktop - Hide toggle and ensure sidebar is visible
            if (mobileToggle) {
                mobileToggle.style.display = 'none';
            }
            if (sidebar) {
                sidebar.classList.remove('active');
                sidebar.style.left = ''; // Reset any inline styles
            }
            if (overlay) {
                overlay.classList.remove('active');
            }
        }
    }
    
    // Check on load and resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Toggle sidebar on mobile
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (sidebar) sidebar.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            if (sidebar) sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    
    // Close sidebar when clicking a nav item on mobile
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                if (sidebar) sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });
});
