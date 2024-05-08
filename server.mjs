import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import natural from 'natural';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json()); // Для обработки JSON-запросов

let postData = null;

// Простой механизм обработки команд с использованием NLP для украинского и английского языков
const processCommand = (command) => {
    const ukrainianTokenizer = new natural.UkrainianTokenizer();
    const englishTokenizer = new natural.WordTokenizer();

    const ukrainianTokens = ukrainianTokenizer.tokenize(command.toLowerCase());
    const englishTokens = englishTokenizer.tokenize(command.toLowerCase());

    let response;
    if (ukrainianTokens.includes('включи') && ukrainianTokens.includes('лампочку')) {
        response = 'TURN_ON_LIGHT';
    } else if (ukrainianTokens.includes('вимкни') && ukrainianTokens.includes('лампочку')) {
        response = 'TURN_OFF_LIGHT';
    } else if (englishTokens.includes('turn') && englishTokens.includes('on') && englishTokens.includes('light')) {
        response = 'TURN_ON_LIGHT';
    } else if (englishTokens.includes('turn') && englishTokens.includes('off') && englishTokens.includes('light')) {
        response = 'TURN_OFF_LIGHT';
    } else {
        response = 'Unknown_command';
    }
    // Добавьте другие команды по аналогии...


    localStorage.setItem('lastCommandResponse', response);
    return response;
};

app.get('/api/data', (req, res) => {
    res.json(localStorage.getItem('lastCommandResponse'));
});

app.post('/api/data', (req, res) => {
    const { inputData } = req.body; // Предположим, что клиент отправляет данные в поле inputData
    console.log('Полученные данные:', inputData);

    // Обрабатываем команду
    const response = processCommand(inputData);

    // Делаем что-то с полученными данными, например, сохраняем их в базу данных
    postData = response;

    res.json({ success: true, response }); // Отправляем ответ клиенту
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
