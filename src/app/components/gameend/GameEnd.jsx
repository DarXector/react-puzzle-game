import React from 'react';
import {Link} from 'react-router';

import Page from '../common/Page'

function GameEnd() {
  return (
    <Page additionalClass="gameend">
        <p className="title">SUPER REZULTAT!</p>
        <p className="description">Niste zadovoljni rezultatom? Odigrajte ponovo.<br/>Ako ste dobitnik neke od nagrada bićete obavješteni</p>
        <Link to="/game">POKUŠAJ PONOVO</Link>
    </Page>
  )
}

export default GameEnd;
