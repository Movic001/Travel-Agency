const express = require ('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4040;
const db =require('./db');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded bodies (from forms)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies (for API requests)
app.use(express.json());

// Set the view engine to EJS (Embedded JavaScript templating)
app.set("view engine", "ejs");

// Set the directory where the views are located
app.set('views', path.join(__dirname, 'views'));

//renter the home page /
app.get('/',(req, res)=>{
    res.status(200).render('index');
});

//render the booking page
app.get('/booking',(req,res)=>{
    res.status(200).render('booking');
});


// Handle POST requests to /booking
app.post('/booking',(req, res)=>{
    const {first_name, last_name, email, phone_number, address, address_line2, city, state, postal_code, country,travel_date, return_date, departure_city, destination_city, budget, departure_airport, trip_type, services_needed,retainer_fee, card_number, card_holder_name} = req.body;

        //error handling
    if (!first_name || !last_name || !email || !phone_number || !address || !city || !state || !postal_code || !country || !travel_date || !return_date || !departure_city || !destination_city || !budget || !departure_airport || !trip_type || !services_needed || !retainer_fee || !card_number || !card_holder_name) {
        res.status(400).send('All fields are required');
    }

    const sql = `
    INSERT INTO bookings (
      first_name, last_name, email, phone_number, address, address_line_2, city, state, postal_code, country,
      travel_date, return_date, departure_city, destination_city, budget, departure_airport, trip_type, services_needed, agent_fee, credit_card_number, card_holder_name
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const formData =[first_name, last_name, email, phone_number, address, address_line2, city, state, postal_code, country, travel_date, return_date, departure_city, destination_city, budget, departure_airport, trip_type, services_needed, retainer_fee, card_number, card_holder_name];

    db.query(sql,formData, (err, results) => {
        if (err) {
            console.error('Error inserting into bookings:', err.message);
            return res.status(500).send('Error inserting into bookings');
        }
        console.log('Inserted into bookings');
        //render the success page
        return  res.status(200).json(
            { message: 'Booking submitted successfully', 
            bookingId: results.insertId });
    });

});


app.use((req,res)=>{
    res.status(501).send(`Server Error PAGE NOT FOUND.......`)
})

app.listen(port,()=>{
    console.log(`server listening to port: ${port}`);
});