module.exports = {
  linkPrefix: '/',
  siteMetadata: {
    title: 'POSM - Portable OpenStreetMap',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-typegen-remark`,
      options: {
        plugins: [
          'gatsby-typegen-remark-prismjs',
          'gatsby-typegen-remark-copy-images',
          'gatsby-typegen-remark-copy-linked-files',
          'gatsby-typegen-remark-smartypants',
        ],
      },
    },
    `gatsby-typegen-filesystem`,
    `gatsby-typegen-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
