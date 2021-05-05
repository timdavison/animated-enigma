import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Chip, List, ListItem } from '@material-ui/core';
import Layout from "../components/layout"

const storyPage = ({ data }) => {
  const post = data.nodeStories
  console.log({post})
  const image = getImage(post.relationships.field_stories_header_image.relationships.field_media_image.localFile.childImageSharp.gatsbyImageData);
  //console.log(image).
  const tags = post.relationships.field_stories_tags;

  // just get the first of the text paragraphs for now
  // const para = post.relationships.field_stories_content_items[0].field_para_text[0].value;
  // console.log(para);
  const created = new Date(post.created);

  return (
    <Layout>
      <div>
        <h2>{ post.title }</h2>
        <GatsbyImage image={image} alt=' ' />
        <p><small>{post.field_stories_story_author}</small></p>
        <small><em>
        {created.toDateString()} </em></small>
        <div>{post.field_stories_story_summary}</div>
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

export default storyPage;

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
            id
          }
          field_stories_content_items {
        ... on paragraph__text {
          field_para_text {
            value
          }
        }
      }
      }
    }
  }
`
