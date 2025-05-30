CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS secrets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isViewed BOOLEAN DEFAULT FALSE,
    userId INT,
    FOREIGN KEY (userId) REFERENCES users (id)
);