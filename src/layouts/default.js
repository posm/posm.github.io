import React, { Component } from 'react'
import Link from 'gatsby-link'
import 'prismjs/themes/prism-solarizedlight.css'
import propTypes from 'prop-types';

import posmLogo from '../images/posm.png'
import '../css/styles.scss'

const ACTIVE_STYLE = {
  backgroundColor: '#b6a8a9'
};

class DefaultLayout extends Component {
  render () {
    const { children } = this.props

    return (
      <div>
        <nav className="marketing-topbar">
          <ul className="menu">
            <li className="topbar-title"><Link to='/'><img src={posmLogo} alt="POSM" /></Link></li>
          </ul>

          <ul className="menu" role="menubar">
            <li role="menuitem"><Link to='/about/' activeStyle={ACTIVE_STYLE}>About</Link></li>
            <li role="menuitem"><Link to='/getting-a-posm/' activeStyle={ACTIVE_STYLE}>Getting a POSM</Link></li>
            <li role="menuitem"><Link to='/preparing-for-the-field/' activeStyle={ACTIVE_STYLE}>Field: Preparation</Link></li>
            <li role="menuitem"><Link to='/in-the-field/' activeStyle={ACTIVE_STYLE}>Field: Use</Link></li>
            <li role="menuitem"><Link to='/returning-from-the-field/' activeStyle={ACTIVE_STYLE}>Field: Returning</Link></li>
            <li role="menuitem"><Link to='/troubleshooting/' activeStyle={ACTIVE_STYLE}>Troubleshooting</Link></li>
            <li role="menuitem"><Link to='/cloud/' activeStyle={ACTIVE_STYLE}>Cloud</Link></li>
          </ul>
        </nav>
        {children}
      </div>
    )
  }
}

DefaultLayout.propTypes = {
  children: propTypes.any,
  location: propTypes.object,
  route: propTypes.object,
}

export default DefaultLayout
