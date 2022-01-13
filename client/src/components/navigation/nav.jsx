import React from 'react';
import './nav.scss';

function Nav(props) {
    return (
        <nav className="headerNavigation">
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
