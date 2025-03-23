CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    transactions INTEGER[],
    address Text,
    balance JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email_confirmed boolean,
    is_admin boolean
 )

 CREATE TABLE tokens (
    email VARCHAR(200) UNIQUE,
    token TEXT,
    expires_at VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 )

 CREATE TABLE otps (
   email VARCHAR(200) UNIQUE,
   otp TEXT,
   expires_at VARCHAR(200),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 )