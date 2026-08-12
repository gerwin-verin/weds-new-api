// server.js
const express = require('express');
const app = express();
const PORT = 3000;
const userRoutes = require("./routes/users");
const rsvpRoutes = require("./routes/rsvp");
const cors = require('cors');

app.use(cors());
// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes);
app.use('/api/rsvp', rsvpRoutes);

// Pasang rute dengan prefix URL yang berbeda
// app.use('/api/users', userRoutes);       // Akan diakses via http://localhost:3000/api/users
// app.use('/api/products', rsvpRoutes); // Akan diakses via http://localhost:3000/api/products

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

// module.exports = app;