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
      return (
        <>
        <h3><Link to={ edge.node.fields.slug }>{ edge.node.title }</Link></h3>
        <DrupalImage imageField={image} alt=' ' />
        <p><small><em>{ created.toDateString() }</em></small></p>
        <p>{edge.node.field_stories_story_summary}</p>
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
  }
`
