# Final Project Portfolio – 4 Web Apps

## Overview

This portfolio contains four web apps:

- Calculator — basic arithmetic, responsive UI
- Stopwatch — timer with laps, millisecond precision
- Weather App — OpenWeather API, current + 5-day forecast
- DOCX→PDF Converter — ConvertAPI-based, token/secret auth

Paths:
- final-project-elec3/calculator
- final-project-elec3/stopwatch
- weather-app and/or final-project-elec3/weather-app
- final-project-elec3/convert-word-to-pdf

Run: open each project’s index.html in a browser (Live Server optional).

---

## Project Description

A lightweight, responsive stopwatch for timing activities with start/pause, reset, and lap functionality. Built with clean UI and accurate timekeeping using the browser's high-resolution timers.

*Key Features:*
- Start / Pause / Reset controls
- Record lap times
- Millisecond precision display
- Keyboard shortcuts
- Responsive layout for mobile/desktop

*Problem Solved:* Provides a convenient timer tool directly in the browser—ideal for workouts, study sessions, or any timed tasks.

---

## API Details Used

*External API:* None

This project runs entirely client-side with no external API.

*Browser Web APIs leveraged:*
- High Resolution Time: performance.now() for accurate timing
- Timers: setInterval / clearInterval for updates
- Events: addEventListener for user interactions

---

## Instructions to Run the Project

### Prerequisites
- Modern web browser (Chrome, Edge, Firefox, Safari)
- Optional: VS Code + Live Server

### Setup Steps

1. *Clone or Download*
   
   git clone <repository-url>
   cd final-project-elec3/stopwatch
   

2. *Run Locally*
   - Open index.html in your browser
   - Or in VS Code, right-click index.html → “Open with Live Server”

3. *Use the App*
   - Click Start to begin timing
   - Pause to hold time; Reset to clear
   - Add Lap to record intermediate times

---

## Developer Information (Solo)

*Developer Name:* [Your Full Name]

*Role:* Solo Developer

- API Integration: N/A (no external API)
- JavaScript Logic & Data Processing
- UI & CSS Design
- GitHub & Documentation

### Technologies Used
- HTML5
- CSS3 (Flex/Grid)
- Vanilla JavaScript (ES6+)

---

## License

Open-source, intended for educational use.

---

# Final Project Portfolio – 4 Web Apps (Combined)

This single README covers four solo web development projects. Each section includes the rubric’s required parts: Project Description, API Details, Instructions, Screenshots, and Developer Information.

Projects:
- Calculator (basic arithmetic)
- Stopwatch (timing with laps)
- Weather App (OpenWeather API, 5-day forecast, dark mode)
- DOCX→PDF Converter (ConvertAPI, token/secret auth, light/dark)

---

## 1) Calculator Web App

### Project Description
A simple, responsive calculator that performs +, −, ×, ÷ operations with keyboard support and clear error handling.

*Features:*
- Basic arithmetic operations
- Clear and delete controls
- Keyboard input support
- Responsive layout

*Problem Solved:* Quick calculations from any device without installing software.

### API Details Used
- *API Name:* None (client-side only)
- *Base URL:* N/A
- *Endpoints Used:* N/A
- *Required Parameters:* N/A
- *Authentication Method:* None
- *Usage:* Pure JS logic; DOM updates render results.

### Instructions to Run the Project
*Required Tools:* Browser (Chrome/Edge/Firefox/Safari), optional VS Code + Live Server

*Clone & Run:*
git clone <repository-url>
cd final-project-elec3/calculator
- Open index.html in a browser (or use Live Server).

### Screenshots
![Calculator UI](final-project-elec3/calculator/screenshots/calculator-ui.png)
![Calculator Mobile](final-project-elec3/calculator/screenshots/calculator-mobile.png)

### Developer Information (Solo)
- *Developer Name:* Your Full Name
- *Role:* Solo Developer
- *API Integration:* N/A
- *JavaScript Logic & Data Processing*
- *UI & CSS Design*
- *GitHub & Documentation*

---

## 2) Stopwatch Web App

### Project Description
A lightweight stopwatch with start/pause, reset, and lap recording. Uses high-resolution timers for accuracy.

*Features:*
- Start / Pause / Reset
- Lap times
- Millisecond precision
- Keyboard shortcuts

