import {FC, PropsWithChildren} from 'react';
import {SpeechRecognition} from "../components";
import {Header} from "../components/Header";
import css from './MainPage.module.css'

interface IProps extends PropsWithChildren {

}

const MainPage: FC<IProps> = () => {
    return (
        <div className={css.MainPage}>
            <Header/>
            <SpeechRecognition/>
        </div>
    );
};

export {MainPage};