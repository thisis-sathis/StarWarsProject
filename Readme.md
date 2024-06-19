# Star Wars Explorer

## Introduction
Star Wars Explorer is a web application that utilizes the Star Wars API (https://swapi.dev/) to display information about various Star Wars entities, specifically characters (people). This application is built using the latest Next.js framework and ShadCN UI components.

## Features
- Display a table of Star Wars characters with details such as name, height, mass, gender, and hair color.
- Pagination and search functionality for the character table.
- View detailed information about a character, including the films they appear in, using a ShadCN Sheet component.

## Completed Features
- **People Fetching and Display:** Successfully fetch and display Star Wars characters in a ShadCN data table.
- **View More:** Clicking on a table row opens a ShadCN sheet with character details and films they appear in.
- **Search and Pagination:** Implemented search functionality to filter characters by name and pagination to navigate through the character list.
- **Minimal Styling:** Applied minimal styling to enhance the appearance of the table.

## Missing Features
Due to time constraints, the following features were not completed:
1. Sorting functionality for the table.
2. Fully responsive design.
3. Fix for the "View More" click event bubbling to row clicks.

## Getting Started

### Prerequisites
Ensure you have the following installed on your local machine:
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   git clone <your-repo-url>

2. Navigate to the project directory:
    cd StarWarsProject

3.Install dependencies:
    npm install
    or
    yarn install
4. Running the Application
    Start the development server:
    npm run dev
    or
    yarn dev
5.Open your browser and navigate to:
    http://localhost:3000

### Project Structure
    components/: Contains reusable UI components.
    pages/: Contains the Next.js pages.
    redux/: Contains Redux slices and store configuration.
    styles/: Contains the global styles and SASS files.
    public/: Contains static assets.
    utils/: Contains utility functions and helpers.
    API Integration
    This project uses the Star Wars API (https://swapi.dev/) to fetch data about characters. The API integration is handled using Redux Thunk for asynchronous actions.

# Dependencies
Here are the main dependencies used in this project:

    @radix-ui/react-dialog: Used for dialog components.
    @tanstack/react-table: Used for building the data table.
    @reduxjs/toolkit, react-redux, redux, redux-thunk: Used for state management.
    next, react, react-dom: Core libraries for building the application.
    sass, tailwindcss: Used for styling.
    lucide-react: Used for icons.
    Code Quality
    This project uses TypeScript for type safety.
    ESLint is configured for maintaining code quality and enforcing best practices.
    Enhancements
    Loading states are shown while data is being fetched.
    Error handling for API requests.
    Responsive design for various screen sizes (partially implemented).
    Known Issues
    Sorting functionality for the table is missing.
    The design is not fully responsive.
    The "View More" click event sometimes bubbles to row clicks.
    Deployment
    This project is deployed on Netlify. You can access the deployed version at:
    Star Wars Explorer
