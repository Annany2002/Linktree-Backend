# Linktree/Bento.me Clone Backend

This is the backend for a platform similar to **Linktree** or **Bento.me**, featuring user registration, authentication, and a referral system. The backend is built to be secure, efficient, and scalable.

## Features

- **User Registration & Authentication**:

  - Users can sign up using email, username, and password.
  - JWT-based authentication for secure login.
  - Password reset functionality with email verification.

- **Referral System**:

  - Unique referral links for each user.
  - Track successful sign-ups from referral links.
  - Optional reward system for referrers.

- **API Endpoints**:

  - User registration, login, and password reset.
  - Fetch referral statistics and referred users.

- **Security**:

  - Protection against SQL injection, XSS, and CSRF.
  - Rate limiting on sensitive endpoints.
  - Secure password hashing using bcrypt.

- **Scalability**:
  - Caching for frequently accessed data.
  - Designed to handle high traffic spikes.

---

## Tech Stack

- **Backend Framework**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/) and [Typescript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/)
- **Password Hashing**: [bcrypt](https://www.npmjs.com/package/bcrypt)
- **Caching**: [Redis](https://redis.io/)
- **Testing**: [Jest](https://jestjs.io/) for unit and integration testing

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Redis (optional, for caching)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Annany2002/Linktree-Backend.git
   cd Linktree-Backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up the database**:

   - Create a PostgreSQL database.
   - Update the database configuration in `.env` (see `.env.example` for reference).

4. **Run migrations**:

   ```bash
   npm run migrate
   ```

5. **Start the server**:

   ```bash
   npm run start:dev
   ```

6. **Run tests** (optional):
   ```bash
   npm test
   ```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
REDIS_USERNAME=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_PASSWORD=
EMAIL_USER=
```

---

## API Endpoints

### User Registration

- **POST /api/auth/user/register**
  - Register a new user.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "username": "user123",
      "password": "Password123!",
      "referral_code": "REF123" // Optional
    }
    ```

### User Login

- **POST /api/auth/user/login**
  - Authenticate a user and return a JWT token.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "Password123!"
    }
    ```

### Forget Password

- **POST /api/auth/user/forgot-password**
  - Set a new password using a secret token.
  - Request Body:
    ```json
    {
      "email": "user@example.com"
    }
    ```

### Password Reset

- **POST /api/auth/user/reset-password**
  - Request a password reset link.
  - Request Body:
    ```json
    {
      "email": "user@example.com"
    }
    ```

### Fetch Referrals

- **GET /api/referrals**
  - Fetch the list of users referred by the logged-in user.
  - Requires JWT authentication.

### Referral Statistics

- **GET /api/referral-stats**
  - Retrieve referral statistics (e.g., number of successful sign-ups).
  - Requires JWT authentication.

---

## Database Schema

### User Model

| Field                    | Type                 | Default  | Attributes                | Description                                |
| ------------------------ | -------------------- | -------- | ------------------------- | ------------------------------------------ |
| **id**                   | String               | `cuid()` | `@id`, `@default(cuid())` | Primary key, unique identifier             |
| **username**             | String               | –        | `@unique`                 | Unique username                            |
| **email**                | String               | –        | `@unique`                 | Unique user email                          |
| **password**             | String               | –        | –                         | Hashed password                            |
| **createdAt**            | DateTime             | `now()`  | `@default(now())`         | Timestamp when the user was created        |
| **updatedAt**            | DateTime             | –        | `@updatedAt`              | Timestamp when the user was last updated   |
| **passwordResetTokens**  | PasswordResetToken[] | –        | Relation                  | One-to-many relation with reset tokens     |
| **isVerified**           | Boolean              | `false`  | `@default(false)`         | Indicates if the email is verified         |
| **verificationToken**    | String?              | –        | `@unique`                 | Optional email verification token          |
| **verificationTokenExp** | DateTime?            | –        | –                         | Expiration date for the verification token |

### PasswordResetToken Model

| Field         | Type     | Default  | Attributes                                                           | Description                                              |
| ------------- | -------- | -------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| **id**        | String   | `uuid()` | `@id`, `@default(uuid())`                                            | Primary key, unique identifier                           |
| **email**     | String   | –        | `@unique`                                                            | Unique email associated with the token                   |
| **token**     | String   | –        | `@unique`, indexed (`@@index([token])`)                              | Unique token for password reset                          |
| **expiresAt** | DateTime | –        | –                                                                    | Date and time when the token expires                     |
| **createdAt** | DateTime | `now()`  | `@default(now())`                                                    | Timestamp when the token was created                     |
| **user**      | User     | –        | `@relation(fields: [email], references: [email], onDelete: Cascade)` | Relationship to the associated User (deleted on cascade) |

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, feel free to reach out:

- **Annany Vishwakarma**
- **Email**: annivish2002@gmail.com
- **GitHub**: [Annany2002](https://github.com/Annany2002)
