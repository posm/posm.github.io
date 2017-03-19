module.exports = {
  linkPrefix: '/posm.io',
  siteMetadata: {
    title: 'POSM - Portable OpenStreetMap',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/pages`,
        name: 'pages',
      },
    },
    `gatsby-parser-remark`,
    `gatsby-parser-sharp`,
    {
      resolve: `gatsby-typegen-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-typegen-remark-responsive-image`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-typegen-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-typegen-remark-prismjs',
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
