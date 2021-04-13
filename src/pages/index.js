import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Stories</h1>
    <p>Ideas, insights and proposals from the Cambridge Zero network on advancing a zero-carbon world. </p>
    {data.allNodeStories.edges.map(edge => {
        let image = getImage(edge.node.relationships.field_stories_header_image.relationships.field_media_image.localFile.childImageSharp.gatsbyImageData);
        console.log(image);
        return (
          <>
          <h3><Link to={ edge.node.id }>{ edge.node.title }</Link></h3>
          <GatsbyImage image={image} alt=' ' />
          <p><small><em>{ Date(edge.node.created) }</em></small></p>
          <p>{edge.node.field_stories_story_summary}</p>
        </>
        )
    }
)}
    <p>
      <Link to="/topics/">Go to topics page</Link> <br />
    </p>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    allNodeStories {
      edges {
        node {
          title
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
