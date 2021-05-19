/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const path = require(`path`);

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

  if (node.internal.type === "taxonomy_term__tags") {
    const slug = node.path.alias ? node.path.alias : ("/topic/" + slugify(node.name));
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }

  if (node.internal.type === "shorthand_story__shorthand_story") {
    const slug = ("/shorthand/" + slugify(node.name));
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }

}

 exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const storyList = graphql(`
    query {
      allNodeStories {
        totalCount
      }
    }
  `).then(result => {

  // 3. Figure out how many pages there are based on how many stories there are, and how many per page!
  const pageSize = 12;
  const pageCount = Math.ceil(result.data.allNodeStories.totalCount / pageSize);
  console.log(
    `There are ${result.data.allNodeStories.totalCount} total stories. And we have ${pageCount} pages with ${pageSize} per page`
  );
  // 4. Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/storylist/${i + 1}`,
      component: path.resolve('./src/templates/storyList.js'),
      // This data is pass to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });


  })

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
      //console.log(node);
      createPage({
        path: node.fields.slug,
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
          name
          fields {
            slug
          }
        }
      }
    }
  }
`).then(result => {
  result.data.allTaxonomyTermTags.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/stories-by-topic.js'),
      context: {
        id: node.id,
      },
    });
  });
})

const shorthand = graphql(`
query {
  allShorthandStoryShorthandStory {
    edges {
      node {
        shorthand_id
        name
        id
        fields {
          slug
        }
      }
    }
  }
}
`).then(result => {
result.data.allShorthandStoryShorthandStory.edges.forEach(({ node }) => {
  createPage({
    path: node.fields.slug,
    component: path.resolve('./src/templates/shorthand.js'),
    context: {
      id: node.id,
    },
  });
});
})

  return Promise.all([stories, tags, shorthand, storyList])
};
