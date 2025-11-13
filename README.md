# Location Manager UI

A modern React application for managing and visualizing geographic locations. This application provides a comprehensive interface for creating, viewing, editing, and deleting locations with an interactive map visualization.

## Overview

Location Manager UI is a full-featured location management system that allows users to:

- **Create locations** with detailed information including name, category, coordinates, address, and notes
- **View all locations** in a paginated, sortable table
- **Edit existing locations** with a modal dialog
- **Delete locations** with confirmation dialogs
- **Visualize locations** on an interactive map powered by OpenLayers
- **Click map markers** to view location names

The application features a responsive layout that adapts to different screen sizes, with a split-pane design on desktop and a stacked layout on mobile devices.

## Features

### Location Management
- **Form-based creation**: Add new locations with validation for coordinates, names, and categories
- **Category system**: Organize locations by type (Office, Store, or Landmark)
- **Coordinate validation**: Ensures longitude (-180 to 180) and latitude (-90 to 90) are within valid ranges
- **Optional fields**: Address and notes can be added for additional context

### Data Display
- **Paginated table**: View locations in a table with customizable rows per page (5, 10, or 25)
- **Edit functionality**: Update location details through an intuitive modal dialog
- **Delete functionality**: Remove locations with a confirmation dialog to prevent accidental deletions

### Interactive Map
- **OpenLayers integration**: High-performance map rendering with OpenStreetMap tiles
- **Automatic marker placement**: All locations are displayed as markers on the map
- **Auto-zoom**: Map automatically adjusts to show all locations
- **Click interactions**: Click on markers to view location names
- **Real-time updates**: Map updates automatically when locations are added, edited, or deleted

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library and theming
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **TanStack Query (React Query)** - Server state management and data fetching
- **OpenLayers** - Interactive map rendering
- **Axios** - HTTP client for API requests
- **React Router** - Routing (configured for future use)

## Project Structure

```
src/
├── api/
│   ├── axiosClient.ts          # Axios instance with base URL configuration
│   └── locationsApi.ts          # API functions for CRUD operations
├── components/
│   ├── Layout/
│   │   └── Layout.tsx           # Main layout component (split-pane design)
│   ├── LocationForm/
│   │   ├── LocationForm.tsx     # Form for creating new locations
│   │   └── LocationForm.css     # Form styling
│   ├── LocationTable/
│   │   ├── LocationTable.tsx    # Main table component
│   │   ├── TableHead.tsx        # Table header component
│   │   ├── TableBody.tsx        # Table body with action buttons
│   │   ├── EditDialog.tsx       # Modal for editing locations
│   │   ├── DeleteDialog.tsx     # Confirmation dialog for deletions
│   │   └── LocationTable.css    # Table styling
│   └── LocationMap/
│       ├── LocationMap.tsx      # OpenLayers map component
│       └── LocationMap.css      # Map container styling
├── hooks/
│   ├── useLocations.ts          # Query hook for fetching all locations
│   ├── useCreateLocation.ts     # Mutation hook for creating locations
│   ├── useUpdateLocation.ts     # Mutation hook for updating locations
│   └── useDeleteLocation.ts     # Mutation hook for deleting locations
├── types/
│   └── location.types.ts        # TypeScript types and Zod schemas
├── utils/
│   └── helpers.ts               # Utility functions
├── App.tsx                      # Root component with theme provider
└── index.tsx                    # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prod-lm-front1
```

2. Install dependencies:
```bash
npm install
```

3. Configure the API endpoint (if needed):
   - The API base URL is configured in `src/api/axiosClient.ts`
   - Default: `https://lm-back-f1ed4b6fed3f.herokuapp.com`
   - Update this if your backend is hosted elsewhere

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page will reload automatically when you make changes.

### `npm test`
Launches the test runner in interactive watch mode. See the [Create React App testing documentation](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder. The build is optimized and minified for best performance.

### `npm run lint`
Runs ESLint to check for code quality issues.

### `npm run lint:fix`
Runs ESLint and automatically fixes fixable issues.

### `npm run format`
Formats all code files using Prettier.

### `npm run format:check`
Checks if code files are properly formatted without making changes.

## Usage

### Creating a Location

1. Fill out the location form on the left side of the screen
2. Required fields:
   - **Name**: 2-60 characters
   - **Category**: Select from Office, Store, or Landmark
   - **Longitude**: -180 to 180
   - **Latitude**: -90 to 90
3. Optional fields:
   - **Address**: Up to 120 characters
   - **Notes**: Up to 500 characters
4. Click "Add Location" to save

### Viewing Locations

- All locations are displayed in the table below the form
- Use pagination controls at the bottom to navigate through multiple pages
- Adjust the number of rows per page using the dropdown

### Editing a Location

1. Click the edit icon (pencil) next to a location in the table
2. Modify the fields in the edit dialog
3. Click "Save" to update or "Cancel" to discard changes

### Deleting a Location

1. Click the delete icon (trash) next to a location in the table
2. Confirm the deletion in the dialog
3. The location will be permanently removed

### Using the Map

- The map on the right side displays all locations as markers
- The map automatically zooms to show all locations
- Click on any marker to see the location name
- The map updates in real-time as you add, edit, or delete locations

## API Integration

The application connects to a REST API backend. The API endpoints used are:

- `GET /locations` - Fetch all locations
- `POST /locations` - Create a new location
- `PUT /locations/:id` - Update an existing location
- `DELETE /locations/:id` - Delete a location

The API base URL is configured in `src/api/axiosClient.ts`. Ensure your backend API is running and accessible at the configured URL.

## Data Model

Each location has the following structure:

```typescript
{
  _id: string;                    // Unique identifier (generated by backend)
  name: string;                    // Location name (2-60 characters)
  category: 'office' | 'store' | 'landmark';
  coordinates: {
    lon: number;                   // Longitude (-180 to 180)
    lat: number;                   // Latitude (-90 to 90)
  };
  address?: string;                // Optional address (max 120 characters)
  notes?: string;                  // Optional notes (max 500 characters)
}
```

## Styling

The application uses Material-UI's dark theme by default. The theme can be customized in `src/App.tsx`. All components are styled using:
- Material-UI's `sx` prop for responsive styling
- CSS modules for component-specific styles
- Emotion (included with MUI) for theme-aware styling

## Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Learn More

- [React Documentation](https://reactjs.org/)
- [Material-UI Documentation](https://mui.com/)
- [OpenLayers Documentation](https://openlayers.org/)
- [TanStack Query Documentation](https://tanstack.com/query)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

## License

This project is private and proprietary.
