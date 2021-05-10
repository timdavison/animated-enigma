import React from "react"
import { graphql, Link } from "gatsby"
import { Chip, List, ListItem } from '@material-ui/core';
import Layout from "../components/layout"
import ContentItem from "../components/ContentItem";
import DrupalImage from "../components/DrupalImage";

const storyPage = ({ data }) => {
  const post = data.nodeStories
  const image = post.relationships.field_stories_header_image;
  const tags = post.relationships.field_stories_tags;
  const items = post.relationships.field_stories_content_items;
  const created = new Date(post.created);

  return (
    <Layout>
      <div>
        <h2>{ post.title }</h2>
        <DrupalImage imageField={image} alt=' ' />
        <p><small>{post.field_stories_story_author}</small></p>
        <small><em>
        {created.toDateString()} </em></small>
        <div>{post.field_stories_story_summary}</div>
        {items.map(function(item){
            return (
              <div key={item.id}>
                <ContentItem
                  type={item.relationships.paragraph_type.label}
                  item={item}>
                </ContentItem>
              </div>
            )
          })}
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
        ... on paragraph__html {
          id
          field_para_html_text {
            value
          }
          relationships {
            paragraph_type {
              label
            }
          }
        }
        ... on paragraph__single_image {
          id
          relationships {
            field_paragraphs_single_image {
              name
              relationships {
                field_media_image {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(placeholder: DOMINANT_COLOR, width: 1280, formats: AUTO )
                    }
                  }
                }
              }
            }
            paragraph_type {
              label
            }
          }
        }
        ... on paragraph__text {
          id
          field_para_text {
            value
          }
          relationships {
            paragraph_type {
              label
            }
          }
        }
      }
      }
    }
  }
`
