# Components Overview

This document provides an overview of the major files, components, and structure in the project. Use this as a reference for understanding file locations, dependencies, and component interactions.

---

## `src/` Directory

### Assets

- **`assets/`**
  - `logo.png` - Project logo.
  - `styles.css` - Main stylesheet for global styles.

### Components

This folder contains reusable components for the application.

- **AddNewButton** - Button component for adding new items.
- **AddNewContainer** - Container component for managing additions.
- **AddNewFormDisplay** - Display component for forms related to new items.
- **AddNewTitleDisplay** - Component for displaying titles in addition forms.
- **BudgetContainer** - Manages and displays budget-related information.
- **CategoryDropDownMenu** - Dropdown menu for selecting categories.
- **DashboardContainer** - Main dashboard display for the application.
- **Icony** - Custom icons used throughout the app.
- **NewSubscriptionFormContainer** - Container for new subscription forms.
- **NotificationsDropDownMenu** - Dropdown menu displaying notifications.
- **SubscriptionContainer** - Displays subscription details.
- **TrialContainer** - Container for trial management.
- **TrialDisplay** - Display component for showing trial information.
- **UserProfileDropdown** - Dropdown menu for user profile settings.

### Pages

These components represent higher-level views or pages in the app.

- **HomepageContainer**
  - Utilizes `TitleDisplay()` for the title.
  - Returns `DashboardContainer` as the main content.
- **MainContainer**
  - Returns `DashboardContainer`.

### Root Components

- **App.jsx**

  - Contains main functions like `GoogleSignInButton()` and `getInitials()`.
  - Returns `GoogleSignInButton` and `HomepageContainer` components.

- **index.css** - Global CSS styles.
- **main.jsx** - Main entry point for React rendering.

---

## `server/` Directory

### Controllers

- **SubscriptionController** - Manages subscription-related backend logic.
- **TrialController** - Handles trial-related backend operations.
- **UserController** - Manages user-related backend processes.

### Models

- **SubscriptionModel** - Defines the data structure for subscriptions.
- **TrialsModel** - Defines the data structure for trials.
- **UserModel** - Defines the data structure for users.

### Routes

- **subscriptionRoute** - Manages subscription API routes.
- **trialRoute** - Handles trial API routes.
- **userRoute** - Manages user-related API routes.

---

## Utilities and Config

- **auth.js** - Handles authentication logic.
- **db.js** - Database configuration and connection.
- **notifs.js** - Notification logic and services.
- **server.js** - Main server file to start the backend service.

---

### Notes

- Keep this file updated as new components, pages, or backend files are added.
- Follow the component naming conventions for clarity and consistency across the project.
