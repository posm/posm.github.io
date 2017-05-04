const Promise = require('bluebird')
const path = require('path')
const select = require(`unist-util-select`)
const precache = require(`sw-precache`)
const fs = require(`fs-extra`)
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { upsertPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const page = path.resolve('src/templates/page.js')
    graphql(`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `)
    .then(result => {
      if (result.errors) {
        console.log('errors:', result.errors)
        resolve()
        // reject(result.errors)
      }

      // Create pages.
      result.data.allMarkdownRemark.edges.map(edge => (
        {
          path: edge.node.slug, // required
          component: page,
          context: {
            slug: edge.node.slug,
          },
        }
      )).forEach(page => upsertPage(page))

      resolve()
    })
  })
}

// Add custom url pathname for pages
exports.onNodeCreate = ({ node, boundActionCreators, getNode }) => {
  const { updateNode } = boundActionCreators

  if (node.type === `File` && node.slug == null) {
    node.slug = `/${path.dirname(node.relativePath)}/`

    updateNode(node)
  } else if (node.type === `MarkdownRemark` && node.slug == null) {
    const fileNode = getNode(node.parent)
    node.slug = fileNode.slug

    if (node.frontmatter.path != null) {
      node.slug = node.frontmatter.path
    }

    updateNode(node)
  }
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case "develop":
      config.loader("sass", {
        test: /\.(sass|scss)$/,
        exclude: /\.module\.(sass|scss)$/,
        loaders: ["style", "css", "postcss", "sass"],
      })

      break

    case "build-css":
      config.loader("sass", {
        test: /\.(sass|scss)$/,
        exclude: /\.module\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(["css?minimize", "postcss", "sass"]),
      })

      break

    case "build-html":
      config.loader("sass", {
        test: /\.(sass|scss)$/,
        exclude: /\.module\.(sass|scss)$/,
        loader: "null",
      })

      break

    case "build-javascript":
      config.loader("sass", {
        test: /\.(sass|scss)$/,
        exclude: /\.module\.(sass|scss)$/,
        loader: "null",
      })

      break
  }

  config.plugin('webpack-provide', webpack.ProvidePlugin, [{
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }])

  return config
}
