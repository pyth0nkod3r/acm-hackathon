# Integration Tests

This directory contains comprehensive integration tests for the hackathon React application. These tests verify that different components, services, and user workflows work together correctly.

## Test Coverage

### 1. Form Submission Workflows (`form-submission.test.tsx`)

- **Registration Form Integration**
  - Complete form submission with valid data
  - Form validation and error handling
  - File upload functionality
  - Network error handling
  - Loading states and user feedback

- **Contact Form Integration**
  - Form submission with valid data
  - Client-side validation
  - Server-side error handling
  - Success/error notifications

- **Form Accessibility**
  - ARIA labels and roles
  - Keyboard navigation
  - Screen reader support

### 2. Navigation and Routing (`navigation-routing.test.tsx`)

- **Route Navigation**
  - Navigation to all defined routes
  - 404 error handling
  - Browser back/forward button support
  - Scroll position management

- **Header Navigation**
  - Active navigation highlighting
  - Mobile menu functionality
  - Keyboard navigation
  - Sticky header behavior

- **Breadcrumb Navigation**
  - Correct breadcrumb display
  - Breadcrumb link navigation

- **Page Transitions**
  - Loading states during transitions
  - Animation handling
  - Error recovery

- **Accessibility**
  - Skip links for keyboard users
  - ARIA landmarks
  - Screen reader announcements

### 3. Error Handling and Notifications (`error-notification.test.tsx`)

- **Notification System**
  - Success, error, warning, and info notifications
  - Auto-dismiss functionality
  - Manual dismissal
  - Multiple notification stacking

- **Error Boundary Integration**
  - Component error catching
  - Error recovery options
  - Error isolation
  - Error logging

- **Form Error Handling**
  - API error handling with notifications
  - Network error recovery
  - Validation error display

- **Accessibility in Error Scenarios**
  - Screen reader announcements
  - Focus management for errors
  - Clear error descriptions
  - Keyboard navigation during errors

### 4. Responsive Behavior and Mobile Interactions (`responsive-mobile.test.tsx`)

- **Responsive Layout**
  - Mobile, tablet, and desktop layouts
  - Viewport orientation changes
  - Dynamic layout adaptation

- **Mobile Navigation**
  - Mobile menu open/close
  - Touch interactions
  - Focus trapping
  - Gesture support

- **Touch Interactions**
  - Swipe gestures
  - Touch-friendly button sizes
  - Touch focus handling
  - Pull-to-refresh

- **Form Responsiveness**
  - Mobile form layouts
  - Virtual keyboard handling
  - Orientation change handling

- **Performance on Mobile**
  - Lazy image loading
  - Debounced resize events
  - Optimized animations

- **Mobile Accessibility**
  - Focus visibility on touch devices
  - ARIA labels for mobile interactions
  - High contrast mode support

### 5. Basic Integration (`basic-integration.test.tsx`)

- **Core Functionality**
  - Notification system integration
  - Form handling and validation
  - Context provider functionality
  - User interaction handling

## Test Structure

Each test file follows a consistent structure:

```typescript
describe('Feature Integration Tests', () => {
  beforeEach(() => {
    // Setup for each test
  });

  describe('Specific Feature', () => {
    it('should handle specific scenario', async () => {
      // Test implementation
    });
  });
});
```

## Test Utilities

### `setup.ts`

Provides common utilities for integration tests:

- `renderWithProviders()` - Renders components with necessary providers
- Mock API responses
- Test data factories
- Browser API mocks

### Mock Setup

- IntersectionObserver for animations
- ResizeObserver for responsive behavior
- matchMedia for media queries
- fetch for API calls
- scrollTo for navigation

## Running Tests

```bash
# Run all integration tests
npm run test:integration

# Run integration tests in watch mode
npm run test:integration:watch

# Run specific test file
npm run test:integration -- responsive-mobile.test.tsx

# Run with coverage
npm run test:coverage
```

## Test Requirements Coverage

These integration tests fulfill the requirements specified in task 16.2:

✅ **Complete form submission workflows (registration and contact)**

- Registration form with all fields, validation, and file upload
- Contact form with validation and error handling
- Success and error scenarios for both forms

✅ **Navigation and routing functionality across all pages**

- All route navigation testing
- Browser navigation (back/forward)
- Mobile menu navigation
- Breadcrumb navigation

✅ **Error handling and notification scenarios**

- Comprehensive notification system testing
- Error boundary integration
- Form error handling
- Network error scenarios

✅ **Responsive behavior and mobile interactions**

- Mobile, tablet, and desktop layouts
- Touch interactions and gestures
- Mobile menu functionality
- Responsive form handling

## Best Practices

1. **Isolation**: Each test is independent and doesn't rely on others
2. **Realistic Scenarios**: Tests simulate real user interactions
3. **Accessibility**: All tests include accessibility considerations
4. **Error Handling**: Tests cover both success and failure scenarios
5. **Performance**: Tests consider mobile performance implications
6. **User Experience**: Tests verify the complete user journey

## Maintenance

- Update tests when adding new features
- Ensure test data matches current form requirements
- Keep mock responses synchronized with actual API
- Review and update accessibility tests as standards evolve
