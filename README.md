# Smart Insurance Application Portal

## Overview
This is a Smart Insurance Application Portal that allows users to apply for different types of insurance (Health, Home, Car, Life, etc.) through dynamically generated forms. The form structure is fetched from an API, and all fields, conditions, and validations are handled dynamically.

## Tech Stack
- **Next.js** – For building the frontend application.
- **TypeScript** – Ensuring type safety and better development experience.
- **Tailwind CSS** – For styling and responsive design.
- **Formik** – For form state management.
- **Yup** – For dynamic form validation.
- **ShadCN** – For UI components.
- **Fetch API** – For handling API requests.

## Features Implemented
### Dynamic Forms
- Fetches form structure from an API.
- Dynamically renders form fields based on API response.
- Implements conditional fields (appear/disappear based on user responses).
- Supports nested form sections (e.g., Address, Vehicle Details).
- Dynamically fetches select field options (e.g., states based on country selection).
- Validates all form fields using Yup before submission.

### Customizable Table View
- Displays submitted applications in a table.
- Supports sorting and filtering.
- Users can dynamically select which columns to display.

### API Handling
- Used Fetch API for making requests.
- Implemented a **fetch service** to handle API calls efficiently.

### Dark Mode
- Implemented a dark mode toggle for better user experience.

## Installation & Setup
1. Clone the repository:
   git clone https://github.com/akbarinejadaida/smart-insurance-portal.git
   cd your-repository

2. Install dependencies:
  npm install

3. Run in development mode:
  npm run dev

4. Build and start in production mode:
  npm run build
  npm run start

## Known Issues

### CORS Error When Fetching States & Submitting Forms

There was a CORS issue when attempting to fetch states and submit forms.

Below is an image of the error encountered:

![CORS ERRORS](/public/image.png)

Possible fixes include setting appropriate CORS headers on the backend.

# Deployment

The application is not deployed yet, but once deployed, the live URL will be updated here.
**Live URL:** _Coming soon..._