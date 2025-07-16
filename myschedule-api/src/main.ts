import { mockEmployee, mockScheduledShiftsData } from "../lib/mock-data";
import './index.css'

/**
 * Initialize the test page by setting up the mock data and intercepting fetch requests
 */
function initTestPage() {
  const reactElement = document.getElementById('react');
  if (reactElement) {
    reactElement.dataset.targetEmployee = btoa(JSON.stringify(mockEmployee));
    reactElement.dataset.mockApiResponse = JSON.stringify(mockScheduledShiftsData);
  } else {
    console.error('Could not find #react element to set employee data');
  }
}

document.addEventListener('DOMContentLoaded', initTestPage);
