const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const db = require('./config/db'); // Mengimpor koneksi database dari file db.js

// 3. Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 8000; // Mengambil port dari .env atau default ke 8000

// 4. Middleware dasar
app.use(cors()); // Mengizinkan request dari domain lain (Frontend)
app.use(express.json()); // Membaca body request bertipe JSON
app.use(express.urlencoded({ extended: true })); // Membaca body request bertipe form-data/ur1-encoded

// 5. Endpoint dasar (Testing Server)
app.get('/', (req, res) => {
res.status(200).json({
success: true,
message: 'Selamat datang di API Portofolio Dinamis!',
version: '1.0.0'
});
});

// Endpoint untuk cek status API
app.get('/api/status', (req, res) =>{
res.status(200).json({
success: true,
message: 'Server dalam keadaan sehat dan aktif.',
timestamp: new Date().toisostring()
  });
});

// 6. Middleware untuk menangani route yang tidak ditemukan (404 Not Found)
app.use((req, res) =>{
res.status(404).json({
success: false,
message: 'Endpoint tidak ditemukan!'
  });
});

// 7. Menjalankan server
app.listen(PORT, () => {
console.log(`===============================`);
console.log(`🚀Server berjalan di: http://localhost:${PORT}`);
console.log(` 🔰Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(` ===============================`);
});