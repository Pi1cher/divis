import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json()); // Для обработки JSON-запросов

let postData = null;

app.get('/api/data', (req, res) => {
    res.send({postData});
});

app.post('/api/data', (req, res) => {
    const { inputData } = req.body; // Предположим, что клиент отправляет данные в поле inputData
    console.log('Полученные данные:', inputData);
    postData = inputData    // Делаем что-то с полученными данными, например, сохраняем их в базу данных
    res.json({ success: true }); // Отправляем ответ клиенту
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
