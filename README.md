# Ecommerce Website Project

Welcome to the Ecommerce Website Project! This README provides an overview of the project, including its structure, features, and instructions for setting up the development environment.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Pages](#pages)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)

## Project Overview

This project is a full-fledged Ecommerce website built using HTML, CSS, and JavaScript for the frontend, with Flask serving as the backend API, and MySQL as the database. The website includes various functionalities to enhance user experience and streamline the online shopping process.

## Features

- **Keyword-based Product Search**: Users can search for products using keywords.
- **Dynamic Pages**: Content is managed dynamically through an admin page.
- **User Authentication**: Signup, signin, and forgot password functionalities.
- **Order Management**: Users can manage their orders, including product return and cancellation requests.
- **Contact Options**: Users can contact support via email and WhatsApp.
- **Shopping Cart**: Add, remove, and view products in the cart.
- **Wishlist**: Users can add products to their wishlist.
- **Admin Page**: Admins can manage products, orders, and user accounts.

## Pages

- **Home**: The landing page of the website.
- **About**: Information about the website and company.
- **Shop**: Product listings and search functionality.
- **Contact**: Contact form and details for customer support.
- **Signup**: User registration page.
- **Signin**: User login page.
- **Forgot Password**: Password recovery page.
- **Wishlist**: User's wishlist page.
- **Cart**: User's shopping cart page.
- **My Orders**: Page for users to view and manage their orders.
- **Admin Page**: For managing products, orders, and users.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Flask
- **Database**: MySQL

## Setup and Installation

### Prerequisites

- Python 3.10
- MySQL

### Installation

1. **Clone the Repository**:
   ```bash
        git clone https://github.com/yourusername/ecommerce-website.git
        cd ecommerce-website
   ```

2. **Set Up Virtual Environment**:
    ```bash
        python -m venv venv
        source venv/bin/activate   # On Windows use `venv\Scripts\activate`

    ```

3. **Set Up MySQL Database**:
    - Create a new MySQL database.
    - Run the provided SQL scripts to set up the necessary tables.
    - Update the database configuration in config.py.


4. **Install Backend Dependencies**:
    ```bash
        pip install -r requirements.txt
    ```


5. **Run the Backend Server**:
    execute the run.py file in API section
    ```bash
       python run.py
    ``` 

Run the Frontend:

Open index.html in your browser or use a live server extension in your code editor.
