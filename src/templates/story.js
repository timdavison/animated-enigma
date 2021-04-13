import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.nodeStories
  console.log(post)
  const image = getImage(post.relationships.field_stories_header_image.relationships.field_media_image.localFile.childImageSharp.gatsbyImageData);
  //console.log(image)
  const tags = post.relationships.field_stories_tags;
  console.log(tags)

  return (
    <Layout>
      <div>
        <h1>{ post.title }</h1>
        <GatsbyImage image={image} alt=' ' />
        <p><small>{post.field_stories_story_author}</small></p>
        <small><em>{ Date(post.created) }</em></small>
        <p>{post.field_stories_story_summary}</p>
        <ul>
          {tags.map(function(t){
            return (
              <li key={t.name}>{t.name}</li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    nodeStories(id: { eq: $id }) {
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
                    placeholder: DOMINANT_COLOR,
                    width: 1280,
                    formats: NO_CHANGE
                  )
                }
              }
            }
          }
        }
        field_stories_tags {
            name
          }
      }
    }
  }
`
