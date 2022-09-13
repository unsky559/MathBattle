import React from 'react';
import cl from './nav.module.scss';

function Nav() {
    return (
        <nav className={cl.headerNavigation}>
            <a href="">
                Играть
            </a>
            <a href="">
                Тренироваться
            </a>
            <a href="">
                Создать игру
            </a>
        </nav>
    );
}

export default Nav;
