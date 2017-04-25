import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import get from 'lodash/get'

class PageRoute extends React.Component {
  render () {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    console.log(post);

    let src, srcSet;

    const { frontmatter: { splash_image } } = post;

    if (splash_image) {
      src = splash_image.children[0].responsiveResolution.src;
      srcSet = splash_image.children[0].responsiveResolution.srcSet;
    }

    return (
      <div>
        <div className="content">
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`}/>
          {post.frontmatter.splash_image &&
            <div className="hero-section" style={{ background: `url(${src}) center no-repeat` }}>
              <div className="hero-section-text">
                {post.frontmatter.title &&
                  <h1>{post.frontmatter.title}</h1>
                }
                {post.frontmatter.splash_text &&
                  <h6>{post.frontmatter.splash_text}</h6>
                }
              </div>
            </div>
          }
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <footer>
         <div className="row small-12 large-up-5">
          <h6>© 2016‐2017 American Red Cross. All rights reserved.</h6>
         </div>
        </footer>
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
        splash_image {
          children {
            ... on ImageSharp {
              responsiveResolution(width: 800, height: 500, quality: 75) {
                src
                srcSet
              }
            }
          }
        }
        splash_text
      }
    }
  }
`
