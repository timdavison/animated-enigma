import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Chip, List, ListItem } from '@material-ui/core';
import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.nodeStories
  console.log(post)
  const image = getImage(post.relationships.field_stories_header_image.relationships.field_media_image.localFile.childImageSharp.gatsbyImageData);
  //console.log(image)
  const tags = post.relationships.field_stories_tags;
  console.log(tags);

  return (
    <Layout>
      <div>
        <h2>{ post.title }</h2>
        <GatsbyImage image={image} alt=' ' />
        <p><small>{post.field_stories_story_author}</small></p>
        <small><em>{ Date(post.created) }</em></small>
        <div dangerouslySetInnerHTML={{ __html: post.body.value }}></div>
        <List>
          {tags.map(function(t){
            return (
              <ListItem key={t.name}>
                <Link to={`/${t.id}` }>
                  <Chip color="primary" label={t.name} key={t.id}></Chip>
                </Link>
              </ListItem>
            )
          })}
        </List>
      </div>
    </Layout>
  )
}


export const query = graphql`
  query($id: String!) {
    nodeStories(id: { eq: $id }) {
      title
      body {
        value
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
            id
          }
      }
    }
  }
`
