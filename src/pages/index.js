import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import FullTeaser from "../components/FullTeaser"
import TwitterFeed from "../components/TwitterFeed"

const IndexPage = ({ data }) => {
console.log(data);
  const latestQueue = data.allEntitySubqueueHomepageLatest.nodes[0].relationships;
  const siteData = data.allSite.nodes[0].siteMetadata;

  return (

  <Layout>
    <p>Ideas, insights and proposals from the Cambridge Zero network on advancing a zero-carbon world. </p>
    <h2>Today's featured story</h2>
    {data.allEntitySubqueueHomepageFeature.edges.map(edge => {
      return (
        <FullTeaser
          title={edge.node.relationships.items[0].title}
          slug={edge.node.relationships.items[0].fields.slug}
          summary={edge.node.relationships.items[0].field_stories_story_summary}
          created={edge.node.relationships.items[0].created}
          image={edge.node.relationships.items[0].relationships.field_stories_header_image}
        />
      )
    })}

    <h2>Latest News</h2>
        {latestQueue.items.map(item => {
          return (
            <FullTeaser
              title={item.title}
              slug={item.fields.slug}
              summary={item.field_stories_story_summary}
              created={item.created}
              image={item.relationships.field_stories_header_image}
            />
          )
        })}

    <h2>Our Longer Stories </h2>
    <p>Pull up a chair, grab a drink, and browse through our collection of longer reads.</p>

    {data.allShorthandStoryShorthandStory.edges.map(edge => {
      const created = new Date(edge.node.created);
      const shorthandPath = `/shorthand/stories/${edge.node.shorthand_id}/${edge.node.drupal_id}/index.html`;
      return (
        <>
        <h3><Link to={ shorthandPath }>{ edge.node.name }</Link></h3>

        <p><small><em>{ created.toDateString() }</em></small></p>
        <p>{edge.node.description}</p>
        </>
      )
    })}
    <hr />
    <h2>You can find us on twitter </h2>
    <TwitterFeed url={siteData.siteTwitterUrl} text={siteData.siteTwitterText} />
    <hr />
    <p>We have {data.allNodeStories.totalCount} news stories and {data.allShorthandStoryShorthandStory.totalCount} long reads.</p>
  </Layout>
)
  }

export default IndexPage;

export const query = graphql`
  query {
    allShorthandStoryShorthandStory {
      totalCount
      edges {
        node {
          drupal_id
          fields {
            slug
          }
          external_url
          name
          shorthand_id
          thumbnail
          description
          created
        }
      }
    }
    allEntitySubqueueHomepageFeature {
      edges {
        node {
          title
          relationships {
            items {
              title
              fields {
                slug
              }
              field_stories_story_summary
              field_stories_story_author
              id
              created
              relationships {
                field_stories_header_image {
                  relationships {
                    field_media_image {
                      localFile {
                        childImageSharp {
                          gatsbyImageData(
                            placeholder: BLURRED,
                            width: 658,
                            formats: [AUTO, WEBP]
                          )
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    allEntitySubqueueHomepageLatest {
      nodes {
        id
        title
        relationships {
          items {
            title
            fields {
              slug
            }
            created
            field_stories_story_summary
            relationships {
              field_stories_header_image {
                relationships {
                  field_media_image {
                    localFile {
                      childImageSharp {
                        gatsbyImageData(
                          placeholder: BLURRED,
                          width: 658,
                          formats: [AUTO, WEBP]
                        )
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    allNodeStories {
      totalCount
    }
    allSite {
      nodes {
        siteMetadata {
          siteTwitterUrl
          siteTwitterText
        }
      }
    }
  }
`
