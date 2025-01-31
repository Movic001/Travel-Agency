const mysql = require('mysql2');
const dotenv = require('dotenv'); 
dotenv.config();

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host:     process.env.MYSQL_HOST,
    user:     process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}); 

//Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the MySQL server.');

    // Create the database if it doesn't exist
    db.query('CREATE DATABASE IF NOT EXISTS travel', (err, results) => {
        if (err) {
            console.error('Error creating database:', err.message);
            return;
        }
        console.log('Database "travel" was created.');

        // Switch to the travel database
        db.query('USE travel', (err, results) => {
            if (err) {
                console.error('Error selecting the database:', err.message);
                return;
            }
            
            const createTable = `CREATE TABLE IF NOT EXISTS bookings(
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                email VARCHAR(255),
                phone_number VARCHAR(15),
                address TEXT,
                address_line_2 TEXT,
                city VARCHAR(255),
                state VARCHAR(255),
                postal_code VARCHAR(10),
                country VARCHAR(255), 
                travel_date DATE,
                return_date DATE,
                departure_city VARCHAR(255),
                destination_city VARCHAR(255),
                budget DECIMAL(10,2),
                departure_airport VARCHAR(255),
                trip_type VARCHAR(255),
                services_needed TEXT,
                agent_fee DECIMAL(10,2),
                credit_card_number VARCHAR(255), 
                card_holder_name VARCHAR(255)
            );
            `;
            db.query(createTable, (err, results) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                } else {
                    console.log('Bookings table created.');
                }
            });

        });
    });
});

// Export the database connection
module.exports = db;
