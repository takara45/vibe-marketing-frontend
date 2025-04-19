// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
// The extend-expect import is no longer needed in newer versions of jest-dom

// Mock fetch globally
global.fetch = jest.fn();

// Mock window.matchMedia which is not available in Jest
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
