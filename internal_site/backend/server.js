// internal_site/backend/server.js
const express = require('express');
const cors = require('cors'); // Thêm cors
const app = express();
const menuRoutes = require('./routes/menuRoutes');

app.use(cors()); // Thêm middleware CORS
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/menu', menuRoutes);

app.listen(3000, () => console.log('Server chạy trên port 3000'));