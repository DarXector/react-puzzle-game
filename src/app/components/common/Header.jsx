import React from 'react';
import {Link} from 'react-router';
import Timer from '../game/Timer'

function Header() {
    return (
        <header>
            <a href="http://www.pan.com.hr/gl/hr/" target="_blank" >
                <img alt="PAN" src="/img/pan_logo.png" />
            </a>
            <Timer />
            <nav>
                <ul>
                    <li>
                        <Link target="_blank" onClick={(event) => {event.preventDefault(); window.open("http://slagalica.pan.com.hr/Pravila_nagradnog_natjecaja_Pan_Slagalica.pdf");}}>PRAVILA</Link>
                    </li>
                    <li>
                        <Link to="/rewards" >NAGRADE</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
