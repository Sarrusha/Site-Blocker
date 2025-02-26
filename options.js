document.addEventListener('DOMContentLoaded', async () => {
  const { rules = [] } = await chrome.storage.sync.get('rules');
  const list = document.getElementById('blockList');
  
  rules.forEach(rule => {
    const li = document.createElement('li');
    li.textContent = `${rule.target} - Expires: ${new Date(rule.expires).toLocaleString()}`;
    list.appendChild(li);
  });
});