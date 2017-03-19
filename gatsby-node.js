const Promise = require('bluebird')
const path = require('path')
const select = require(`unist-util-select`)
const precache = require(`sw-precache`)
const fs = require(`fs-extra`)

exports.createPages = ({ args }) => {
  const { graphql } = args

  return new Promise((resolve, reject) => {
    const page = path.resolve('templates/page.js')
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
        console.log(result.errors)
        reject(result.errors)
      }

      // Create pages.
      const pages = result.data.allMarkdownRemark.edges.map(edge => (
        {
          path: edge.node.slug, // required
          component: page,
          context: {
            slug: edge.node.slug,
          },
        }
      ))

      resolve(pages)
    })
  })
}

// Add custom url pathname for pages
exports.modifyAST = ({ args }) => {
  const { ast } = args
  const files = select(ast, "File")

  files.forEach((file) => {
    if (file.extension !== "md") {
      return
    }

    const parsedFilePath = path.parse(file.relativePath)
    const slug = `/${parsedFilePath.dir}/`
    file.slug = slug

    const markdownNode = select(file, `MarkdownRemark`)[0]

    if (markdownNode) {
      if (markdownNode.frontmatter.path != null) {
        markdownNode.slug = markdownNode.frontmatter.path
        file.slug = markdownNode.slug
      } else {
        markdownNode.slug = slug
      }
    }
  })

  return files
}

exports.modifyWebpackConfig = ({ args }) => {
  const { config, stage } = args

  console.log("stage:", stage)

  switch (stage) {
    case 'build-css':
    case 'build-javascript':
      config.loader('scss', cfg => {
        cfg.test = /\.scss$/
        cfg.loaders = ["style-loader", "css-loader", "sass-loader"]

        return cfg
      })
      break
  }

  return config
}
