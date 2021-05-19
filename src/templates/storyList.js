import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import FullTeaser from "../components/FullTeaser"
import Pagination from "../components/Pagination"

const storyList = ({ data, pageContext }) => {


  return (
    <Layout>
      <Pagination
      pageSize={pageContext.pageSize}
      totalPages={pageContext.totalPages}
      currentPage={pageContext.currentPage}
      base="/storylist"
      />

      {data.allNodeStories.nodes.map(node => {
      const image = node.relationships.field_stories_header_image;
      const created = new Date(node.created);
      const rawSummary = (node.field_stories_story_summary) ? node.field_stories_story_summary : "This story has no summary";
      const summary = (rawSummary.length <= 300) ? rawSummary : rawSummary.slice(0,300) + "...";
      return (
        <FullTeaser
        title={node.title}
        slug={node.fields.slug}
        summary={summary}
        created={created}
        image={image}
        />
      )
    })}
    </Layout>
  )
}

export default storyList;

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int =12, ) {
    allNodeStories(limit: $pageSize, skip: $skip) {
      nodes {
        id
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

`
