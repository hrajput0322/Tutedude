![image](https://github.com/user-attachments/assets/a1142e4d-4096-4948-80c0-9de893a490f7)

---

# Social App

A simple social networking application where users can register, log in, send and accept friend requests, view their friends, and get friend recommendations based on mutual friends.

## Features

- **User Authentication**: Secure sign-up and login functionality using JWT authentication.
- **View All Users**: Browse a list of all registered users.
- **Friend Requests**: Send friend requests to other users.
- **Accept/Reject Friend Requests**: Manage incoming friend requests.
- **Friends List**: View your list of friends.
- **Friend Recommendations**: Get friend suggestions based on friends of friends.
- **Responsive UI**: Clean and consistent user interface styled with CSS.

## Technologies Used

### Frontend

- [React.js](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
- CSS for styling

### Backend

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [JSON Web Tokens (JWT)](https://jwt.io/) for authentication
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) for password hashing

## Prerequisites

- [Node.js](https://nodejs.org/) and npm installed on your machine
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a MongoDB Atlas account

## Installation

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/hrajput0322/Tutedude.git
   ```

2. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start the backend server**:

   ```bash
   nodemon index.js
   ```

   The backend server will run on `http://localhost:5000`.

### Frontend Setup

1. **Open a new terminal window**.

2. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start the frontend development server**:

   ```bash
   npm start
   ```

   The frontend app will run on `http://localhost:3000`.

## Usage

1. **Access the application**:

   Open your browser and navigate to `http://localhost:3000`.

2. **Sign Up**:

   - Click on the **"Sign Up"** button.
   - Fill out the registration form with a username and password.
   - After signing up, you will be automatically logged in.

3. **Log In**:

   - If you already have an account, click on the **"Login"** button.
   - Enter your username and password to log in.

4. **View All Users**:

   - Navigate to **"View All Users"**.
   - Browse the list of registered users.
   - Send friend requests by clicking the **"Add Friend"** button next to a user.

5. **Friend Requests**:

   - Navigate to **"Friend Requests"**.
   - View incoming friend requests.
   - Accept or reject requests using the provided buttons.

6. **My Friends**:

   - Navigate to **"My Friends"** to see a list of your current friends.

7. **Friend Recommendations**:

   - Navigate to **"Recommendations"** to see friend suggestions based on mutual friends.

8. **Logout**:

   - Click the **"Logout"** button to end your session.

## Project Structure

```plaintext
social-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── FriendRequest.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── friendRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Users.js
│   │   │   ├── Friends.js
│   │   │   ├── FriendRequests.js
│   │   │   └── Recommendations.js
│   │   ├── styles/
│   │   │   ├── Home.css
│   │   │   ├── Login.css
│   │   │   ├── Signup.css
│   │   │   ├── Users.css
│   │   │   ├── Friends.css
│   │   │   ├── FriendRequests.css
│   │   │   └── Recommendations.css
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   ├── home_background.png
│   │   └── all_background.png
│   └── package.json
└── README.md
```

## Important Files and Directories

- **backend/models**: Contains Mongoose models (`User.js`, `FriendRequest.js`).
- **backend/routes**: Contains Express route handlers (`userRoutes.js`, `friendRoutes.js`).
- **backend/middleware/auth.js**: Authentication middleware using JWT.
- **frontend/src/pages**: Different pages.
- **frontend/src/styles**: CSS files for styling components.
- **frontend/public**: Public assets like background images.

## API Endpoints

### User Routes (`/api/users`)

- **POST `/signup`**: Register a new user.

  ```json
  // Request Body
  {
    "username": "your_username",
    "password": "your_password"
  }

  // Response
  {
    "token": "jwt_token"
  }
  ```

- **POST `/login`**: Authenticate a user and return a JWT.

  ```json
  // Request Body
  {
    "username": "your_username",
    "password": "your_password"
  }

  // Response
  {
    "token": "jwt_token"
  }
  ```

- **GET `/all`**: Get a list of all users (requires authentication).

  ```json
  // Headers
  {
    "Authorization": "Bearer your_jwt_token"
  }

  // Response
  [
    {
      "_id": "user_id",
      "username": "user1"
    },
    {
      "_id": "user_id",
      "username": "user2"
    }
    // ...
  ]
  ```

### Friend Routes (`/api/friends`)

- **GET `/`**: Get the current user's friends (requires authentication).

  ```json
  // Headers
  {
    "Authorization": "Bearer your_jwt_token"
  }

  // Response
  [
    {
      "_id": "friend_id",
      "username": "friend_username"
    }
    // ...
  ]
  ```

- **POST `/request`**: Send a friend request (requires authentication).

  ```json
  // Headers
  {
    "Authorization": "Bearer your_jwt_token"
  }

  // Request Body
  {
    "friendId": "user_id_to_send_request"
  }

  // Response
  {
    "msg": "Friend request sent successfully"
  }
  ```

- **GET `/requests`**: Get incoming friend requests (requires authentication).

  ```json
  // Headers
  {
    "Authorization": "Bearer your_jwt_token"
  }

  // Response
  [
    {
      "_id": "request_id",
      "sender": {
        "_id": "sender_id",
        "username": "sender_username"
      },
      "receiver": "your_user_id",
      "status": "pending"
    }
    // ...
  ]
  ```

- **POST `/accept`**: Accept a friend request (requires authentication).

  ```json
  // Headers
  {
    "Authorization": "Bearer your_jwt_token"
  }

  // Request Body
  {
    "requestId": "request_id_to_accept"
  }

  // Response
  {
    "msg": "Friend request accepted"
  }
  ```

- **POST `/reject`**: Reject a friend request (requires authentication).

  ```json
  // Headers
  {
    "Authorization": "Bearer your_jwt_token"
  }

  // Request Body
  {
    "requestId": "request_id_to_reject"
  }

  // Response
  {
    "msg": "Friend request rejected"
  }
  ```

- **GET `/friendsOfFriends`**: Get friend recommendations (requires authentication).

  ```json
  // Headers
  {
    "Authorization": "Bearer your_jwt_token"
  }

  // Response
  [
    {
      "_id": "user_id",
      "username": "recommended_user"
    }
    // ...
  ]
  ```

## Styling

- **Background Images**: Stored in the `frontend/public` directory.
- **CSS Styles**: Each component has an associated CSS file in `frontend/src/styles`.

## Notes

- **Authentication**: The app uses JWT stored in `localStorage` for maintaining user sessions.
- **Security**: Remember to keep your JWT secret and MongoDB connection string secure.
- **Data**: Ensure you have some users and friendships in your database to fully experience the app's features, especially friend recommendations.

## Troubleshooting

- **Server Errors**: Check the backend console for detailed error messages.
- **Frontend Errors**: Use browser developer tools to inspect errors and logs.
- **Database Connection**: Ensure MongoDB is running and the connection string is correct.

---

**Enjoy connecting with friends!**

---
