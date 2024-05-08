import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001; // Используем порт из переменной окружения PORT, либо порт по умолчанию 3001

app.use(express.static(path.join(__dirname, 'build')));

app.get('/command', (req, res) => {
    res.json({ message: 'Привет' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
