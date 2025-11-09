const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const charCount = document.getElementById('charCount');
const successMessage = document.getElementById('successMessage');

// Character counter for message
messageInput.addEventListener('input', () => {
    const count = messageInput.value.length;
    charCount.textContent = count;
    
    if (count > 500) {
        messageInput.value = messageInput.value.substring(0, 500);
        charCount.textContent = 500;
    }
});

// Clear error on input
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
        clearError(input);
    });
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;

    // Validate name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'nameError');
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'emailError');
        document.getElementById('emailError').textContent = 'Please enter your email address';
        isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'emailError');
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Validate message
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'messageError');
        isValid = false;
    }

    // If all valid, show success
    if (isValid) {
        // Here you would typically send data to a server
        // Example: sendFormData(nameInput.value, emailInput.value, messageInput.value);
        
        successMessage.classList.add('show');
        form.reset();
        charCount.textContent = '0';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
});

function showError(input, errorId) {
    input.classList.add('error');
    document.getElementById(errorId).classList.add('show');
}

function clearError(input) {
    input.classList.remove('error');
    const errorId = input.id + 'Error';
    document.getElementById(errorId).classList.remove('show');
}

// Optional: Add server integration
// Uncomment and modify this function to send data to your backend
/*
async function sendFormData(name, email, message) {
    try {
        const response = await fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your form. Please try again.');
    }
}
*/