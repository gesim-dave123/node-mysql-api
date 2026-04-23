# Node MySQL API

A secure, production-ready REST API built with Node.js, Express, TypeScript, and MySQL. Features JWT-based authentication, role-based authorization, email verification, and password management.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Setup & Installation](#setup--installation)
4. [Configuration](#configuration)
5. [API Endpoints](#api-endpoints)
6. [Database Schema](#database-schema)
7. [Authentication & Authorization](#authentication--authorization)
8. [Project Structure](#project-structure)

---

## Overview

This API provides complete account management functionality including:
- User authentication with JWT tokens
- Account registration and email verification
- Password reset with secure tokens
- Refresh token rotation for enhanced security
- Role-based access control (Admin/User)
- CRUD operations for account management
- Swagger/OpenAPI documentation

---

## Features

✅ **JWT Authentication** - Secure token-based authentication  
✅ **Email Verification** - Verify accounts via email  
✅ **Password Reset** - Secure password recovery flow  
✅ **Refresh Tokens** - Token rotation for better security  
✅ **Role-Based Access** - Admin and User roles  
✅ **CORS Enabled** - Cross-origin requests supported  
✅ **Request Validation** - Joi schema validation  
✅ **Global Error Handling** - Centralized error management  
✅ **Swagger Documentation** - Interactive API docs  

---

## Setup & Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server running
- npm or yarn

### Installation Steps

1. **Clone/Navigate to project:**
   ```bash
   cd node-mysql-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   Create/update `config.json` with your settings (see Configuration section)

4. **Start MySQL Server:**
   ```bash
   # Windows
   net start MySQL80
   
   # macOS
   brew services start mysql
   
   # Linux
   sudo systemctl start mysql
   ```

5. **Run the API:**
   ```bash
   # Development (with auto-reload)
   npm run dev
   
   # Production
   npm start
   ```

The API will be available at `http://localhost:4000`

---

## Configuration

### config.json

```json
{
  "database": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "your_password",
    "database": "node_mysql_api"
  },
  "emailFrom": "noreply@your-app.com",
  "smtpOptions": {
    "host": "smtp.ethereal.email",
    "port": 587,
    "secure": false,
    "auth": {
      "user": "your_ethereal_email",
      "pass": "your_ethereal_password"
    }
  }
}
```

### Environment Variables (.env)

```env
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

### SMTP Configuration

**For Testing (Ethereal Email):**
1. Go to https://ethereal.email
2. Create a test account
3. Use credentials in `config.json`

**For Production (Gmail):**
```json
"smtpOptions": {
  "host": "smtp.gmail.com",
  "port": 587,
  "secure": false,
  "auth": {
    "user": "your-email@gmail.com",
    "pass": "your-app-password"
  }
}
```

---

## API Endpoints

### Base URL
```
http://localhost:4000
```

### Quick Reference - All Endpoints

| # | Method | Endpoint | Description | Auth |
|---|--------|----------|-------------|------|
| 1 | POST | `/accounts/register` | Register new user | ❌ |
| 2 | POST | `/accounts/authenticate` | Login user | ❌ |
| 3 | POST | `/accounts/verify-email` | Verify email address | ❌ |
| 4 | POST | `/accounts/forgot-password` | Request password reset | ❌ |
| 5 | POST | `/accounts/validate-reset-token` | Validate reset token | ❌ |
| 6 | POST | `/accounts/reset-password` | Reset password | ❌ |
| 7 | POST | `/accounts/refresh-token` | Refresh JWT token | ❌ |
| 8 | POST | `/accounts/revoke-token` | Revoke refresh token | ✅ |
| 9 | GET | `/accounts` | Get all accounts | ✅ Admin |
| 10 | GET | `/accounts/:id` | Get account by ID | ✅ |
| 11 | POST | `/accounts` | Create new account | ✅ Admin |
| 12 | PUT | `/accounts/:id` | Update account | ✅ |
| 13 | DELETE | `/accounts/:id` | Delete account | ✅ |

### Authentication Endpoints

#### 1. **Register User**
```http
POST /accounts/register
Content-Type: application/json

{
  "title": "Mr",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "acceptTerms": true
}
```
**Response:** `200 OK`
```json
{
  "message": "Registration successful, please check your email for verification instructions"
}
```

#### 2. **Authenticate (Login)**
```http
POST /accounts/authenticate
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:** `200 OK`
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "User",
  "jwtToken": "eyJhbGc...",
  "refreshToken": "abcd1234..."
}
```

#### 3. **Verify Email**
```http
POST /accounts/verify-email
Content-Type: application/json

{
  "token": "verification_token_from_email"
}
```
**Response:** `200 OK`
```json
{
  "message": "Verification successful, you can now login"
}
```

#### 4. **Refresh Token**
```http
POST /accounts/refresh-token
Cookie: refreshToken=token_value
```
**Response:** `200 OK`
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "jwtToken": "eyJhbGc...",
  "refreshToken": "new_refresh_token..."
}
```

#### 5. **Revoke Token**
```http
POST /accounts/revoke-token
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "token": "refresh_token"
}
```
**Response:** `200 OK`
```json
{
  "message": "Token revoked"
}
```

#### 6. **Forgot Password**
```http
POST /accounts/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```
**Response:** `200 OK`
```json
{
  "message": "Please check your email for password reset instructions"
}
```

#### 7. **Validate Reset Token**
```http
POST /accounts/validate-reset-token
Content-Type: application/json

{
  "token": "reset_token_from_email"
}
```
**Response:** `200 OK` (token is valid)

#### 8. **Reset Password**
```http
POST /accounts/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "password": "new_password123"
}
```
**Response:** `200 OK`

---

### Account Management Endpoints

#### 9. **Get All Accounts** (Admin Only)
```http
GET /accounts
Authorization: Bearer jwt_token
```
**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "Admin",
    "created": "2026-04-18T12:00:00Z",
    "isVerified": true
  }
]
```

#### 10. **Get Account by ID**
```http
GET /accounts/:id
Authorization: Bearer jwt_token
```
**Response:** `200 OK`
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "User",
  "created": "2026-04-18T12:00:00Z",
  "isVerified": true
}
```

#### 11. **Create Account** (Admin Only)
```http
POST /accounts
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "title": "Ms",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "password": "password123"
}
```
**Response:** `201 Created`

#### 12. **Update Account**
```http
PUT /accounts/:id
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "password": "new_password123"
}
```
**Response:** `200 OK`

#### 13. **Delete Account**
```http
DELETE /accounts/:id
Authorization: Bearer jwt_token
```
**Response:** `200 OK`

---

## Database Schema

### Accounts Table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE |
| `passwordHash` | VARCHAR(255) | NOT NULL |
| `firstName` | VARCHAR(100) | NOT NULL |
| `lastName` | VARCHAR(100) | NOT NULL |
| `title` | VARCHAR(50) | NULLABLE |
| `role` | VARCHAR(50) | NOT NULL |
| `acceptTerms` | BOOLEAN | NOT NULL, DEFAULT FALSE |
| `verificationToken` | VARCHAR(255) | NULLABLE, UNIQUE |
| `verified` | DATETIME | NULLABLE |
| `resetToken` | VARCHAR(255) | NULLABLE, UNIQUE |
| `resetTokenExpires` | DATETIME | NULLABLE |
| `passwordReset` | DATETIME | NULLABLE |
| `created` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| `updated` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

### RefreshTokens Table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT |
| `accountId` | INT | NOT NULL, FOREIGN KEY → accounts(id) |
| `token` | VARCHAR(255) | NOT NULL, UNIQUE |
| `expires` | DATETIME | NOT NULL |
| `created` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| `createdByIp` | VARCHAR(45) | NOT NULL |
| `revoked` | DATETIME | NULLABLE |
| `revokedByIp` | VARCHAR(45) | NULLABLE |
| `replacedByToken` | VARCHAR(255) | NULLABLE |

---

## Authentication & Authorization

### JWT Token Flow

1. **User registers/logs in** → Receives JWT + Refresh Token
2. **JWT used for API requests** → Added to `Authorization: Bearer <token>` header
3. **JWT expires** → Use Refresh Token to get new JWT
4. **Refresh Token revoked** → Must login again

### Token Details

**JWT Token:**
- Valid for 15 minutes
- Contains user ID and subject
- Used to authorize requests

**Refresh Token:**
- Valid for 7 days
- Stored in database
- Can be revoked
- Replaced on refresh

### Role-Based Access

**Admin:**
- View all accounts
- Create accounts
- Revoke any token

**User:**
- View own account
- Update own account
- Revoke own tokens

---

## Project Structure

```
node-mysql-api/
├── src/
│   ├── _helpers/
│   │   ├── db.ts                 # Database configuration & models
│   │   ├── role.ts               # Role constants
│   │   ├── send-email.ts         # Email sending utility
│   │   └── swagger.ts            # Swagger configuration
│   ├── _middleware/
│   │   ├── authorize.ts          # JWT verification middleware
│   │   ├── error-handler.ts      # Global error handler
│   │   └── validate-request.ts   # Request validation middleware
│   ├── controllers/
│   │   └── account.controller.ts # Account route handlers
│   ├── models/
│   │   ├── account.model.ts      # Account Sequelize model
│   │   └── refresh-token.model.ts # RefreshToken Sequelize model
│   ├── services/
│   │   └── account.service.ts    # Business logic functions
│   └── server.ts                 # Express app setup
├── config.json                   # Configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
├── swagger.yaml                  # OpenAPI specification
└── README.md                     # This file
```

---

## Key Functions

### Account Service Functions

**authenticate(email, password, ipAddress)**
- Authenticates user with email and password
- Returns JWT and refresh token

**refreshToken(token, ipAddress)**
- Generates new JWT using refresh token
- Rotates refresh token

**revokeToken(token, ipAddress)**
- Marks token as revoked in database

**register(params, origin)**
- Creates new account
- Sends verification email

**verifyEmail(token)**
- Marks account as verified

**forgotPassword(email, origin)**
- Generates reset token
- Sends password reset email

**resetPassword(token, password)**
- Updates password with reset token

**getAll()**
- Returns all accounts (admin only)

**getById(id)**
- Returns specific account details

**create(params)**
- Creates new account (admin only)

**update(id, params)**
- Updates account information

**delete(id)**
- Deletes account

---

## Error Handling

All errors return JSON format:
```json
{
  "message": "Error description"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `500` - Server Error

---

## Swagger Documentation

Interactive API documentation available at:
```
http://localhost:4000/api-docs
```

Test endpoints directly from the Swagger UI interface.

---

## Development Tips

### Running Tests
```bash
# No test suite yet - create one with Jest
npm install --save-dev jest @types/jest ts-jest
```

### Database Commands
```bash
# View database
mysql -h localhost -u root -p node_mysql_api

# Show tables
SHOW TABLES;

# View account schema
DESCRIBE account;
DESCRIBE refreshToken;
```

### Debug Mode
Enable verbose logging in `src/server.ts`:
```typescript
const sequelize = new Sequelize(database, user, password, {
  dialect: 'mysql',
  logging: console.log  // Enable SQL logging
});
```

---

## License

ISC

---

## Support

For issues or questions, check:
1. Console logs for error messages
2. Database connection in `config.json`
3. SMTP settings for email sending
4. JWT_SECRET in environment
