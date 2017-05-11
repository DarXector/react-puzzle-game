import React from 'react';
import {Link} from 'react-router';

import Page from '../common/Page'

function Rewards() {
  return (
      <Page additionalClass="rewards">
          <p className="title">1. MJESTO</p>
          <p className="title2">120x<img id="limenka" src="/img/limenka.png" /><img id="majica"  src="/img/majica.png" />x1</p>
          <p className="title2">2. - 5. MJESTO</p>
          <p className="description">72x Zlatni Pan,<br/>1x Pan MAJICA</p>
          <p className="title2">6. - 20. MJESTO</p>
          <p className="description">24x Zlatni Pan piva</p>
          <Link to="/pregame">NAZAD</Link>
      </Page>
  )
}

export default Rewards;
