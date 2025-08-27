AI Coding Assistant Widget

A discreet, always-on-top desktop widget that provides AI-powered code solutions for technical interview questions. Built with Electron and powered by the Gemini API.

Features
Discreet Interface: A small, frameless window that can be placed anywhere on your screen.
Always-On-Top: Stays visible over your IDE, browser, or video call application.
Adjustable Transparency: Make the widget almost invisible to blend in with your background.
Multi-Language Support: Generate optimal code solutions in Python, C++, or Java.
Secure API Key Storage: Uses a .env file to keep your API key safe and out of the main codebase.
Hidden from Taskbar: The application does not appear in the Windows taskbar or macOS Dock for maximum discretion.

Getting Started
Follow these instructions to get the project running on your local machine.

Prerequisites
Node.js and npm installed on your system.
A Google AI Studio API key. You can get yours at https://aistudio.google.com/app/apikey

Installation & Running
Clone the repository (or download the files):
git clone https://github.com/waryix/AI_coding_assisstant.git
cd AI_coding_assisstant

Install dependencies:
This command will download Electron and other necessary packages.
npm install

Configure your API Key:

Rename the .env.example file to .env.

Open the .env file and paste your Google AI Studio API key.
API_KEY="YOUR_API_KEY_HERE"

Run the application:
This will launch the desktop widget.
npm start

Usage
Launch the application using npm start.
Drag the widget by its title bar to position it on your screen.
Paste a coding problem into the text area.
Select your desired language (Python, C++, or Java).
Click "Generate" to get the AI-powered solution.
Adjust the opacity slider at the bottom to make the widget more or less transparent.
Click the '×' button in the top-right corner to close the application.
