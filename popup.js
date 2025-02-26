document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('blockPage').addEventListener('click', () => handleBlock('page'));
  document.getElementById('blockSite').addEventListener('click', () => handleBlock('site'));
});

async function handleBlock(type) {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tabs[0].url);
  const duration = document.getElementById('duration').value;
  
  const blockData = {
    target: type === 'page' ? url.href : url.hostname,
    type: type,
    expires: Date.now() + (duration === 'week' ? 604800000 : 2592000000)
  };

  chrome.runtime.sendMessage({ action: 'addBlock', data: blockData });
  window.close();
}