import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json()); // Для обработки JSON-запросов

const commandResultFilePath = path.join(__dirname, 'commandResult.txt');

// Функция для чтения результата команды из файла
const readCommandResultFromFile = () => {
    try {
        return fs.readFileSync(commandResultFilePath, 'utf8');
    } catch (error) {
        console.error('Ошибка чтения файла:', error);
        return 'Unknown_command';
    }
};

// Функция для записи результата команды в файл
const writeCommandResultToFile = (result) => {
    try {
        fs.writeFileSync(commandResultFilePath, result, 'utf8');
    } catch (error) {
        console.error('Ошибка записи файла:', error);
    }
};

const processCommand = (command) => {
    let response = '';
    if (command.toLowerCase().includes('включи') && command.toLowerCase().includes('лампочку')) {
        response = 'TURN_ON_LIGHT';
    } else if (command.toLowerCase().includes('вимкни') && command.toLowerCase().includes('лампочку')) {
        response = 'TURN_OFF_LIGHT';
    } else if (command.toLowerCase().includes('turn') && command.toLowerCase().includes('on') && command.toLowerCase().includes('light')) {
        response = 'TURN_ON_LIGHT';
    } else if (command.toLowerCase().includes('turn') && command.toLowerCase().includes('off') && command.toLowerCase().includes('light')) {
        response = 'TURN_OFF_LIGHT';
    } else {
        response = 'Unknown_command';
    }
    return response;
};

app.get('/api/data', (req, res) => {
    const lastCommandResponse = readCommandResultFromFile();
    res.json({ lastCommandResponse });
});

app.post('/api/data', (req, res) => {
    const { inputData } = req.body;
    console.log('Полученные данные:', inputData);

    const commandResult = processCommand(inputData);
    writeCommandResultToFile(commandResult);

    res.json({ success: true, response: commandResult });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
