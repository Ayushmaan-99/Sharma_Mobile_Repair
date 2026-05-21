/**
 * Main JavaScript file for Sharma Mobile Repair Website
 * Handles all frontend interactions and API calls
 */

// ===================================
// Utility Functions
// ===================================

/**
 * Show loading state on button
 */
function showButtonLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    if (btnText) btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'inline-block';
    button.disabled = true;
}

/**
 * Hide loading state on button
 */
function hideButtonLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    if (btnText) btnText.style.display = 'inline';
    if (btnLoader) btnLoader.style.display = 'none';
    button.disabled = false;
}

/**
 * Show message to user
 */
function showMessage(elementId, message, type = 'success') {
    const messageEl = document.getElementById(elementId);
    if (!messageEl) return;
    
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    messageEl.style.display = 'block';
    
    // Auto-hide after duration
    const duration = type === 'success' ? CONFIG.UI.SUCCESS_MESSAGE_DURATION : CONFIG.UI.ERROR_MESSAGE_DURATION;
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, duration);
}

/**
 * Validate phone number
 */
function validatePhone(phone) {
    return CONFIG.VALIDATION.PHONE_PATTERN.test(phone);
}

/**
 * Validate email
 */
function validateEmail(email) {
    if (!email) return true; // Email is optional
    return CONFIG.VALIDATION.EMAIL_PATTERN.test(email);
}

/**
 * Validate file
 */
function validateFile(file) {
    // Check file type
    if (!CONFIG.UPLOAD.ALLOWED_TYPES.includes(file.type)) {
        return { valid: false, error: `Invalid file type: ${file.name}. Only JPEG, PNG, and WEBP images are allowed.` };
    }
    
    // Check file size
    if (file.size > CONFIG.UPLOAD.MAX_FILE_SIZE) {
        return { valid: false, error: `File too large: ${file.name}. Maximum size is 5MB.` };
    }
    
    return { valid: true };
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(Number(price) || 0);
}

// ===================================
// Navigation
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Sticky navbar on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===================================
// FAQ Accordion
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// ===================================
// Image Upload & Preview
// ===================================

let selectedFiles = [];

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('images');
    const imagePreview = document.getElementById('imagePreview');
    
    if (fileInput && imagePreview) {
        fileInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            
            // Validate each file
            for (const file of files) {
                const validation = validateFile(file);
                if (!validation.valid) {
                    showMessage('formMessage', validation.error, 'error');
                    continue;
                }
                
                // Check max files limit
                if (selectedFiles.length >= CONFIG.UPLOAD.MAX_FILES) {
                    showMessage('formMessage', `Maximum ${CONFIG.UPLOAD.MAX_FILES} files allowed`, 'error');
                    break;
                }
                
                const fileEntry = {
                    id: `${file.name}-${file.size}-${file.lastModified}`,
                    file
                };

                selectedFiles.push(fileEntry);
                displayImagePreview(fileEntry);
            }
            
            // Clear the file input
            fileInput.value = '';
        });
        
        // Drag and drop support
        const fileLabel = document.querySelector('.file-label');
        if (fileLabel) {
            fileLabel.addEventListener('dragover', (e) => {
                e.preventDefault();
                fileLabel.style.borderColor = 'var(--secondary-color)';
            });
            
            fileLabel.addEventListener('dragleave', () => {
                fileLabel.style.borderColor = 'var(--border-color)';
            });
            
            fileLabel.addEventListener('drop', (e) => {
                e.preventDefault();
                fileLabel.style.borderColor = 'var(--border-color)';
                
                const files = Array.from(e.dataTransfer.files);
                fileInput.files = e.dataTransfer.files;
                fileInput.dispatchEvent(new Event('change'));
            });
        }
    }
});

/**
 * Display image preview
 */
function displayImagePreview(fileEntry) {
    const imagePreview = document.getElementById('imagePreview');
    if (!imagePreview) return;

    const { id, file } = fileEntry;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';

        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = `Preview of ${file.name}`;

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'preview-remove';
        removeButton.setAttribute('aria-label', `Remove ${file.name}`);
        removeButton.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
        removeButton.addEventListener('click', () => removeImage(id));

        previewItem.appendChild(img);
        previewItem.appendChild(removeButton);
        imagePreview.appendChild(previewItem);
    };
    
    reader.readAsDataURL(file);
}

/**
 * Remove image from preview
 */
