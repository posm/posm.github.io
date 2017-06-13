import React, { Component } from 'react'
import Link from 'gatsby-link'
import 'prismjs/themes/prism-solarizedlight.css'
import propTypes from 'prop-types'

import posmLogo from '../images/posm.png'
import '../css/styles.scss'

class DefaultLayout extends Component {
  componentDidMount () {
    // enable Foundation JS (but this may cause problems when fighting with React over control of elements)
    if (typeof window !== 'undefined' && window != null) {
      require('foundation-sites')

      $(window).foundation()
    }
  }

  render () {
    const { children } = this.props

    return (
      <div>
        <nav className="marketing-topbar">
          <ul className="menu">
            <li className="topbar-title"><Link to='/'><img src={posmLogo} alt="POSM" /></Link></li>
          </ul>

          <ul className="menu" role="menubar">
            <li role="menuitem">
              <Link
                to="/about/"
                activeClassName="active"
                onlyActiveOnIndex>About</Link>
            </li>
            <li role="menuitem">
              <Link
                to="/getting-a-posm/"
                activeClassName="active"
                onlyActiveOnIndex>Getting a POSM</Link>
            </li>
            <li role="menuitem">
              <Link
                to="/preparing-for-the-field/"
                activeClassName="active"
                onlyActiveOnIndex>Field: Preparation</Link>
            </li>
            <li role="menuitem">
              <Link
                to="/in-the-field/"
                activeClassName="active"
                onlyActiveOnIndex>Field: Use</Link>
            </li>
            <li role="menuitem">
              <Link
                to="/returning-from-the-field/"
                activeClassName="active"
                onlyActiveOnIndex>Field: Returning</Link>
            </li>
            <li role="menuitem">
              <Link
                to="/troubleshooting/"
                activeClassName="active"
                onlyActiveOnIndex>Troubleshooting</Link>
            </li>
            <li role="menuitem">
              <Link
                to="/cloud/"
                activeClassName="active"
                onlyActiveOnIndex>Cloud</Link>
            </li>
          </ul>
        </nav>
        {children()}
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
