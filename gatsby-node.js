/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
 const path = require(`path`)

 exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const stories = graphql(`
    query {
      allNodeStories {
        edges {
          node {
            id
          }
        }
      }
    }
  `).then(result => {
    result.data.allNodeStories.edges.forEach(({ node }) => {
      createPage({
        path: node.id,
        component: path.resolve(`./src/templates/story.js`),
        context: {
          id: node.id,
        },
      });
    });
  })

  const tags = graphql(`
  query {
    allTaxonomyTermTags {
      edges {
        node {
          id
        }
      }
    }
  }
`).then(result => {
  result.data.allTaxonomyTermTags.edges.forEach(({ node }) => {
    createPage({
      path: node.id,
      component: path.resolve('./src/templates/stories-by-topic.js'),
      context: {
        id: node.id,
      },
    });
  });
})

  return Promise.all([stories, tags])
};
