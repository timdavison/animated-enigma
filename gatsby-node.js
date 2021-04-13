/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

 const path = require(`path`)

 exports.createPages = ({ graphql, actions }) => {
   const { createPage } = actions
   return graphql(`
     {
      allNodeStories {
        edges {
          node {
            id
          }
        }
      }
     }
   `
   ).then(result => {
     result.data.allNodeStories.edges.forEach(({ node }) => {
       createPage({
         path: node.id,
         component: path.resolve(`./src/templates/story.js`),
         context: {
           id: node.id,
         },
       })
     })
   })

   return graphql(`
     {
      allNodeStories {
        edges {
          node {
            id
          }
        }
      }
     }
   `
   ).then(result => {
     result.data.allNodeStories.edges.forEach(({ node }) => {
       createPage({
         path: node.id,
         component: path.resolve(`./src/templates/story.js`),
         context: {
           id: node.id,
         },
       })
     })
   })








 }
