// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkBlocked') {
    const currentUrl = window.location.href;
    const isBlocked = message.blockedUrls.some(url => currentUrl.includes(url));
    if (isBlocked) {
      window.stop(); // Stop the page from loading
      document.body.innerHTML = '<h1>This page is blocked by Site Blocker</h1>'; // Display a blocked message
    }
  }
});

// Check if the current page is blocked when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ action: 'checkBlocked' });
});

// Monitor client-side navigation (e.g., clicking links)
const observer = new MutationObserver(() => {
  chrome.runtime.sendMessage({ action: 'checkBlocked' });
});

observer.observe(document.body, { childList: true, subtree: true });