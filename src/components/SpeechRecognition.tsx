import {FC, PropsWithChildren, useState, useRef, useEffect} from 'react';
import {IconButton} from '@mui/material';
import css from './SpeechRecognition.module.css';
import Icon from '@mui/material/Icon';
import {commandService} from "../services/commandService";


interface IProps extends PropsWithChildren {
}

const SpeechRecognition: FC<IProps> = () => {
    const [output, setOutput] = useState<string>('');
    const recognitionRef = useRef<any>(null); // Ссылка на объект распознавания

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
            setOutput(speechToText);
        };

        recognition.onerror = (event: any) => {
            setOutput('Произошла ошибка при распознавании речи: ' + event.error);
        };

        recognition.start();

        // Сохраняем ссылку на объект распознавания
        recognitionRef.current = recognition;
    };
    useEffect(() => {
        commandService.sendData(JSON.stringify({command: output}))
    }, [output])

    const stopRecognition = () => {
        if (recognitionRef.current) {
            // Если есть активное распознавание, останавливаем его
            recognitionRef.current.stop();

            setOutput('Распознавание завершено.');
        }

    };

    return (
        <div className={css.SpeechContainer}>
            <IconButton
                className={css.SpeechRecognition}
                onMouseDown={startRecognition}
                onMouseUp={stopRecognition}
                onTouchStart={startRecognition}
                onTouchEnd={stopRecognition}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="48px"
                    viewBox="0 0 24 24"
                    width="48px"
                    fill="#000000"
                >
                    <g>
                        <rect fill="none" height="24" width="24"/>
                        <rect fill="none" height="24" width="24"/>
                        <rect fill="none" height="24" width="24"/>
                    </g>
                    <g>
                        <g/>
                        <g>
                            <path
                                d="M12,14c1.66,0,3-1.34,3-3V5c0-1.66-1.34-3-3-3S9,3.34,9,5v6C9,12.66,10.34,14,12,14z"/>
                            <path
                                d="M17,11c0,2.76-2.24,5-5,5s-5-2.24-5-5H5c0,3.53,2.61,6.43,6,6.92V21h2v-3.08c3.39-0.49,6-3.39,6-6.92H17z"/>
                        </g>
                    </g>
                </svg>
            </IconButton>
            <br/><br/><br/><br/>
            <div>{output}</div>
        </div>
    );
};

export {SpeechRecognition};
