module.exports = {
  siteMetadata: {
    title: `Stories That Change the World`,
    description: `Prototype News site.`,
    author: `@gatsbyjs`,
    siteUrl: `https://animatedenigmamain.gtsb.io`,
    siteTwitterUrl: `https://twitter.com/Cambridge_Uni?ref_src=twsrc%5Etfw`,
    siteTwitterText: `Tweets by Cambridge_Uni`,

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
    `gatsby-plugin-advanced-sitemap`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allNodeStories } }) => {
              return allNodeStories.nodes.map(node => {
                return Object.assign({}, node, {
                  description: node.field_stories_story_summary,
                  date: node.created,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                })
              })
            },
        query: `
          {
            allNodeStories(
              limit: 10
              sort: {order: DESC, fields: created}
              filter: {relationships: {field_stories_tags: {elemMatch: {name: {eq: "Cities"}}}}}
            ) {
              nodes {
                id
                title
                fields {
                  slug
                }
                created
                field_stories_story_summary
              }
            }
          }
        `,
            output: "/topic/cities/rss.xml",
            title: "RSS Feed",
          },
          {
            serialize: ({ query: { site, allNodeStories } }) => {
              return allNodeStories.nodes.map(node => {
                return Object.assign({}, node, {
                  description: node.field_stories_story_summary,
                  date: node.created,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                })
              })
            },
        query: `
          {
            allNodeStories(
              limit: 10
              sort: {order: DESC, fields: created}
              filter: {relationships: {field_stories_tags: {elemMatch: {name: {eq: "Health"}}}}}
            ) {
              nodes {
                id
                title
                fields {
                  slug
                }
                created
                field_stories_story_summary
              }
            }
          }
        `,
            output: "/topic/health/rss.xml",
            title: "RSS Feed",
          },
        ],
      },
    },
    `gatsby-plugin-styled-components`,
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
