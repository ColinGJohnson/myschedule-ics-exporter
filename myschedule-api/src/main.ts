import { mockEmployee, mockScheduledShiftsData } from "../lib/mock-data";
import './index.css'

/**
 * Initialize the test page by setting up the mock data and intercepting fetch requests
 */
function initTestPage() {
  setupEmployeeData();
  setupFetchInterceptor();
}

/**
 * Set up the employee data by encoding it as base64 and setting it as a data attribute
 */
function setupEmployeeData() {
  const encodedEmployeeData = btoa(JSON.stringify(mockEmployee));
  const reactElement = document.getElementById('react');
  if (reactElement) {
    reactElement.dataset.targetEmployee = encodedEmployeeData;
  } else {
    console.error('Could not find #react element to set employee data');
  }
}

/**
 * Set up the fetch interceptor to intercept requests for scheduled shifts
 */
function setupFetchInterceptor() {
  // Store the original fetch function
  const originalFetch = window.fetch;

  // Override the fetch function to intercept requests
  window.fetch = function(url: RequestInfo | URL, options?: RequestInit) {
    if (url.toString().includes('/api/v1/employee/401/scheduled-shifts/')) {
      console.log('Intercepting fetch request for scheduled shifts');

      const mockResponse = {
        data: mockScheduledShiftsData
      };

      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse)
      } as Response);
    }

    // For all other requests, use the original fetch
    return originalFetch.apply(window, [url, options] as [RequestInfo, RequestInit]);
  };

  console.log('Fetch interceptor set up successfully');
}

document.addEventListener('DOMContentLoaded', initTestPage);
