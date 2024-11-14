# Application State Documentation

## State in `App.jsx`

- **isAuthenticated**

  - **Type**: Boolean
  - **Initialized**: `false`
  - **Description**: Tracks if the user is authenticated.
  - **Setter**: `setIsAuthenticated`

- **loading**

  - **Type**: Boolean
  - **Initialized**: `true`
  - **Description**: Indicates if the app is in a loading state, e.g., during data fetching.
  - **Setter**: `setLoading`

- **user**
  - **Type**: Object or `null`
  - **Initialized**: `null`
  - **Description**: Stores user details after successful authentication.
  - **Setter**: `setUser`

## State in `HomepageContainer.jsx`

- **userData**
  - **Type**: Reference to `user` from `App.jsx`
  - **Description**: Syncs the `user` state across components for easy access to user details on the homepage.
