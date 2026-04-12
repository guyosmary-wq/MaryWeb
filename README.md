# MaryWeb - Sultan Kudarat Tourism Website

A complete tourism website with login authentication and booking system connected to Google Sheets.

## Files Structure
```
MaryWeb/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # External stylesheet
├── js/
│   └── main.js         # JavaScript functionality
├── google-sheets/
│   ├── Code.gs         # Google Apps Script
│   ├── appsscript.json # Apps Script config
│   └── bookings-template.csv  # Spreadsheet template
└── SPEC.md            # Project specifications
```

## How to Connect Google Sheets

### Step 1: Create Google Spreadsheet
1. Go to sheets.google.com
2. Create a new spreadsheet named "MaryWeb Bookings"
3. Rename the first sheet to "Bookings"
4. Add these column headers in row 1:
   - Timestamp, Name, Email, Phone, Destination,   , Guests, Notes, Username

### Step 2: Deploy Google Apps Script
1. In your spreadsheet, go to **Extensions > Apps Script**
2. Copy the code from `google-sheets/Code.gs`
3. Paste into the Apps Script editor
4. Click **Deploy > New deployment**
5. Select **Web app**
6. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click Deploy and copy the Web App URL

### Step 3: Update JavaScript
1. Open `js/main.js`
2. Replace the line:
   ```javascript
   const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL';
   ```
   with your actual Web App URL

### Step 4: Test
- Open `index.html` in a browser
- Login with: **admin** / **1234**
- Make a booking and check your Google Sheet

## Demo Credentials
- Username: `admin` | Password: `1234`
- Username: `user` | Password: `password`
- Username: `mary` | Password: `web2026`

## Features
- ✓ Responsive design (mobile, tablet, desktop)
- ✓ Login authentication system
- ✓ 12 Sultan Kudarat destinations
- ✓ Booking form with validation
- ✓ Google Sheets integration
- ✓ External CSS and JavaScript
- ✓ Smooth animations and transitions
