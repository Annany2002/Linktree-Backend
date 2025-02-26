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
   npm start
   ```

6. **Run tests** (optional):
   ```bash
   npm test
   ```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
REDIS_URL=redis://localhost:6379
```

---

## API Endpoints

### User Registration

- **POST /api/register**
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

- **POST /api/login**
  - Authenticate a user and return a JWT token.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "Password123!"
    }
    ```

### Password Reset

- **POST /api/forgot-password**
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

### Users Table

| Column        | Type         | Description                |
| ------------- | ------------ | -------------------------- |
| id            | SERIAL       | Primary key                |
| username      | VARCHAR(50)  | Unique username            |
| email         | VARCHAR(100) | Unique email               |
| password_hash | TEXT         | Hashed password            |
| referral_code | VARCHAR(20)  | Unique referral code       |
| referred_by   | INTEGER      | ID of the referring user   |
| created_at    | TIMESTAMP    | Timestamp of user creation |

### Referrals Table

| Column           | Type        | Description                                    |
| ---------------- | ----------- | ---------------------------------------------- |
| referred_id      | SERIAL      | Primary key                                    |
| referred_user_id | INTEGER     | ID of the referred user                        |
| referrer_id      | INTEGER     | ID of the referrer                             |
| date_referred    | TIMESTAMP   | Timestamp of referral                          |
| status           | VARCHAR(20) | Status of referral (e.g., pending, successful) |

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
