# Routes Documentation

## All Routes

- these routes are all Public Routes

* `/` - Home page
* `*/user` - User-related features
* `*/subscription` - Subscription management
* `*/trial` - Trial period access
* `/dashboard` - Main dashboard for authenticated users
* `/auth/google` - Google authentication route

## Backend Routes with Middleware

- `GET /user/:_id` - Fetch a specific user by ID
  - **Middleware**: `userController.getUser`
- `GET /dashboard` - Fetch dashboard data
  - **Middleware**: (middleware name or controller, if available)

### Notes

- Ensure that any routes requiring authentication are properly protected with middleware.
- Update this file as new routes are added or modified.
