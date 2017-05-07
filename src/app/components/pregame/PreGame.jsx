import React from 'react';
import {Link} from 'react-router';

import Page from '../common/Page'

function Home() {
  return (
    <Page additionalClass="pregame">
        <p className="title">SLOŽI NOVO PAN LICE UZ POMOĆ SLAGALICE</p>
        <p className="description">Pan ima novo lice!<br />Ako ga želiš vidjeti, zaigraj ovu jednostavnu slagalicu, složi sliku i brzopotezno osvoji Pan Zlatni za sebe i svoju ekipu.</p>
        <Link to="/game">KRENI</Link>
    </Page>
  )
}

export default Home;
