import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import 'prismjs/themes/prism-solarizedlight.css'
import propTypes from 'prop-types';

import posmLogo from 'images/posm.png'
import 'css/styles.scss'

class DefaultLayout extends React.Component {
  render () {
    const { children } = this.props

    return (
      <div>
        <nav className="marketing-topbar">
          <ul className="menu">
            <li className="topbar-title"><a href={prefixLink('/')}><img src={posmLogo} alt="POSM" /></a></li>
          </ul>

          <ul className="menu" role="menubar">
            <li role="menuitem"><a href={prefixLink('/about/')}>About</a></li>
            <li role="menuitem"><a href={prefixLink('/getting-a-posm/')}>Getting a POSM</a></li>
            <li role="menuitem"><a href={prefixLink('/preparing-for-the-field/')}>Field: Preparation</a></li>
            <li role="menuitem"><a href={prefixLink('/in-the-field/')}>Field: Use</a></li>
            <li role="menuitem"><a href={prefixLink('/returning-from-the-field/')}>Field: Returning</a></li>
            <li role="menuitem"><a href={prefixLink('/troubleshooting/')}>Troubleshooting</a></li>
            <li role="menuitem"><a href={prefixLink('/cloud/')}>Cloud</a></li>
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
