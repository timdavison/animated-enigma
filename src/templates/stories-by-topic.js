import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.taxonomyTermTags
  console.log(post)
  let image = getImage(post.relationships.field_tag_image.relationships.field_media_image.localFile.childImageSharp.gatsbyImageData);
  console.log(image);

  return (
    <Layout>
    <h1>{post.name}</h1>
    <GatsbyImage image={image} alt=' ' />

    {post.relationships.node__stories.map(story => {
        return (
          <>
          <h3><Link to={`/${story.id}`} > { story.title } </Link></h3>
          <p>{story.field_stories_story_summary}</p>
        </>
        )
    }
)}
    <p>
      <Link to="/topics/">Go to topics page</Link> <br />
    </p>
  </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    taxonomyTermTags(id: {eq: $id}) {
      id
      name
      relationships {
        node__stories {
          title
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
