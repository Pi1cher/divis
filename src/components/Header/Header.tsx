import {FC, PropsWithChildren} from 'react';

import css from './Header.module.css'

interface IProps extends PropsWithChildren {

}

const Header: FC<IProps> = () => {
    return (
        <div className={css.Header}>
            DIVIS
        </div>
    );
};

export {Header};