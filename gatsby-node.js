/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
 const path = require(`path`)

 function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}


module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === "node__stories") {
        const slug = node.path.alias ? node.path.alias : ("/story/" + slugify(node.title));

        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
}


 exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const stories = graphql(`
    query {
      allNodeStories {
        edges {
          node {
            title
            id
            path {
              alias
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allNodeStories.edges.forEach(({ node }) => {
      console.log(node);
      createPage({
        path: node.path.alias ? node.path.alias : ("/story/" + slugify(node.title)),
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
