import React from 'react';
import {Link} from 'react-router';

import Page from '../common/Page'

function GameEnd() {
  return (
    <Page additionalClass="gameend">
        <p className="title">SUPER REZULTAT!</p>
        <p className="description">Sad još samo upiši svoje podatke kako bi, u slučaju dobitka, nagrada sigurno stigla u tvoje ruke.</p>
        <Link to="/game">POKUŠAJ PONOVO</Link>
    </Page>
  )
}

export default GameEnd;
