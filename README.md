# BlogSpace - Full Stack Blog Application

BlogSpace is a full-stack blog application that allows users to register, log in securely, create blogs, view blogs, and manage their blog content.

## Features

- User Registration
- User Login
- JWT Authentication
- Protected Dashboard
- Create Blog
- View All Blogs
- View Individual Blog
- Edit Blog
- Delete Blog
- Display Logged-in User
- Blog Statistics
- Responsive UI
- MongoDB Database Integration
- REST APIs

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

## Project Structure

```text
Blog-Application/
│
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Blog.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── blogRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── create-blog.html
├── blog-details.html
├── script.js
├── style.css
├── .gitignore
└── README.md