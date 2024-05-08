import {FC, PropsWithChildren} from 'react';
import {Outlet} from "react-router-dom";

interface IProps extends PropsWithChildren {

}

const MainLayout: FC<IProps> = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export {MainLayout};