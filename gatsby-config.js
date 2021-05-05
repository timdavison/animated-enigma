module.exports = {
  siteMetadata: {
    title: `Stories That Change the World`,
    description: `Prototype News site.`,
    author: `@gatsbyjs`,
  },
  pathPrefix: "/animated-enigma",
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        theme: {
          palette: {
            primary: {
                main: '#BA3D3B', // new color here
            },
          },
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `https://www2.zero.cam.ac.uk/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
