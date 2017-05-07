import React from 'react';
import {Link} from 'react-router';
import Timer from '../game/Timer'

function Header() {
    return (
        <header>
            <a href="https://www.w3schools.com" target="_blank" >
                <img alt="PAN" src="/static/img/pan_logo.png" />
            </a>
            <Timer />
            <nav>
                <ul>
                    <li>
                        <Link target="_blank" to="http://link2external.page.com" >PRAVILA</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
