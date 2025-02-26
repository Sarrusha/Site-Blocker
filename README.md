# Site-Blocker

![Example blocked page](https://github.com/user-attachments/assets/316f0d0c-28df-4327-9db9-a4b55b7dabc3)  

*Final result, free yourself from distractions!*

#### Why I did this?
I wanted a straightforward, no-nonsense extension that prioritizes privacy and simplicity, helping me block my favorite distracting sites to boost productivity. Ideal for work sprints, it lets you stay distraction-free for a week or even a month at a time.
Plus, it automatically clears expired rules to keep your blocklist clean and up-to-date!

---

## **HOW TO USE IT**

1. Navigate to any website you want to block.
2. Click on the **Site Blocker** extension icon.
3. Select the duration (1 week or 1 month).
4. Choose either **Block this page** or **Block entire website**.
5. The page or website will be blocked immediately.

## WHERE IS THE BLOCKED LIST?
*You can find the blocked site list this way*  
Go to Extensions -> Manage Extensions.
You'll see Site Blocker. Under its title, click on Details.
It will open a new page. Scroll down near the end and click on Extension Options. Here you will see the active list.

![Blocked list examples   how long](https://github.com/user-attachments/assets/651ef3b2-482f-4c5c-8911-fc0405e81e2d)  
*Example of blocked websites. Notice both specific and wide domain blocks, and block expiration dates.*


### **Features**

1. **Block Specific Pages or Entire Websites**:
   - Block the current page you're on for a duration of your choice, selected from the drop-down menu.
   - Block an entire website (all pages under the same domain) using the duration already set in the drop-down menu.

2. **Customizable Block Duration**:
   - Choose between blocking for **1 week** or **1 month**. The default is 1 week. Just click on one of the two options, and it will block the site for the selected time period.

3. **Automatic Cleanup**:
   - Expired blocking rules are automatically removed every minute, ensuring your blocklist stays clean.

4. **Real-Time Blocking**:
   - The extension checks if the current page is blocked as soon as the page loads, and it also monitors client-side navigation (e.g., clicking links) to ensure blocked pages are not accessed.

2. **Background Script**:
   - The background script handles the creation and removal of blocking rules using Chrome's `declarativeNetRequest` API.
   - It also listens for messages from the popup and content scripts to add new blocking rules or check if a page is blocked.

3. **Content Script**:
   - The content script runs on every page and checks if the current URL is blocked. If it is, the page is stopped from loading, and a message is displayed indicating that the page is blocked.

4. **Options Page**:
   - The options page displays a list of all currently blocked websites or pages, along with their expiration dates.

![Block Lenght](https://github.com/user-attachments/assets/f9918b88-436d-48ee-81f4-d0de75381177)  
*Select lenght BEFORE clicking one of the Block commands!*

---

### **More technical stuff**

**Permissions**:
  - `storage`: To store and retrieve blocking rules.
  - `tabs`: To get the current tab's URL.
  - `declarativeNetRequest`: To dynamically add and remove blocking rules.
  - `alarms`: To keep the service worker alive.
- **Host Permissions**: `<all_urls>` to allow blocking any website.
- **Content Scripts**: Injected into all pages to check if the current URL is blocked.
- **Background Script**: Handles the core logic of adding and removing blocking rules.

---
### **Installation from Chrome Chrome Web Store**


### **Installation from github** 

1. Clone the repository:
   ```bash
   git clone [https://github.com/Sarrusha/Site-Blocker.git]
   ```
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top right corner).
4. Click **Load unpacked** and select the cloned repository folder.
5. The **Site Blocker** extension will now be available in your Chrome extensions.

---


### **Contributing**

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Submit a pull request.

---

### **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
