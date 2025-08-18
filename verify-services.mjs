/**
 * Verification script for API services
 */

// Mock the environment for testing
process.env.VITE_USE_MOCK_API = 'true';

// Test data
const testRegistrationData = {
  teamName: 'Test Team',
  teamSize: 2,
  teamLeader: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    role: 'Team Leader',
    country: 'Ghana',
    nationality: 'Ghana',
    age: 25,
  },
  teamMembers: [
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567891',
      role: 'Developer',
      country: 'Ghana',
      nationality: 'Ghana',
      age: 24,
    },
  ],
  projectTitle: 'Test Project',
  ideaSummary:
    'This is a test project idea summary that meets the minimum character requirement for validation.',
  problemSolving:
    'This project solves a test problem with innovative solutions that address real-world challenges.',
  technology: 'React, TypeScript, Node.js, and other modern technologies',
  alignment:
    'This project aligns with ACM objectives by promoting digital trade and cross-border commerce.',
  hasPrototype: false,
  challengeAreas: ['Digital Trade Infrastructure'],
  declarations: [
    'I confirm that all information provided is accurate and complete',
  ],
};

const testContactData = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Subject for Contact Form',
  message:
    'This is a test message for the contact form that meets the minimum character requirements.',
};

async function testServices() {
  try {
    console.log('🧪 Testing API Services...\n');

    // Import services dynamically
    const { mockAPIService } = await import('./src/services/mockService.js');

    console.log('✅ Services imported successfully');

    // Test registration service
    console.log('\n📝 Testing Registration Service...');
    const registrationResult =
      await mockAPIService.submitRegistration(testRegistrationData);
    console.log('Registration Result:', registrationResult);

    // Test contact service
    console.log('\n📧 Testing Contact Service...');
    const contactResult = await mockAPIService.submitContact(testContactData);
    console.log('Contact Result:', contactResult);

    // Test file validation
    console.log('\n📎 Testing File Validation...');
    const mockFile = {
      size: 1024 * 1024, // 1MB
      type: 'application/pdf',
      name: 'test.pdf',
    };
    const fileValidation = mockAPIService.validateFileUpload(mockFile);
    console.log('File Validation Result:', fileValidation);

    console.log('\n✅ All API service tests completed successfully!');
  } catch (error) {
    console.error('❌ Service test failed:', error);
    process.exit(1);
  }
}

testServices();
