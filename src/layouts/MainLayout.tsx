import {FC, PropsWithChildren} from 'react';
import {Outlet} from "react-router-dom";
import css from './MainLayout.module.css'

interface IProps extends PropsWithChildren {

}

const MainLayout: FC<IProps> = () => {
    return (
        <div className={css.MainLayout}>
            <Outlet/>
        </div>
    );
};

export {MainLayout};