function removeImage(fileId) {
    selectedFiles = selectedFiles.filter(fileEntry => fileEntry.id !== fileId);
    
    // Re-render preview
    const imagePreview = document.getElementById('imagePreview');
    if (imagePreview) {
        imagePreview.innerHTML = '';
        selectedFiles.forEach(fileEntry => displayImagePreview(fileEntry));
    }
}

// ===================================
// Repair Request Form Submission
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const repairForm = document.getElementById('repairForm');
    
    if (repairForm) {
        repairForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(repairForm);
            
            // Validate phone
            const phone = formData.get('phone');
            if (!validatePhone(phone)) {
                showMessage('formMessage', 'Please enter a valid 10-digit phone number', 'error');
                return;
            }
            
            // Validate email if provided
            const email = formData.get('email');
            if (email && !validateEmail(email)) {
                showMessage('formMessage', 'Please enter a valid email address', 'error');
                return;
            }
            
            // Add selected images to form data
            selectedFiles.forEach(({ file }) => {
                formData.append('images', file);
            });
            
            // Show loading state
            const submitButton = repairForm.querySelector('button[type="submit"]');
            showButtonLoading(submitButton);
            
            try {
                // Send to backend API
                const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.REPAIR_REQUESTS}`, {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    throw new Error('Failed to submit repair request');
                }
                
                const result = await response.json();
                
                // Show success message
                showMessage('formMessage', 'Repair request submitted successfully! We will contact you soon.', 'success');
                
                // Reset form
                repairForm.reset();
                selectedFiles = [];
                document.getElementById('imagePreview').innerHTML = '';
                
            } catch (error) {
                console.error('Error submitting repair request:', error);
                showMessage('formMessage', 'Failed to submit repair request. Please try again or contact us directly.', 'error');
            } finally {
                hideButtonLoading(submitButton);
            }
        });
    }
});

// ===================================
// Load Accessories
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    loadAccessories();
});

/**
 * Load accessories from backend
 */
async function loadAccessories() {
    const accessoriesGrid = document.getElementById('accessoriesGrid');
    if (!accessoriesGrid) return;
    
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.ACCESSORIES}`);
        
        if (!response.ok) {
            throw new Error('Failed to load accessories');
        }
        
        const accessories = await response.json();
        
        // Clear loading skeleton
        accessoriesGrid.innerHTML = '';
        
        if (accessories.length === 0) {
            accessoriesGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: var(--text-light);">No accessories available at the moment.</p>';
            return;
        }
        
        // Render accessories
        accessories.forEach(accessory => {
            const card = createAccessoryCard(accessory);
            accessoriesGrid.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading accessories:', error);
        accessoriesGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: var(--error-color);">Failed to load accessories. Please refresh the page.</p>';
    }
}

/**
 * Create accessory card element
 */
function createAccessoryCard(accessory) {
    const card = document.createElement('div');
    card.className = 'accessory-card';
    
    const statusClass = accessory.available ? 'status-available' : 'status-unavailable';
    const statusText = accessory.available ? 'Available' : 'Out of Stock';

    const image = document.createElement('img');
    image.src = accessory.image;
    image.alt = accessory.name || 'Mobile accessory';
    image.className = 'accessory-image';
    image.loading = 'lazy';

    const content = document.createElement('div');
    content.className = 'accessory-content';

    const name = document.createElement('h3');
    name.className = 'accessory-name';
    name.textContent = accessory.name;

    const description = document.createElement('p');
    description.className = 'accessory-description';
    description.textContent = accessory.description;

    const footer = document.createElement('div');
    footer.className = 'accessory-footer';

    const price = document.createElement('span');
    price.className = 'accessory-price';
    price.textContent = formatPrice(accessory.price);

    const status = document.createElement('span');
    status.className = `accessory-status ${statusClass}`;
    status.textContent = statusText;

    footer.appendChild(price);
    footer.appendChild(status);
    content.appendChild(name);
    content.appendChild(description);
    content.appendChild(footer);
    card.appendChild(image);
    card.appendChild(content);
    
    return card;
}

// ===================================
// Console Welcome Message
// ===================================

console.log('%cSharma Mobile Repair', 'font-size: 24px; font-weight: bold; color: #1e3a8a;');
console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #06b6d4;');
console.log('%cFor support, contact: info@sharmamobilerepair.com', 'font-size: 12px; color: #6b7280;');
