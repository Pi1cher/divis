import {FC, PropsWithChildren} from 'react';
import {SpeechRecognition} from "../components";
import {Header} from "../components/Header";

interface IProps extends PropsWithChildren {

}

const MainPage: FC<IProps> = () => {
    return (
        <div>
            <Header/>
            <SpeechRecognition/>
        </div>
    );
};

export {MainPage};