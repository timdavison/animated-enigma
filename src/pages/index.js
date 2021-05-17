import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import DrupalImage from "../components/DrupalImage"

const IndexPage = ({ data }) => (
  <Layout>
    <h2>Our Latest Stories</h2>
    <p>Ideas, insights and proposals from the Cambridge Zero network on advancing a zero-carbon world. </p>
    {data.allNodeStories.edges.map(edge => {
      const image = edge.node.relationships.field_stories_header_image;
      const created = new Date(edge.node.created);
      const rawSummary = (edge.node.field_stories_story_summary) ? edge.node.field_stories_story_summary : "This story has no summary";
      const summary = (rawSummary.length <= 300) ? rawSummary : rawSummary.slice(0,300) + "...";
      return (
        <>
        <h3><Link to={ edge.node.fields.slug }>{ edge.node.title }</Link></h3>
        <DrupalImage imageField={image} alt=' ' />
        <p><small><em>{ created.toDateString() }</em></small></p>
        <p>{summary}</p>
        </>
      )
    }
  )}

<h2>Our Longer Stories </h2>
<p>Pull up a chair, grab a drink, and browse through our collection of longer reads.</p>

{data.allShorthandStoryShorthandStory.edges.map(edge => {
      const created = new Date(edge.node.created);
      const shorthandPath = `/shorthand/stories/${edge.node.shorthand_id}/${edge.node.drupal_id}/index.html`;
      return (
        <>
        <h3><Link to={ edge.node.fields.slug }>{ edge.node.name }</Link></h3>
        <p><Link to={ shorthandPath }>{ edge.node.name }</Link></p>
        <img src={edge.node.thumbnail} alt="image from shorthand" />
        <p><small><em>{ created.toDateString() }</em></small></p>
        <p>{edge.node.description}</p>
        </>
      )
    }
    )}


  </Layout>
)

export default IndexPage;

export const query = graphql`
  query {
    allNodeStories {
      edges {
        node {
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
    allShorthandStoryShorthandStory {
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
  }
`