*Problem Solved:* Convenient browser-based timer for workouts, study sessions, or tasks.

### API Details Used
- *API Name:* None (client-side only)
- *Base URL:* N/A
- *Endpoints Used:* N/A
- *Required Parameters:* N/A
- *Authentication Method:* None
- *Usage:* performance.now() + setInterval for precise updates.

### Instructions to Run the Project
*Required Tools:* Browser, optional VS Code + Live Server

*Clone & Run:*
git clone <repository-url>
cd final-project-elec3/stopwatch
- Open index.html in a browser.

### Developer Information (Solo)
- *Developer Name:* Nathan Daniel Bernal
- *Role:* Solo Developer
- *API Integration:* N/A
- *JavaScript Logic & Data Processing*
- *UI & CSS Design*
- *GitHub & Documentation*

---

## 3) Weather App (5-Day Forecast + Dark Mode)

### Project Description
Responsive weather app showing current conditions and a 5-day forecast. Includes a dark/light theme toggle with persistence.

*Features:*
- City search
- Current weather (temp, wind, humidity, feels-like)
- 5-day forecast (midday snapshots)
- Dark/Light theme toggle (LocalStorage)
- Responsive cards and icons

*Problem Solved:* Quick, clear weather checks and planning ahead.

### API Details Used
- *API Name:* OpenWeatherMap
- *Base URL:* https://api.openweathermap.org/data/2.5
- *Endpoints Used:*
   - /weather — current conditions by city
   - /forecast — 5-day (3-hour intervals)
   - Icon URL — https://openweathermap.org/img/wn/{icon}@2x.png
- *Required Parameters:* q (city), units=metric, appid (API key)
- *Authentication Method:* API key (query appid)
- *Usage:* Fetch current + forecast; filter forecast to one entry per day (12:00); render UI.

### Instructions to Run the Project
*Required Tools:* Browser, editor (optional), OpenWeather API key

*Clone & Configure:*
git clone <repository-url>
cd weather-app
Edit script.js:
const API_KEY = "YOUR_API_KEY";
Open index.html in a browser.

### Screenshots
![Weather Light](weather-app/screenshots/light-mode.png)
![Weather Dark](weather-app/screenshots/dark-mode.png)
![Mobile](weather-app/screenshots/mobile-view.png)

### Developer Information (Solo)
- *Developer Name:* Your Full Name
- *Role:* Solo Developer
- *API Integration*
- *JavaScript Logic & Data Processing*
- *UI & CSS Design*
- *GitHub & Documentation*

---

## 4) DOCX→PDF Converter (ConvertAPI)

### Project Description
Browser-based converter that turns Word (DOCX/DOC) into PDF via ConvertAPI. Modern interface with light/dark theme.

*Features:*
- Upload DOCX/DOC and convert to PDF
- Drag-and-drop upload
- Sample file option
- Light/Dark theme toggle
- Temporary download URLs

*Problem Solved:* Fast conversion without installing Office or third-party tools.

### API Details Used
- *API Name:* ConvertAPI
- *Base URL:* https://v2.convertapi.com
- *Endpoints Used:* /convert/docx/to/pdf (POST, multipart/form-data)
- *Required Parameters:* File, StoreFile=True
- *Authentication Method:* Token via Authorization: Bearer <token> header, or Secret via ?Secret=sk_...
- *Usage:* Detect token vs secret; upload file; receive JSON with time-limited download URL (~3 hours).

### Instructions to Run the Project
*Required Tools:* Browser, ConvertAPI Token or Secret

*Clone & Run:*
git clone <repository-url>
cd final-project-elec3/convert-word-to-pdf
Open index.html, paste your token, choose a DOCX, convert.

### Developer Information (Solo)
- *Developer Name:* Your Full Name
- *Role:* Solo Developer
- *API Integration*
- *JavaScript Logic & Data Processing*
- *UI & CSS Design*
- *GitHub & Documentation*

---

## Repository Setup (Quick)

git clone <repository-url>

# Calculator
cd final-project-elec3/calculator

# Stopwatch
cd ../stopwatch

# Weather App
cd ../weather-app
# set API key in script.js

# DOCX→PDF Converter
cd ../convert-word-to-pdf
api.openweathermap.org
