# Burgs Eatery

## Overview
This project is a full-stack ecommerce web application built using React.js, Redux, and Bootstrap for the frontend. The backend is powered by Django (version 3.1.4) and Django REST Framework, with SQLite as the database. PayPal API is integrated for handling payments.

## Features
- User authentication and authorization
- Product management (CRUD operations)
- Admin panel and admin control for users, product (dishes), order.
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
<img width="300" alt="image" src="https://github.com/user-attachments/assets/43025ed8-84a0-4c29-8c21-86a895508f82" />
<img width="300" alt="image" src="https://github.com/user-attachments/assets/96d1cc71-87b3-4590-840a-7cba58f1d332" />

### Details Page
<img width="300" alt="image" src="https://github.com/user-attachments/assets/1daf3b18-16d4-4235-9a93-4b910b460ad2" />

### Review 
<img width="300" alt="image" src="https://github.com/user-attachments/assets/c09990cc-a63a-4382-b709-ce75b2e38003" />


### Shopping Cart
<img width="300" alt="image" src="https://github.com/user-attachments/assets/c61aca99-fac9-4902-a266-f27b47d7f310" />
<img width="300" alt="image" src="https://github.com/user-attachments/assets/fd6e3851-7046-4a40-afc1-8be081425f84" />


### Login & SignUp Page
<img width="300" alt="image" src="https://github.com/user-attachments/assets/6ca13233-47cb-474d-842e-915b82bc1ee3" />
<img width="300" alt="image" src="https://github.com/user-attachments/assets/f6f5d729-e432-4c9f-9536-c1926c8744eb" />


### Checkout Page
<img width="300" alt="image" src="https://github.com/user-attachments/assets/66799ed6-e0f8-4e65-8531-ecbb637a13a4" />

### Profile Page
<img width="300" alt="image" src="https://github.com/user-attachments/assets/bf1d5883-4452-475a-8466-c99201ab8951" />


## Contributing
Feel free to submit issues and pull requests to improve this project.

## License
This project is licensed under the MIT License.
