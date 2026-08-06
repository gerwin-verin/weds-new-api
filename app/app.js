// app.js
const express = require('express');
const app = express();

// Middleware untuk membaca JSON
app.use(express.json());

// Mock database array
let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

// GET: Ambil semua user
app.get('/api/users', (req, res) => {
    res.json(users);
});

// POST: Tambah user baru
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// DELETE: Hapus user berdasarkan ID
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.json({ message: `User dengan ID ${userId} berhasil dihapus.` });
});

// Ekspor app agar bisa digunakan di file lain
module.exports = app;
