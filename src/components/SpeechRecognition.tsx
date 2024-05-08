import {FC, PropsWithChildren, useState} from 'react';

interface IProps extends PropsWithChildren {

}

const SpeechRecognition: FC<IProps> = () => {
    const [output, setOutput] = useState<string>('');

    const startRecognition = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setOutput('Ваш браузер не поддерживает API распознавания речи.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'uk-UA';

        recognition.onresult = (event: any) => {
            const speechToText = event.results[0][0].transcript;
            setOutput(`Распознанный текст: ${speechToText}`);
        };

        recognition.onerror = (event: any) => {
            setOutput('Произошла ошибка при распознавании речи: ' + event.error);
        };

        recognition.start();
        setOutput('Слушаю...');
    };

    return (
        <div>
            <button onClick={startRecognition}>Начать распознавание</button>
            <div>{output}</div>
        </div>
    );

};

export {SpeechRecognition};