import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import get from 'lodash/get'

class PageRoute extends React.Component {
  render () {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div>
        <div className="content">
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`}/>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <div className="footer">
          <div className="row">
            <div className="medium-4 medium-push-8 columns">
              <ul className="home-social">
                <li><a href="https://www.youtube.com/ZURB" className="youtube"></a></li>
                <li><a href="https://www.twitter.com/ZURB" className="twitter"></a></li>
                <li><a href="https://www.facebook.com/ZURB" className="facebook"></a></li>
                <li><a href="http://zurb.com/contact" className="mail"></a></li>
              </ul>
            </div>
            <div className="medium-8 medium-pull-4 columns">
              <a href="http://www.zurb.com" className="zurb-logo regular"></a>
              <ul className="zurb-links">
                <li><a href="http://zurb.com/about">About</a></li>
                <li><a href="http://zurb.com/blog">Blog</a></li>
                <li><a href="http://zurb.com/news">News<span className="show-for-medium-up"> &amp; Events</span></a></li>
                <li><a href="http://zurb.com/contact">Contact</a></li>
                <li><a href="http://zurb.com/sitemap">Sitemap</a></li>
               </ul>
               <p className="copyright">© 2016‐2017 American Red Cross. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageRoute

export const pageQuery = `
  query PagesPath($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(slug: { eq: $slug }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`
