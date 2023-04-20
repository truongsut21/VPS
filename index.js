const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Khởi tạo kết nối đến MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'truong',
  password: '123456',
  database: 'PhongTro'
});

// Kết nối đến MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

// Cấu hình body-parser để xử lý request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Định nghĩa các route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/allRoom', (req, res) => {
  connection.query('SELECT * FROM room', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post('/room', (req, res) => {
  const { name, email } = req.body;
  connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
