import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

const storyByTopic = ({ data }) => {
  const post = data.taxonomyTermTags
  //console.log(post)
  let image = getImage(post.relationships.field_tag_image.relationships.field_media_image.localFile.childImageSharp.gatsbyImageData);
  //console.log(image);

  return (
    <Layout>
      <h2>{post.name}</h2>
      <GatsbyImage image={image} alt=' ' />

      {post.relationships.node__stories && post.relationships.node__stories.map(story => {
        const rawSummary = (story.field_stories_story_summary) ? story.field_stories_story_summary : "This story has no summary";
        const summary = (rawSummary.length <= 300) ? rawSummary : rawSummary.slice(0,300) + "...";
        return (
          <>
            <h3><Link to={`${story.fields.slug}`} > { story.title } </Link></h3>
            <p>{summary}</p>
          </>
        )
      })}
    </Layout>
  )
}

export default storyByTopic;

export const query = graphql`
  query($id: String!) {
    taxonomyTermTags(id: {eq: $id}) {
      id
      name
      relationships {
        node__stories {
          title
          fields {
            slug
          }
          id
          field_stories_story_summary
        }
        field_tag_image {
          relationships {
            field_media_image {
              localFile {
                childImageSharp {
                  gatsbyImageData (
                    placeholder: DOMINANT_COLOR,
                    width: 650,
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
`
