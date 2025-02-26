# Site-Blocker

Features:
Block current page or entire site
Choose duration (1 week or 1 month)
Automatic expiration of blocks
View active blocks in options page
Persistent storage of blocking rules

The extension uses Chrome's declarativeNetRequest API for blocking and follows Manifest V3 requirements. Blocked sites are automatically unblocked after the selected duration, and you can view all active blocks in the options page.

How It Works
Content Script:
Monitors the DOM for changes (e.g., client-side navigation).
Checks if the current URL is blocked by querying the background script.
If the page is blocked, it stops the page from loading and displays a blocked message.

Background Script:
Maintains the list of blocked URLs.
Responds to content script requests with the list of blocked URLs.

Blocking Logic:
Full page loads are blocked by declarativeNetRequest.
Client-side navigation is blocked by the content script.
