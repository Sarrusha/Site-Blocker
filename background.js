let ruleIdCounter = 0;

// Keep service worker alive
if (chrome.alarms) {
  chrome.alarms.create('keepAlive', { periodInMinutes: 1 });
  chrome.alarms.onAlarm.addListener(() => {
    console.log('Service worker kept alive');
  });
} else {
  console.error('chrome.alarms is not available');
}

// Handle messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'addBlock') {
    console.log('Message received:', message); // Log received message
    addBlockingRule(message.data);
  } else if (message.action === 'checkBlocked') {
    // Send blocked URLs to the content script
    chrome.storage.sync.get('rules', ({ rules = [] }) => {
      const blockedUrls = rules.map(rule => rule.target);
      sendResponse({ blockedUrls });
    });
    return true; // Required for async sendResponse
  }
});

async function addBlockingRule(blockData) {
  console.log('Adding blocking rule:', blockData); // Log block data

  // Get current rules and generate new ID
  const { rules = [] } = await chrome.storage.sync.get('rules');
  const ruleId = Math.floor(Date.now() / 1000); // Convert to integer (seconds since epoch)

  // Create new rule
  const newRule = {
    id: ruleId, // Ensure this is an integer
    priority: 1,
    action: { type: 'block' },
    condition: {
      urlFilter: blockData.type === 'page' ? blockData.target : `||${blockData.target}^`,
      resourceTypes: ['main_frame']
    }
  };

  // Update dynamic rules
  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [newRule],
      removeRuleIds: []
    });
    console.log('Dynamic rule added successfully'); // Log success
  } catch (error) {
    console.error('Error adding dynamic rule:', error); // Log error
  }

  // Store rule information
  rules.push({ ...blockData, ruleId });
  await chrome.storage.sync.set({ rules });
  console.log('Rule stored successfully'); // Log success
}

// Cleanup expired rules every minute
setInterval(async () => {
  const { rules = [] } = await chrome.storage.sync.get('rules');
  const now = Date.now();
  const validRules = [];
  const expiredRules = [];

  rules.forEach(rule => {
    if (rule.expires > now) validRules.push(rule);
    else expiredRules.push(rule.ruleId);
  });

  if (expiredRules.length > 0) {
    try {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: expiredRules
      });
      await chrome.storage.sync.set({ rules: validRules });
      console.log('Expired rules cleaned up'); // Log cleanup
    } catch (error) {
      console.error('Error cleaning up expired rules:', error); // Log error
    }
  }
}, 60000);