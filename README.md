# BOOKNEST

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [User Interface](#user-interface)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)
- [Acknowledgements](#acknowledgements)

## Project Overview
BOOKNEST is a comprehensive online bookstore that allows users to browse, purchase, and manage books. It includes dedicated portals for users, sellers, and administrators.

## Features
- User registration and login
- Book browsing
- Cart and wishlist management
- Order management
- Seller and admin portals for inventory and order management
- Admin functionalities for user and seller management

## Architecture
- **Frontend**: Built with React.js and styled using Tailwind CSS.
- **Backend**: Developed using Node.js and Express.js.
- **Database**: MongoDB for storing user data, book details, and order information.

## Setup Instructions
### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository.
2. Install dependencies for the backend:
   
   - cd backend
   - npm i
   - node index.js
3. Install dependencies for the frontend:

   - cd frontend
   - npm i
   - npm run dev
## Running the Application
### Frontend
   npm run dev
### Backend
   node index.js
## API Documentation
### Endpoints
- **User Registration**
 - POST /api/users/register
 - Request: { "email": "example@example.com", "password": "password123" }
 - Response: 200 OK
- **User Login**
 - POST /api/users/login
 - Request: { "email": "example@example.com", "password": "password123" }
 - Response: 200 OK
- **Seller Registration**
 - POST /api/sellers/register
 - Request: { "shopName": "Example Shop", "email": "example@example.com", "password": "password123" }
 - Response: 200 OK
- **Admin Login**
 - POST /api/admin/login
 - Request: { "email": "admin@example.com", "password": "admin123" }
 - Response: 200 OK
- **Get Books**
 - GET /api/books
 - Response: 200 OK { "books": [...] }
- **Add Book (Seller/Admin)**
 - POST /api/books
 - Request: { "title": "Book Title", "author": "Author Name", "genre": "Fiction", "price": 19.99 }
 - Response: 201 Created
- **Order Book**
 - POST /api/orders
 - Request: { "userId": "123", "bookId": "456", "address": "User Address" }
 - Response: 200 OK { "message": "Order placed" }
- **Get Orders (User)**
 - GET /api/orders/user/:userId
 - Response: 200 OK { "orders": [...] }
- **Get Orders (Seller)**
 - GET /api/orders/seller/:sellerId
 - Response: 200 OK { "orders": [...] }
- **Get Orders (Admin)**
 - GET /api/orders
 - Response: 200 OK { "orders": [...] }
- **Delete Book (Seller/Admin)**
 - DELETE /api/books/:bookId
 - Response: 200 OK { "message": "Book deleted" }
## Authentication
**Method:** JSON Web Tokens (JWT) for securing user sessions.
**Process:**
User logs in or registers and receives a token.
Token is included in the headers of subsequent requests for authentication.
## User Interface
**Landing Page:** 
![image](https://github.com/user-attachments/assets/1c446e73-bd27-4763-a031-4d75880b8100)
![image](https://github.com/user-attachments/assets/b8a3cd1d-19ec-4f87-a6d2-2cb575304c71)
![image](https://github.com/user-attachments/assets/b1a09e73-dda4-4cee-befb-631cdb4709a7)
## Future Enhancements
 - Implement real payment gateway integration.
 - Improve UI/UX with more responsive design elements.
 - Add more detailed book descriptions and reviews.
## Contributors
 - Sanjay 
 - Yavish 
 - Preetham 
 - Nageswara Rao 
## Acknowledgements
 - Special thanks to everyone who contributed to the development and testing of this project.
