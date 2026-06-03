import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export async function submitContactForm(data) {
  // In production, replace with your actual API endpoint
  // For demo purposes we simulate a successful response
  if (import.meta.env.DEV) {
    await new Promise((resolve) => setTimeout(resolve, 1400));
    // Simulate occasional error for testing:
    // if (Math.random() < 0.2) throw new Error('Network error');
    return { success: true, message: 'Your message has been received. We\'ll be in touch within 24 hours.' };
  }
  const response = await api.post('/contact', data);
  return response.data;
}
