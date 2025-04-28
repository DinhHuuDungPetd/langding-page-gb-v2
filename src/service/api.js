const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.greenlab.vn';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const api = {
    // Contact Form
    submitContactForm: async (data) => {
        const response = await fetch(`${BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    // Appointment Booking
    bookAppointment: async (data) => {
        const response = await fetch(`${BASE_URL}/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    // Get Services
    getServices: async () => {
        const response = await fetch(`${BASE_URL}/services`);
        return handleResponse(response);
    },

    // Get Service Details
    getServiceDetails: async (id) => {
        const response = await fetch(`${BASE_URL}/services/${id}`);
        return handleResponse(response);
    },

    // Get News
    getNews: async () => {
        const response = await fetch(`${BASE_URL}/news`);
        return handleResponse(response);
    },

    // Get News Details
    getNewsDetails: async (id) => {
        const response = await fetch(`${BASE_URL}/news/${id}`);
        return handleResponse(response);
    },

    // Get Partners
    getPartners: async () => {
        const response = await fetch(`${BASE_URL}/partners`);
        return handleResponse(response);
    },

    // Get Certificates
    getCertificates: async () => {
        const response = await fetch(`${BASE_URL}/certificates`);
        return handleResponse(response);
    },

    // Get Experts
    getExperts: async () => {
        const response = await fetch(`${BASE_URL}/experts`);
        return handleResponse(response);
    },

    // Get Test Results
    getTestResults: async (id) => {
        const response = await fetch(`${BASE_URL}/test-results/${id}`);
        return handleResponse(response);
    },

    // Submit Test Results
    submitTestResults: async (data) => {
        const response = await fetch(`${BASE_URL}/test-results`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    }
}; 