const Promise = require('bluebird')
const path = require('path')
const select = require(`unist-util-select`)
const precache = require(`sw-precache`)
const fs = require(`fs-extra`)
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')

exports.createPages = ({ graphql, boundActionCreators: { createPage } }) => {
  return new Promise((resolve, reject) => {
    const page = path.resolve('src/templates/page.js')
    graphql(`
      query PageQuery {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields { slug }
            }
          }
        }
      }
    `)
    .then(result => {
      if (result.errors) {
        return reject(result.errors)
      }

      result.data.allMarkdownRemark.edges.map(edge => (
        {
          path: edge.node.fields.slug, // required
          component: page,
          context: {
            slug: edge.node.fields.slug,
          },
        }
      )).forEach(page => createPage(page))

      resolve()
    })
  })
}

// Add custom url pathname for pages
exports.onCreateNode = ({ node, boundActionCreators: { createNodeField }, getNode }) => {

  if (node.internal.type === `File`) {
    createNodeField({
      node,
      fieldName: "slug",
      fieldValue: `/${path.dirname(node.relativePath)}/`
    })
  } else if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      node,
      fieldName: "slug",
      fieldValue: node.frontmatter.path || getNode(node.parent).fields.slug
    })
  }
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  config.plugin('webpack-provide', webpack.ProvidePlugin, [{
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }])

  return config
}
