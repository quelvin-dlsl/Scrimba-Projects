# Leads Tracker - Chrome Extension

A practical Chrome browser extension for saving and managing URLs. Perfect for tracking sales leads, research links, or any web pages you want to revisit later.

## Features

- **Save Current Tab:** One-click save of your active browser tab's URL
- **Manual Input:** Enter and save any URL manually
- **Persistent Storage:** All leads saved using Chrome's localStorage
- **Clickable Links:** Each saved URL opens in a new tab when clicked
- **Bulk Delete:** Double-click to clear all saved leads
- **Auto-Load:** Previously saved leads appear when you reopen the extension
- **Compact Design:** Minimal popup interface (400px width) fits perfectly in browser toolbar

## Technologies Used

- **HTML5** - Extension popup structure
- **CSS3** - Clean, functional styling
- **JavaScript** - Core functionality and Chrome API integration
- **Chrome Extension APIs:**
  - `chrome.tabs` - For accessing current tab information
  - `localStorage` - For persistent data storage
- **Manifest V3** - Latest Chrome extension format

## How to Use

### Installation:
1. Download all project files
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the folder containing these files
6. The extension icon will appear in your toolbar

### Usage:
1. **Save Current Tab:** Click "SAVE TAB" to save the URL of your active tab
2. **Save Manual URL:** Type or paste a URL in the input field and click "SAVE INPUT"
3. **View Saved Leads:** All saved URLs appear as clickable links below
4. **Delete All:** Double-click "DELETE ALL" to clear all saved leads

## What I Learned

- Building Chrome browser extensions with Manifest V3
- Using Chrome Extension APIs (`chrome.tabs.query()`)
- Working with localStorage for data persistence
- Using `JSON.stringify()` and `JSON.parse()` for storing arrays
- Event handling with `addEventListener()`
- Template literals for dynamic HTML generation
- Double-click event handling (`dblclick`)
- Chrome extension permissions and manifest configuration
- Opening links in new tabs with `target='_blank'`

## Technical Implementation

**Data Persistence:**
```javascript
// Save to localStorage
localStorage.setItem("myLeads", JSON.stringify(myLeads))

// Retrieve from localStorage
JSON.parse(localStorage.getItem("myLeads"))
```

**Chrome Tabs API:**
```javascript
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    // Access current tab URL
    tabs[0].url
})
```

## Permissions Required

- **tabs** - Allows the extension to access current tab URL

## Important Notes

- **Double-click to delete:** This prevents accidental clearing of all your leads
- **New tab links:** All saved URLs open in new tabs to preserve your workflow
- **localStorage limits:** Can store thousands of URLs before hitting browser limits
- **Extension scope:** Data is specific to this extension and won't affect other browser data

## Installation Guide

**Detailed Steps:**
1. Download the project folder
2. Ensure you have these files:
   - `manifest.json`
   - `index.html`
   - `index.css`
   - `index.js`
   - `icon.png` (create a 128x128px icon or use any PNG)
3. Navigate to `chrome://extensions/`
4. Toggle "Developer mode" ON (top-right corner)
5. Click "Load unpacked" button
6. Browse to and select your project folder
7. Extension will appear in your toolbar (pin it for easy access)

## Future Enhancements

- Add categories/tags for organizing leads
- Export leads to CSV or text file
- Search/filter functionality
- Edit saved URLs
- Add notes or descriptions to each lead
- Undo delete functionality
- Import leads from file
- Sync across devices with Chrome sync storage
- Add timestamp to track when leads were saved
- Duplicate detection
