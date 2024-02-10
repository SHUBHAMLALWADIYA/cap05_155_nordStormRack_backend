# cap05_155_nordStormRack_backend
cap05_155 student : Shubham Lalwadiya (backend work of nordStormRack)


# NordStormRack project- Backend

A robust backend system that handles user authentication, shopping cart operations, order management, and product retrieval for a seamless user experience.

## Overview

This backend system is designed to offer comprehensive functionality, ensuring secure user interactions, efficient shopping cart operations, order placements, and easy access to product information.

## Routers

### User Router (`/user`)

Handles user-related operations, ensuring a secure and user-friendly authentication process.

- **POST /signup:**
  - Registers a new user, enforcing password strength and checking for existing email addresses.
- **POST /login:**
  - Manages user login, generating access and refresh tokens for secure authentication.
- **POST /logout:**
  - Logs out a user and enhances security by blacklisting tokens.

### Cart Router (`/cart`)

Manages shopping cart operations, requiring user authentication for added security.

- **POST /addToCart:**
  - Adds a selected product to the user's shopping cart.
- **GET /cartData:**
  - Retrieves detailed information about the user's shopping cart, including product details.
- **POST /deleteProduct:**
  - Marks a product in the cart as removed, providing a streamlined user experience.

### Order Router (`/order`)

Handles routes related to order management, ensuring a smooth process from cart to order.

- **POST /placeOrder:**
  - Places an order, transferring relevant data from the user's cart to the order collection.
- **GET /history:**
  - Retrieves the order history for a user, offering insights into past purchases.

### Product Router (`/products`)

Manages routes related to product retrieval, providing easy access to product information.

- **GET /:**
  - Retrieves all available products from the collection, ensuring users have updated and accurate information.


## Middleware

### Authentication Middleware (`auth`)

The Authentication Middleware ensures secure access to protected routes by validating user tokens.

- **Functionality:**
  - Verifies the validity of the provided access token.
  - Checks for logout status to prevent access for logged-out users.
  - If the access token is expired, attempts to refresh it using the provided refresh token.
  - Generates a new access token upon successful refresh.

- **Usage:**
  - Applied to routes that require authentication.
  - Verifies the user's access token before allowing access to protected routes.
