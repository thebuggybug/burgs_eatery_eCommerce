# Burgs Eatery

## Overview
This project is a full-stack ecommerce web application built using React.js, Redux, and Bootstrap for the frontend. The backend is powered by Django (version 3.1.4) and Django REST Framework, with SQLite as the database. PayPal API is integrated for handling payments.

## Features
- User authentication and authorization
- Product management (CRUD operations)
- Shopping cart functionality
- Payment processing via PayPal API
- API endpoints using Django REST Framework
- Responsive UI with Bootstrap

## Tech Stack
### Frontend:
- React.js
- Redux
- Bootstrap

### Backend:
- Django 3.1.4
- Django REST Framework
- SQLite

### Payment Integration:
- PayPal API

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js & npm (for frontend)
- Python & pip (for backend)

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Apply database migrations:
   ```sh
   python manage.py migrate
   ```
5. Start the Django development server:
   ```sh
   python manage.py runserver
   ```

## Usage
- Open the frontend at `http://localhost:3000`
- The backend API runs at `http://localhost:8000`
- Register or log in to start using the application

## Screenshots
### Home Page
![Home Page](insert_image_path_here)

### Shopping Cart
![Shopping Cart](insert_image_path_here)

### Payment Page
![Payment Page](insert_image_path_here)

## Contributing
Feel free to submit issues and pull requests to improve this project.

## License
This project is licensed under the MIT License.
