import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import get from 'lodash/get'

class PageRoute extends React.Component {
  render () {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    console.log(post);

    const { responsiveResolution: { src, srcSet } } = post.frontmatter.splash_image.children[0];

    return (
      <div>
        <div className="content">
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`}/>
          {post.frontmatter.title &&
            <h1>{post.frontmatter.title}</h1>
          }
          {post.frontmatter.splash_image &&
            <img
              className="hero"
              src={src}
              srcSet={srcSet}
            />
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
              responsiveResolution(width: 800, height: 500) {
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
