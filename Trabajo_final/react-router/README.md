***Online Store Web Application***
1. Project Overview
This project is a full-stack e-commerce web application.
It simulates a small online store where users can browse products, register, log in, add products to a cart, and place orders.

The project is divided into two independent parts:
    Frontend: user interface (what the user sees and interacts with)
    Backend: server, database, authentication, and business logic

The goal of this project is to show how a real web application works from start to finish, including deployment on the internet.

2. Main Features
The application includes the following features:
*User Features*
    User registration
    User login with email and password
    Secure authentication using tokens
    Each user has their own data (cart and orders)

*Product Features*
    List of products
    Product detail page
    Product price and stock information
    Products stored in a database

*Cart Features*
    Each logged-in user has a personal cart
    Users can add products to the cart
    Cart data is stored in the backend
    Cart is kept when the user logs in again

*Order Features*
    Users can place orders
    Orders are linked to the logged-in user
    Each order contains multiple products

3. Live Application URLs
The project is fully deployed and available online.
    Frontend (Vercel)
    Backend (Render)

The frontend communicates with the backend through HTTP requests.

4. Technologies Used
*Frontend*
React
TypeScript
Vite
React Router
Fetch API

*Backend*
Python
FastAPI
SQLModel
PostgreSQL 
SQLite 
JWT authentication

*Deployment*
Frontend deployed on Vercel
Backend deployed on Render
Database hosted on Render PostgreSQL

5. How to Run the Project Locally
*Backend (FastAPI)*
Requirements
    Python 3.10 or higher
    pip (Python package manager)

Installation and Run
    cd backend
    pip install -r requirements.txt
    uvicorn app.main:app --reload

*Frontend (React)*
Requirements
    Node.js
    npm or yarn

Installation and Run
    cd frontend
    npm install
    npm run dev

6. Backend Architecture and Design Decisions
*Database Design*
The database is designed using relational tables.
Main tables include:
    User: stores user email and password (hashed)
    Product: stores product name, description, price, and stock
    Cart: one cart per user
    CartItem: products inside a cart
    Order: order created by a user
    OrderItem: products inside an order

*Authentication*
    Authentication is implemented using JWT tokens
    After login, the backend returns a token
    The frontend stores the token and sends it in requests
    Protected routes require a valid token

*Database Choice*
    SQLite is used in local development (simple and fast)
    PostgreSQL is used in production (Render)
    This separation avoids mixing local and production data

7. Frontend Architecture and Design Decisions
*Project Structure*
The frontend is organized into:
    Pages (Home, Login, Register, Cart, Orders)
    API files for backend communication
    Simple global state for authentication and cart

*State Management*
    Authentication state is stored in localStorage
    Cart state is loaded from the backend after login
    Simple approach without complex libraries

*Routing*
    React Router is used to manage navigation
    Public pages: Home, Login, Register
    Protected pages: Cart, Orders

8. Communication Between Frontend and Backend
The frontend sends HTTP requests using fetch
API calls are centralized in helper functions
Environment variables are used for backend URLs
CORS is properly configured in the backend

9. Extensions Beyond Minimum Requirements
This project includes several features beyond the basic requirements:
    Full authentication system
    User-specific cart stored in the database
    Order management
    Database seeding with initial products
    Real production deployment (not only local)
    Separation of frontend and backend

10. Final Notes
This project represents a complete e-commerce web application, covering:
    Frontend development
    Backend development
    Database design
    Authentication
    Deployment

The code is written with clarity in mind and can be easily extended with more features such as:
    Product images
    Categories
    Admin panel
    Search and filters

11. Conclusion
This project consists of the development of a complete e-commerce web application. During this work, both the frontend and the backend have
been created, connected, and deployed. The application allows users to register, log in, view products, add them to a cart, and place orders.

One of the most important aspects of this project is the clear separation between frontend and backend. The frontend focuses on what the user
sees and how the user interacts with the application, while the backend manages data, users, authentication, and the database. This structure
is common in real web applications and helps keep the project organized.

The project uses modern and widely used technologies. React is used for the frontend to create dynamic pages, and FastAPI is used for the
backend to build a fast and clear API. The database is designed with relational tables that store users, products, carts, and orders in a
logical way.

User authentication is another key part of the application. Users must register and log in to access personal features such as the cart and
orders. Authentication tokens are used to keep the application secure and to make sure that each user only accesses their own information.

The project also includes a real deployment. The frontend is deployed on Vercel and the backend on Render, using a production database. This
makes the application accessible online and similar to real commercial web applications. Managing environment variables and deployment settings
has been an important learning experience.

In addition, this project goes slightly beyond the basic requirements by including persistent carts, database seeding, and full separation
between development and production environments. These features improve the usability and realism of the application.

Overall, this project has been a very useful learning experience. It combines theory and practice and shows how a complete web application is
built from start to finish. The final result is a functional, well-structured, and realistic e-commerce application that meets the objectives
of the assignment.